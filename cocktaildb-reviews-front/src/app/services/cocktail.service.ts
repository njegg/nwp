import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Cocktail, CocktailResponse, CocktailsResponse, cocktailResponseToCocktail, cocktailsResponseToCocktail as cocktailsResponseToCocktails } from '../model/cocktail';
import { Result } from '../types/result';
import Err from '../types/err';
import Ok from '../types/ok';
import { Observable, map } from 'rxjs';
import { env } from '../environment/env';
import { CocktailSearchType } from '../types/cocktail_search_type';

@Injectable({
    providedIn: 'root'
})
export class CocktailService {

    constructor(private http: HttpClient) { }

    api = env.api;

    getRandomCocktail(): Observable<Cocktail> {
        return this.http.get<CocktailsResponse>(
            `${this.api}/random.php`,
            { observe: 'body', responseType: 'json', }
        ).pipe(map(this.getFirstCocktail));
    }

    searchBy(type: CocktailSearchType, query: string): Result<Observable<Cocktail[]>> {
        if (query.trim() === "") {
            return Err("Search query is empty");
        }

        switch(type) {
            case CocktailSearchType.Name:        return this.searchByName(query)
            case CocktailSearchType.Ingredient:  return this.searchByIngredient(query)
            case CocktailSearchType.Alcoholic:   return Err("Not implemented")
            case CocktailSearchType.Category:    return Err("Not implemented")
            case CocktailSearchType.FirstLetter: return Err("Not implemented")
            case CocktailSearchType.Glass:       return Err("Not implemented")
            case CocktailSearchType.ID:          return Err("Not implemented")
        };
    }

    private searchByName(name: string): Result<Observable<Cocktail[]>> {
        return Ok(
            this.http.get<CocktailsResponse>(
                `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`,
                {
                    observe: 'body',
                    responseType: 'json',
                }
            ).pipe(map(cocktailsResponseToCocktails))
        );
    }

    private searchByIngredient(ingredient: string): Result<Observable<Cocktail[]>> {
        return Ok(
            this.http.get<CocktailsResponse>(
                `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`,
                {
                    observe: 'body',
                    responseType: 'json',
                }
            ).pipe(map(cocktailsResponseToCocktails))
        );
    }

    private getFirstCocktail(cocktails: CocktailsResponse): Cocktail {
        return cocktailResponseToCocktail(cocktails.drinks[0]);
    }
}
