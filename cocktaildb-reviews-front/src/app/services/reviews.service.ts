import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../environment/env';
import { ReviewAndVote, Vote } from '../model/review';
import { Observable } from 'rxjs';
import { commonRequestOptions } from '../request_options';

let api = env.api_reviews;

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {

    constructor(private http: HttpClient) {}

    getReviews(cocktailId: number): Observable<ReviewAndVote[]> {
        return this.http
            .get<ReviewAndVote[]>(`${api}/reviews/${cocktailId}`, commonRequestOptions());
    }

    voteReview(reviewId: string, vote: Vote): Observable<ReviewAndVote> {
        return this.http
            .post<ReviewAndVote>(`${api}/reviews/${reviewId}/${Vote.toString(vote)}`, {}, commonRequestOptions());
    }
}