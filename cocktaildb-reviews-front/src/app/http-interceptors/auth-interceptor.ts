import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "../environment/env";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.startsWith(env.api_cocktail)) {
            return next.handle(req);
        }

        return next.handle(req.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "ngrok-skip-browser-warning": "true",
            }
        }));
    }

}