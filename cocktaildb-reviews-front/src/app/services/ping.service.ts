import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../environment/env';
import { commonRequestOptions } from '../request_options';

@Injectable({
    providedIn: 'root'
})
export class PingService {

    constructor(private http: HttpClient) { }

    api = env.api_reviews;

    ping() {
        return this.http.get(`${this.api}/ping`, commonRequestOptions());
    }
}
