import { Component, Input, OnInit } from '@angular/core';
import { Review, ReviewAndVote, Vote } from 'src/app/model/review';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-cocktail-review',
  templateUrl: './cocktail-review.component.html',
  styleUrls: ['./cocktail-review.component.css']
})
export class CocktailReviewComponent {
    @Input() reviewAndVote!: ReviewAndVote;

    Vote = Vote;

    constructor(private reviewService: ReviewsService) { }

    voteReview(vote: Vote): void {
        this.reviewService.voteReview(this.reviewAndVote.review._id, vote)
            .subscribe(res => this.reviewAndVote = res);
    }
}
