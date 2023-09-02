import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { range } from 'rxjs';
import { Cocktail } from 'src/app/model/cocktail';
import { AttributeType } from 'src/app/model/cocktail_attributes';
import { CocktailService } from 'src/app/services/cocktail.service';
import { CocktailAttributesService } from 'src/app/services/cocktail_attributes.service';
import { CocktailSearchType } from 'src/app/types/cocktail_search_type';
import { match } from 'src/app/types/match';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(
        private cocktailService: CocktailService,
        private attributeService: CocktailAttributesService,
        private fb: FormBuilder,
    ) { }

    SearchType = CocktailSearchType;

    randomCocktails: Cocktail[] = []
    cocktails: Cocktail[] = [];
    ingredients: string[] = [];

    searchForm = this.fb.group({
        "name": [""],
        "ingredient": [""],
    });

    ngOnInit(): void {
        // range(2).forEach(() =>
        //     this.cocktailService.getRandomCocktail().subscribe({
        //         next: cocktail => this.randomCocktails.push(cocktail),
        //         error: err => console.error(err),
        //     })
        // )

        this.attributeService.getAttributes(AttributeType.Ingredient)
            .subscribe({
                next: i => this.ingredients = i,
                error: e => console.error(e),
            })
    }

    searchCocktails(type: CocktailSearchType, query: string | null | undefined) {
        if (!query) return;

        match(this.cocktailService.searchBy(type, query), {
            Ok: res => res.subscribe({
                next: c => console.log(c),
                error: e => console.error(e.message),
            }),
            Err: err => console.error(err.message),
        });
    }
}
