import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { env } from '../environment/env';

const api = env.api_reviews;


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    username: string | undefined = undefined;

    usernameBS: BehaviorSubject<string | undefined>;

    constructor(private http: HttpClient) {
        this.updateUsername();
        this.usernameBS = new BehaviorSubject<string | undefined>(this.username);
    }

    login(username: string, password: string): Observable<string> {
        return this.http.post<string>(`${api}/auth/login`, { username, password }, {
            observe: "body",
            responseType: "json",
        }).pipe(map(token => {
            localStorage.setItem("token", token);
            this.updateUsername();

            return token;
        }));
    }

    logout() {
        this.usernameBS.next(undefined);
        localStorage.setItem("token", "");
    }

    getUsernameObservable(): Observable<string | undefined> {
        return this.usernameBS.asObservable();
    }

    updateUsername() {
        return this.http.get<string | undefined>(`${api}/auth`, {
            observe: "body",
            responseType: "json",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        .subscribe(res => this.usernameBS.next(res))
    }
}