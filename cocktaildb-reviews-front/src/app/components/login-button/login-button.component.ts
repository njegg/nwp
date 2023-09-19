import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login-button',
    template: `
        <button (click)="navigateToLoginPage()">Log in</button>
    `,
})
export class LoginButtonComponent implements OnInit {

    isOnLoginPage = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.isOnLoginPage = window.location.pathname == "/login"
    }
    
    navigateToLoginPage() {
        this.router.navigate(["/login"], { queryParams: { returnUrl: this.router.url } })
    }
}
