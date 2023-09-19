import { Component, Input } from '@angular/core';
import { Cocktail } from 'src/app/model/cocktail';

@Component({
  selector: 'app-cocktail-card-list',
  templateUrl: './cocktail-card-list.component.html',
  styleUrls: ['./cocktail-card-list.component.css']
})
export class CocktailCardListComponent {
  @Input() cocktails: Array<Cocktail | undefined> = [];
}
