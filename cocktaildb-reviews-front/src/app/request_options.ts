import { HttpContext, HttpHeaders, HttpParams, HttpParamsOptions, HttpRequest } from "@angular/common/http"

type Options = { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | undefined; reportProgress?: boolean | undefined; responseType?: "json" | undefined; withCredentials?: boolean | undefined; };


export function commonRequestOptions(): Options {
    return {
        observe: "body",
        responseType: "json",
        headers: {
            "ngrok-skip-browser-warning": "true",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }
}
