import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CocktailCardComponent } from './components/cocktail-card/cocktail-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PillComponent } from './components/common/pill/pill.component';
import { SearchDropdownComponent } from './components/common/search-dropdown/search-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CocktailCardComponent,
    PillComponent,
    SearchDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
