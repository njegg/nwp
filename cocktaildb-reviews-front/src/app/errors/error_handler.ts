import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
    constructor(@Inject(Injector) private injector: Injector) {
        super();
    }

    private get toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }

    public override handleError(error: any): void {
        if (error instanceof HttpErrorResponse) {
            this.toastrService.error(
                undefined,
                error.error.message,
                { onActivateTick: true }
            );
        } else {
            console.error("Unknown error")
            console.error(error)
        }
    }
}
