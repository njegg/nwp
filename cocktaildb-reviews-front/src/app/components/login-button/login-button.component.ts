import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login-button',
    template: `
        <a routerLink="/login" [queryParams]="queryParams">Log in</a>
    `,
})
export class LoginButtonComponent {
    queryParams: any;

    constructor(private router: Router) {
        this.queryParams = { returnUrl: this.router.url };
    }
}
