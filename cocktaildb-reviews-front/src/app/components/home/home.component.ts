import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { map, range } from 'rxjs';
import { Cocktail } from 'src/app/model/cocktail';
import { AttributeType } from 'src/app/model/cocktail_attributes';
import { CocktailService } from 'src/app/services/cocktail.service';
import { CocktailSearchType } from 'src/app/types/cocktail_search_type';
import { match } from 'src/app/types/functional_types/match';
import { None } from 'src/app/types/functional_types/none';
import Ok from 'src/app/types/functional_types/ok';
import { Result } from 'src/app/types/functional_types/result';
import Some from 'src/app/types/functional_types/some';
import { Option } from 'src/app/types/functional_types/option';


enum FilterType {
    Name, Ingredent, Category, Alcoholic, Glass
}


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(
        private cocktailService: CocktailService,
        private fb: FormBuilder,
    ) { }

    CocktailSearchType = CocktailSearchType;

    randomCocktails: Cocktail[] = []
    cocktails: Cocktail[] = [];

    ingredients: string[] = [];
    categories: string[] = [];
    glasses: string[] = [];
    alchocolicTypes: string[] = [];

    letters: string[] = Array(26).fill('').map((_, i) => String.fromCharCode("A".charCodeAt(0) + i));

    filterTypes = [
        CocktailSearchType.Name,
        CocktailSearchType.Ingredient,
        CocktailSearchType.Glass,
        CocktailSearchType.Alcoholic,
        CocktailSearchType.Category,
    ];

    selectedFilterType: CocktailSearchType = CocktailSearchType.Name

    searchQuery: string = "";

    searchForm = this.fb.group({
        "name": [""],
        "ingredient": [""],
        "category": [""],
        "glass": [""],
        "alcoholic": [""],
        "filterType": [FilterType.Name]
    });

    ngOnInit(): void {
        range(0).forEach(() => 
            this.cocktailService.getRandomCocktail()
                .subscribe({
                    next: cocktail => this.randomCocktails.push(cocktail),
                    error: err => console.error(err)
                }))

        this.setAttributes(AttributeType.Glass, this.glasses);
        this.setAttributes(AttributeType.Ingredient, this.ingredients);
        this.setAttributes(AttributeType.Alcoholic, this.alchocolicTypes);
        this.setAttributes(AttributeType.Category, this.categories);
    }

    setAttributes(type: AttributeType, where: string[]): void {
        this.cocktailService.getAttributes(type)
            .subscribe({
                next: res => where.push(...res),
                error: e => console.error(e),
            })
    }

    searchCocktails(type: CocktailSearchType, query: string): void {
        if (!query) return;

        console.log(query);

        match(this.cocktailService.searchBy(type, query), {
            Ok: res => res.subscribe({
                next: res => this.cocktails = res,
                error: err => console.error(err.message),
            }),
            Err: err => console.error(err.message),
        });
    }

    reset() {
        this.searchQuery = "";
    }
}
