import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { range } from 'rxjs';
import { Cocktail } from 'src/app/model/cocktail';
import { CocktailService } from 'src/app/services/cocktail.service';
import { CocktailSearchType } from 'src/app/types/cocktail_search_type';
import { SearchableSelectComponent } from '../searchable-select/searchable-select.component';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(
        private cocktailService: CocktailService,
        private reviewService: ReviewsService,
        private router: Router,
        private toastr: ToastrService,
    ) { }

    CocktailSearchType = CocktailSearchType;
    Array = Array;

    loadingCocktails = Array(6).fill(undefined);
    cocktails: Cocktail[] = this.loadingCocktails;
    randomCocktailCount = 3;
    randomCocktails: Cocktail[] = Array(this.randomCocktailCount).fill(undefined);

    popularCocktails: Cocktail[] = Array(3).fill(undefined);

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
        let randomCocktailCount = this.randomCocktailCount - +(Math.random() < 0.5);

        this.loadRandomCocktails(randomCocktailCount);
        this.loadFilterTypes();
        this.loadCocktailsFromLocalStorage();
        this.loadPopularCocktails();

        if (this.cocktails.length == 0) {
            let randomLetter = this.letters[(Math.random() * this.letters.length) | 0];
            this.searchByFirstLetter(randomLetter);
        }
    }

    ngOnDestroy() {
        this.saveCocktailsToLocalStorage();
    }

    searchCocktails(type: CocktailSearchType, query: string): void {
        this.cocktailService.searchBy(type, query)
            .subscribe({
                next: res => {
                    this.cocktails = res
                    this.saveCocktailsToLocalStorage();
                },
                error: err => {
                    this.loadCocktailsFromLocalStorage();
                    this.cocktails = this.loadingCocktails;
                    
                    throw err;
                }
            });
    }

    searchByFirstLetter(letter: string) {
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

    private loadRandomCocktails(count: number) {
        range(count).forEach((i) => 
            this.cocktailService.getRandomCocktail()
                .subscribe({
                    next: cocktail => this.randomCocktails[i] = cocktail,
                    error: err => console.error(err)
                })
        );
    }

    private loadPopularCocktails() {
        this.reviewService.getPopularCocktails()
            .subscribe(res => res.forEach((c, i) =>
                this.cocktailService.getCocktailById(c.cocktailId)
                    .subscribe(res =>  this.popularCocktails[i] = res)
            ));
    }

    private loadFilterTypes() {
        for (let [filterType, filterValues] of this.dropdownFilters) {
            this.cocktailService.getAttributes(filterType)
                .subscribe(res => {
                    filterValues.push(...res)
                    filterValues.sort()
                });
        }
    }
}
