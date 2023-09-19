import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

type RequestOptions = {
    headers?: { [header: string]: string | string[]; } //| HttpHeaders ;
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
};

export const getJsonBodyOptions: RequestOptions = { observe: 'body', responseType: 'json' }