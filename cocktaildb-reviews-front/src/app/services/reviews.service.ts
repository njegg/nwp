import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../environment/env';
import { PopularReviewsResponse, PostReviewResponse, Review, ReviewAndVote, Vote } from '../model/review';
import { Observable } from 'rxjs';

let api = env.api_reviews;

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {

    username: string | undefined = undefined;

    constructor(
        private http: HttpClient,
    ) { }

    getReviews(cocktailId: number): Observable<ReviewAndVote[]> {
        return this.http
            .get<ReviewAndVote[]>(`${api}/reviews/${cocktailId}`);
    }

    getPopularCocktails(): Observable<PopularReviewsResponse> {
        return this.http
            .get<PopularReviewsResponse>(`${api}/reviews/popular`);
    }

    voteReview(reviewId: string, vote: Vote): Observable<ReviewAndVote> {
        return this.http
            .post<ReviewAndVote>(`${api}/reviews/${reviewId}/${Vote.toString(vote)}`, {});
    }

    postReview(content: string, rating: number, cocktailId: number) {
        return this.http
            .post<PostReviewResponse>(
                `${api}/reviews`,
                { rating, content, cocktailId },
            );
    }

    getUserReview(username: string, cocktailId: number) {
        return this.http
            .get<Review>(`${api}/reviews/${cocktailId}/${username}`);
    }
}