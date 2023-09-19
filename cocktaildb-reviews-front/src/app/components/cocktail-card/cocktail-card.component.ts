import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/model/cocktail';

@Component({
    selector: 'app-cocktail-card',
    templateUrl: './cocktail-card.component.html',
    styleUrls: ['./cocktail-card.component.css']
})
export class CocktailCardComponent implements OnInit {
    @Input() cocktail: Cocktail | undefined;

    cardWidth = 600;
    cardHeight = 200;
    imageWidth = 100;

    src: string = `https://placehold.co/${this.cardHeight}x${this.imageWidth}`;

    ngOnInit(): void {
        if (this.cocktail) {
            this.src = this.cocktail.imageSource || this.src;
        }
    }
}
