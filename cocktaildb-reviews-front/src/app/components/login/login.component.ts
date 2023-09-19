import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
    ) { }

    loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    })

    login() {
        if (this.loginForm.valid) {
            let username = this.loginForm.value.username || ""; 
            let password = this.loginForm.value.password || "";

            this.authService.login(username, password)
                .subscribe({
                    next: token => {
                        localStorage.setItem('token', token);

                        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                        this.router.navigate([returnUrl]);

                        this.toastr.success(`Welcome ${username}`)
                    },
                    error: err => console.error(err.error),
                })
        }
    }
}