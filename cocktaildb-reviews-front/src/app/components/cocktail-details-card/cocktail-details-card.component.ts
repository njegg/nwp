import { Component, Input, OnInit } from '@angular/core';
import { Cocktail, Instructions } from 'src/app/model/cocktail';

@Component({
    selector: 'app-cocktail-details-card',
    templateUrl: './cocktail-details-card.component.html',
    styleUrls: ['./cocktail-details-card.component.css']
})
export class CocktailDetailsCardComponent implements OnInit {
    @Input() cocktail!: Cocktail;

    selectedInstructions!: Instructions;

    ngOnInit(): void {
        this.selectedInstructions = this.cocktail.instructions[0];
    }
}
