import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from 'src/app/model/review';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
    selector: 'app-review-form',
    templateUrl: './review-form.component.html',
    styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {

    @Output() newReviewEvent = new EventEmitter<Review>();

    @Input() coctailId!: number;

    constructor(
        private reviewService: ReviewsService,
    ) { }

    Array = Array;

    review = {
        content: "",
        rating: (Math.random() * 10 + 1) | 0,
    }

    submit() {
        this.reviewService.postReview(this.review.content, this.review.rating, this.coctailId)
            .subscribe(res => {
                this.newReviewEvent.emit(res)

                this.review.content = "";
            });
    }
}
