import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cocktail, CocktailListResponse, cocktailResponseToCocktail, cocktailListResponseToCocktailList } from '../model/cocktail';
import { Observable, map } from 'rxjs';
import { env } from '../environment/env';
import { CocktailSearchType } from '../types/cocktail_search_type';
import { AttributeListResponse, AttributeType } from '../model/cocktail_attributes';
import { getJsonBodyOptions } from './options';

@Injectable({
    providedIn: 'root'
})
export class CocktailService {

    constructor(private http: HttpClient) { }

    api = env.api_cocktail;

    getRandomCocktail(): Observable<Cocktail> {
        return this.http
            .get<CocktailListResponse>(`${this.api}/random.php`, getJsonBodyOptions)
            .pipe(map(this.getFirstCocktail));
    }

    getCocktailById(id: number): Observable<Cocktail> {
        return this.http
            .get<CocktailListResponse>(`${this.api}/lookup.php?i=${id}`, getJsonBodyOptions)
            .pipe(map(res => {
                if (res.drinks) {
                    return this.getFirstCocktail(res);
                }

                throw new HttpErrorResponse({ error: { message: "Cocktail not found"}, status: HttpStatusCode.NotFound });
            }));
    }

    searchBy(type: CocktailSearchType, query: string): Observable<Cocktail[]> {
        if (query.trim() === "") {
            throw new Error("Search query is empty");
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
    getAttributes(searchType: CocktailSearchType): Observable<string[]> {
        let urlLetter = CocktailSearchType.getAttributeUrlLetter(searchType);

        return this.http
            .get<AttributeListResponse>(`${env.api_cocktail}/list.php?${urlLetter}=list`, getJsonBodyOptions)
            .pipe(map(res => {
                if (res.drinks) {
                    return res.drinks.map(v => Object.values(v)[0]);
                }

                throw new Error(`'${CocktailSearchType.getAttributeUrlLetter(searchType)}' is not supported as attirbute type`);
            }));
    }

    private searchByName(name: string): Observable<Cocktail[]> {
        if (name.trim() === "") {
            throw new Error("Cocktail name is empty");
        }

        return this.http
            .get<CocktailListResponse>(`${this.api}/search.php?s=${name}`, getJsonBodyOptions)
            .pipe(map(cocktailListResponseToCocktailList));
    }

    private searchByFirstLetter(letter: string): Observable<Cocktail[]> {
        if (letter.length != 1) {
            throw new Error(`${letter} is not a valid letter`);
        }

        return this.http
                .get<CocktailListResponse>(`${this.api}/search.php?f=${letter}`, getJsonBodyOptions)
                .pipe(map(cocktailListResponseToCocktailList));
    }

    private searchByAttribute(attributeType: AttributeType, query: string): Observable<Cocktail[]> {
        return this.http
                .get<CocktailListResponse>(`${this.api}/filter.php?${attributeType}=${query}`, getJsonBodyOptions)
                .pipe(map(cocktailListResponseToCocktailList))
    }

    private getFirstCocktail(cocktails: CocktailListResponse): Cocktail {
        return cocktailResponseToCocktail(cocktails.drinks[0]);
    }
}
