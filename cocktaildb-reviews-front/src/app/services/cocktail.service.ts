import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cocktail, CocktailListResponse, cocktailResponseToCocktail, cocktailsResponseToCocktail as cocktailsResponseToCocktails } from '../model/cocktail';
import Err from '../types/functional_types/err';
import { Observable, map } from 'rxjs';
import { env } from '../environment/env';
import { CocktailSearchType } from '../types/cocktail_search_type';
import { AttributeListResponse, AttributeType } from '../model/cocktail_attributes';
import { Result } from '../types/functional_types/result';
import Ok from '../types/functional_types/ok';

@Injectable({
    providedIn: 'root'
})
export class CocktailService {

    constructor(private http: HttpClient) { }

    api = env.api;

    jsonHTTPGetOptions: {
        headers?: HttpHeaders | { [header: string]: string | string[]; };
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    } = { observe: 'body', responseType: 'json' }

    getRandomCocktail(): Observable<Cocktail> {
        return this.http
            .get<CocktailListResponse>(`${this.api}/random.php`, this.jsonHTTPGetOptions)
            .pipe(map(this.getFirstCocktail));
    }

    getCocktailById(id: number): Observable<Result<Cocktail>> {
        return this.http
            .get<CocktailListResponse>(`${this.api}/lookup.php?i=${id}`, this.jsonHTTPGetOptions)
            .pipe(map(res => {
                return res.drinks ?
                    Ok(this.getFirstCocktail(res)) :
                    Err("Cocktail not found")
            }));
    }

    searchBy(type: CocktailSearchType, query: string): Result<Observable<Cocktail[]>> {
        if (query.trim() === "") {
            return Err("Search query is empty");
        }

        switch(type) {
            case CocktailSearchType.Name:        return this.searchByName(query)
            case CocktailSearchType.Ingredient:  return this.searchByAttribute(AttributeType.Ingredient, query)
            case CocktailSearchType.Alcoholic:   return this.searchByAttribute(AttributeType.Alcoholic, query)
            case CocktailSearchType.Category:    return this.searchByAttribute(AttributeType.Category, query)
            case CocktailSearchType.Glass:       return this.searchByAttribute(AttributeType.Glass, query)
            case CocktailSearchType.FirstLetter: return this.searchByFirstLetter(query)
        };
    }

    /** 
     * Returns a list of possible cocktail attribute values.
     * Attributes are: `Glass`, `Category`, `Alcoholic`, `Ingredient`
     */
    getAttributes(attributeType: AttributeType): Observable<string[]> {
        return this.http
            .get<AttributeListResponse>( `${env.api}/list.php?${attributeType}=list`, this.jsonHTTPGetOptions)
            .pipe(map(res => res.drinks.map(v => Object.values(v)[0])))
    }

    private searchByName(name: string): Result<Observable<Cocktail[]>> {
        if (name.trim() === "") {
            return Err("Cocktail name is empty");
        }

        return Ok(
            this.http
                .get<CocktailListResponse>(`${this.api}/search.php?s=${name}`, this.jsonHTTPGetOptions)
                .pipe(map(cocktailsResponseToCocktails))
        );
    }

    private searchByFirstLetter(letter: string): Result<Observable<Cocktail[]>> {
        if (letter.length != 1) {
            return Err(`${letter} is not a valid letter`);
        }

        return Ok(
            this.http
                .get<CocktailListResponse>(`${this.api}/search.php?a=${letter}`, this.jsonHTTPGetOptions)
                .pipe(map(cocktailsResponseToCocktails))
        );
    }

    private searchByAttribute(attributeType: AttributeType, query: string): Result<Observable<Cocktail[]>> {
        return Ok(
            this.http
                .get<CocktailListResponse>( `${this.api}/filter.php?${attributeType}=${query}`, this.jsonHTTPGetOptions)
                .pipe(map(cocktailsResponseToCocktails))
        );
    }

    private getFirstCocktail(cocktails: CocktailListResponse): Cocktail {
        return cocktailResponseToCocktail(cocktails.drinks[0]);
    }
}
