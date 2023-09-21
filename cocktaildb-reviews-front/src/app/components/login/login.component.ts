import { Component } from '@angular/core';
import { FormBuilder, NgForm, PatternValidator, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Patterns } from 'src/app/util/patterns';

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

    form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });

    errors = [
        {control: this.form.controls.username, message: "Username is required"},
        {control: this.form.controls.password, message: "Password is required"},
    ];

    login() {
        this.form.markAllAsTouched();

        if (this.form.valid) {
            let username = this.form.value.username || ""; 
            let password = this.form.value.password || "";

            this.authService.login(username, password)
                .subscribe(token => {
                    localStorage.setItem('token', token);

                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigate([returnUrl]);

                    this.toastr.success(`Welcome ${username}`)
                });
        }
    }
}