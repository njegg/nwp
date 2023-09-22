import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailDetailsCardComponent } from './cocktail-details-card.component';

describe('CocktailDetailsCardComponent', () => {
  let component: CocktailDetailsCardComponent;
  let fixture: ComponentFixture<CocktailDetailsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailDetailsCardComponent]
    });
    fixture = TestBed.createComponent(CocktailDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
