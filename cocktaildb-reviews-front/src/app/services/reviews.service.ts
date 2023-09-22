import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../environment/env';
import { PostReviewResponse, Review, ReviewAndVote, Vote } from '../model/review';
import { Observable } from 'rxjs';
import { commonRequestOptions } from '../request_options';
import { AuthService } from './auth.service';

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
            .get<ReviewAndVote[]>(`${api}/reviews/${cocktailId}`, commonRequestOptions());
    }

    voteReview(reviewId: string, vote: Vote): Observable<ReviewAndVote> {
        return this.http
            .post<ReviewAndVote>(`${api}/reviews/${reviewId}/${Vote.toString(vote)}`, {}, commonRequestOptions());
    }

    postReview(content: string, rating: number, cocktailId: number) {
        return this.http.post<PostReviewResponse>(
            `${api}/reviews`,
            { rating, content, cocktailId },
            commonRequestOptions()
        );
    }

    getUserReview(username: string, cocktailId: number) {
        return this.http.get<Review>(
            `${api}/reviews/${cocktailId}/${username}`,
            commonRequestOptions()
        );
    }
}