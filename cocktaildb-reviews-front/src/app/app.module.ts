import { ErrorHandler, NgModule } from '@angular/core';
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
import { CocktailReviewComponent } from './components/cocktail-review/cocktail-review.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalErrorHandler } from './errors/error_handler';
import { ApiUnavailableComponent } from './components/api-unavailable/api-unavailable.component';
import { RegisterComponent } from './components/register/register.component';
import { CocktailDetailsCardComponent } from './components/cocktail-details-card/cocktail-details-card.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CocktailCardComponent,
    CocktailCardListComponent,
    CocktailDetailsComponent,
    CocktailReviewComponent,
    LoginComponent,
    NavbarComponent,
    LoginButtonComponent,
    ApiUnavailableComponent,
    RegisterComponent,
    CocktailDetailsCardComponent,
    ReviewFormComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
