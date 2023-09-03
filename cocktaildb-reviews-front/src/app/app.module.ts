import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CocktailCardComponent } from './components/cocktail-card/cocktail-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CocktailCardListComponent } from './components/cocktail-card-list/cocktail-card-list.component';
import { CocktailDetailsComponent } from './components/cocktail-details/cocktail-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CocktailCardComponent,
    CocktailCardListComponent,
    CocktailDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
