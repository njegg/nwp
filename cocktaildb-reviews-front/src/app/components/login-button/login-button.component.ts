import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login-button',
    template: `
        <!-- <button (click)="navigateToLoginPage()">Log in</button> -->
        <a routerLink="/login" [queryParams]>Log in</a>
    `,
})
export class LoginButtonComponent {
    constructor(private router: Router) { }

    queryParams = { returnUrl: this.router.url };

    navigateToLoginPage() {
        this.router.navigate(["/login"], { queryParams: { returnUrl: this.router.url } })
    }
}
