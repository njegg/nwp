import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostReviewResponse, Review } from 'src/app/model/review';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
    selector: 'app-review-form',
    templateUrl: './review-form.component.html',
    styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
    @Input() coctailId!: number;

    @Output() newReviewEvent = new EventEmitter<PostReviewResponse>();

    userReview: Review | undefined;
    username: string | undefined = undefined;

    constructor(
        private reviewService: ReviewsService,
        private reviewsService: ReviewsService,
        private authService: AuthService,
    ) {
        authService.getUsernameObservable().subscribe(res => {
            this.username = res;

            this.updateUserReview();
        });
    }

    ngOnInit(): void {
        if (this.userReview) {
            this.review.content = this.userReview.content;
        }

        this.updateUserReview();
    }

    Array = Array;

    review = {
        content: "",
        rating: (Math.random() * 10 + 1) | 0,
    }

    submit() {
        this.reviewService.postReview(this.review.content, this.review.rating, this.coctailId)
            .subscribe(res => {
                this.newReviewEvent.emit(res)

                if (!res.update) this.review.content = "";
            });
    }

    updateUserReview() {
        if (!this.username || !this.coctailId) {
            this.userReview = undefined;
            this.review.content = "";
            return;
        }

        this.reviewsService.getUserReview(this.username, this.coctailId)
            .subscribe({
                next: res => {
                    this.userReview = res
                    this.review.content = this.userReview.content;
                    this.review.rating = this.userReview.rating;
                },
                error: err => {
                    if (err.status == HttpStatusCode.NotFound) {
                        return;
                    }

                    throw err;
                }
            })
    }
}
