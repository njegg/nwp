import { Location } from '@angular/common';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Injector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
    constructor(@Inject(Injector) private injector: Injector) {
        super();
    }

    private get toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }

    private get router(): Router {
        return this.injector.get(Router);
    }

    private get location(): Location {
        return this.injector.get(Location);
    }

    public override handleError(error: any): void {
        if (error instanceof HttpErrorResponse) {
            if (error.status == HttpStatusCode.Unauthorized) {
                
                this.toastrService.error(
                    this.router.url.startsWith("/login") ? undefined : "Click here to log in",
                    error.error.message,
                    { disableTimeOut: true, onActivateTick: true, closeButton: true }
                ).onTap.subscribe(_ => this.router.navigate(['/login'], { queryParams: { returnUrl: this.location.path() } }))

            } else {

                this.toastrService.error(
                    undefined,
                    error.error.message,
                    { onActivateTick: true, closeButton: true }
                );

            }
        } else {
            console.error("Unknown error")
            console.error(error)
        }
    }
}
