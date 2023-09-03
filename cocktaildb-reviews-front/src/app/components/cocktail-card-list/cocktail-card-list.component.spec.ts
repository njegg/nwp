import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailCardListComponent } from './cocktail-card-list.component';

describe('CocktailCardListComponent', () => {
  let component: CocktailCardListComponent;
  let fixture: ComponentFixture<CocktailCardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailCardListComponent]
    });
    fixture = TestBed.createComponent(CocktailCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
