import { Component, Input, OnInit } from '@angular/core';
import { Review, ReviewAndVote } from 'src/app/model/review';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-cocktail-review-list',
  templateUrl: './cocktail-review-list.component.html',
  styleUrls: ['./cocktail-review-list.component.css']
})
export class CocktailReviewListComponent implements OnInit {
    @Input() cocktailId: number = 0;

    constructor (private reviewsService: ReviewsService) {}

    reviewsAndVotes: ReviewAndVote[] = [];

    ngOnInit(): void {
        this.reviewsService.getReviews(this.cocktailId).subscribe({
            next: res => { 
                this.reviewsAndVotes = res
            },
            error: err => console.error(err),
        });
    }
}
