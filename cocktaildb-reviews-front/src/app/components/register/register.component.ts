import { NotExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Patterns } from 'src/app/util/patterns';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private toastr: ToastrService,
        private router: Router,
    ) { }

    form = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.pattern(Patterns.password)]],
        email: ['', [Validators.required, Validators.pattern(Patterns.email)]],
    });

    errors = [
        {control: this.form.controls.username, message: "Username must have at least 3 characters"},
        {control: this.form.controls.password, message: "Password must have at least 4 characters, at least one number and one letter"},
        {control: this.form.controls.email, message: "Email is not valid"},
    ]

    register() {
        this.form.markAllAsTouched();

        if (!this.form.valid) {
            return;
        }

        let user = this.form.value;
        let username = user.username || "";
        let password = user.password || "";
        let email = user.email || "";

        this.authService.register(username, password, email)
            .subscribe({
                next: _ => {
                    this.toastr.success("Account created")
                
                    this.router.navigate(['/login']);
                }
            })
    }
}
