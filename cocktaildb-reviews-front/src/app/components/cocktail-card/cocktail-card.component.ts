import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/model/cocktail';

@Component({
    selector: 'app-cocktail-card',
    templateUrl: './cocktail-card.component.html',
    styleUrls: ['./cocktail-card.component.css']
})
export class CocktailCardComponent implements OnInit {
    @Input() cocktail!: Cocktail;

    cardWidth = 600;
    cardHeight = 200;
    imageWidth = 100;

    src: string = `https://placehold.co/${this.cardHeight}x${this.imageWidth}`;


    ngOnInit(): void {
        this.src = this.cocktail.imageSource || this.src;
    }

}
