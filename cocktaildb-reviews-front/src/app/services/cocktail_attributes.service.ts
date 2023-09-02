import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {  AttributeListResponse, AttributeType} from '../model/cocktail_attributes';
import { env } from '../environment/env';
import { NotExpr } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class CocktailAttributesService {
    constructor(private http: HttpClient) { }

    getAttributes(attributeType: AttributeType): Observable<string[]> {
        return this.http.get<AttributeListResponse>(
            `${env.api}/list.php?${attributeType}=list`,
            {
                observe: 'body',
                responseType: 'json',
            }
        )
        .pipe(map(v => v.drinks.map(v => Object.values(v)[0])))
    }
}
