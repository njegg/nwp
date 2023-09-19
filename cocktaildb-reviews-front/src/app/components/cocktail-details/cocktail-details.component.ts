import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cocktail } from 'src/app/model/cocktail';
import { CocktailService } from 'src/app/services/cocktail.service';
import { match } from 'src/app/types/functional_types/match';

@Component({
    selector: 'app-cocktail-details',
    templateUrl: './cocktail-details.component.html',
    styleUrls: ['./cocktail-details.component.css']
})
export class CocktailDetailsComponent implements OnInit {
    cocktail: Cocktail | undefined;

    constructor(
        private cocktailService: CocktailService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.cocktailService.getCocktailById(+id).subscribe({
                next: res => match(res, {
                    Ok: cocktail => this.cocktail = cocktail,
                    Err: err => {
                        this.router.navigate(['']);
                        throw err;
                    },
                }),
                error: err => {
                    this.router.navigate(['']);
                    throw err;
                }
            })
        }
    }


}
