import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cocktail } from 'src/app/model/cocktail';
import { PostReviewResponse, Review, ReviewAndVote, Vote } from 'src/app/model/review';
import { CocktailService } from 'src/app/services/cocktail.service';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
    selector: 'app-cocktail-details',
    templateUrl: './cocktail-details.component.html',
    styleUrls: ['./cocktail-details.component.css']
})
export class CocktailDetailsComponent implements OnInit {
    cocktail: Cocktail | undefined;

    reviewsAndVotes: ReviewAndVote[] = [];

    username: string | undefined = undefined;
    userReview: Review | undefined = undefined;

    constructor(
        private cocktailService: CocktailService,
        private reviewsService: ReviewsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.cocktailService.getCocktailById(+id).subscribe({
                next: res => this.cocktail = res,
                error: err => {
                    this.router.navigate(['']);
                    throw err;
                }
            })

            this.reviewsService.getReviews(+id)
                .subscribe(res => this.reviewsAndVotes = res);
        }

    }
    
    newReview(response: PostReviewResponse) {
        let review = response.review;

        if (response.update) {
            for (let reviewAndVote of this.reviewsAndVotes) {
                if (reviewAndVote.review._id == review._id) {
                    reviewAndVote.review.content = review.content;
                    reviewAndVote.review.rating = review.rating;

                    break;
                }
            }
        } else {
            this.reviewsAndVotes.unshift({ review, vote: Vote.NONE });
        }
    }
}
