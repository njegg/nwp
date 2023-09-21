import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    username: string | undefined = "...";

    constructor(
        private authService: AuthService,
        private router: Router,
        private location: Location,
    ) {}

    ngOnInit(): void {
        this.authService.getUsernameObservable().subscribe(u => this.username = u);
    }

    isOnPage(path: string) {
        return this.location.path().startsWith(path);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(["/"]);
    }

    goToRegister() {
        this.router.navigate(["/register"])
    }
}
