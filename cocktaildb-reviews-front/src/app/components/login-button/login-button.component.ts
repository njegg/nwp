import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-button',
    template: `
        <a routerLink="/login" [queryParams]="{ returnUrl: router.url }">Log in</a>
    `,
})
export class LoginButtonComponent {
    constructor(public router: Router) { }
}
