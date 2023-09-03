import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { range } from 'rxjs';
import { Cocktail } from 'src/app/model/cocktail';
import { CocktailService } from 'src/app/services/cocktail.service';
import { CocktailSearchType } from 'src/app/types/cocktail_search_type';
import { match } from 'src/app/types/functional_types/match';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(
        private cocktailService: CocktailService,
        private router: Router,
    ) { }

    CocktailSearchType = CocktailSearchType;
    Array = Array;

    randomCocktails: Cocktail[] = []
    cocktails: Cocktail[] = [];

    ingredients: string[] = [];
    categories: string[] = [];
    glasses: string[] = [];
    alchocolicTypes: string[] = [];

    /**
     * Generated letters A-Z
     */
    letters: string[] = Array(26)
        .fill('')
        .map((_, i) => String.fromCharCode("A".charCodeAt(0) + i));

    /**
     * Used for selecting the filter method
     */
    filterTypes = [
        CocktailSearchType.Name,
        CocktailSearchType.Ingredient,
        CocktailSearchType.Glass,
        CocktailSearchType.Alcoholic,
        CocktailSearchType.Category,
    ];
    selectedFilterType: CocktailSearchType = CocktailSearchType.Name

    dropdownFilters = new Map<CocktailSearchType, string[]>()
        .set(CocktailSearchType.Ingredient, [])
        .set(CocktailSearchType.Glass, [])
        .set(CocktailSearchType.Alcoholic, [])
        .set(CocktailSearchType.Category, []);

    searchQuery: string = "";

    ngOnInit(): void {
        range(3).forEach(() => 
            this.cocktailService.getRandomCocktail()
                .subscribe({
                    next: cocktail => this.randomCocktails.push(cocktail),
                    error: err => console.error(err)
                })
        );

        for (let [filterType, filterValues] of this.dropdownFilters) {
            this.cocktailService.getAttributes(filterType)
                .subscribe({
                    next: res => {
                        match(res,{
                            Ok: res => {
                                filterValues.push(...res)
                                filterValues.sort()
                            },
                            Err: err => console.error(err),
                        })
                    },
                    error: err => console.error(err),
                })
        }

        this.loadCocktailsFromLocalStorage();
    }

    ngOnDestroy() {
        this.saveCocktailsToLocalStorage();
    }

    searchCocktails(type: CocktailSearchType, query: string): void {
        if (!query) return;

        match(this.cocktailService.searchBy(type, query), {
            Ok: res => res.subscribe({
                next: res => {
                    this.cocktails = res
                    this.saveCocktailsToLocalStorage();
                },
                error: err => console.error(err.message),
            }),
            Err: err => console.error(err.message),
        });
    }

    searchByFirstLetter(letter: string, form: HTMLElement) {
        this.searchCocktails(CocktailSearchType.FirstLetter, letter);
        this.resetSearchQuery();
    }

    resetSearchQuery() {
        this.searchQuery = "";
    }

    private saveCocktailsToLocalStorage() {
        localStorage.setItem('loaded cocktails',  JSON.stringify(this.cocktails));
    }

    private loadCocktailsFromLocalStorage() {
        this.cocktails = JSON.parse(localStorage.getItem('loaded cocktails') || '[]');
    }
}
