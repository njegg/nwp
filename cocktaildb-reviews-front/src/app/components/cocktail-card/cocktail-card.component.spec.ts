import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailCardComponent } from './cocktail-card.component';

describe('CocktailCardComponent', () => {
  let component: CocktailCardComponent;
  let fixture: ComponentFixture<CocktailCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailCardComponent]
    });
    fixture = TestBed.createComponent(CocktailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
