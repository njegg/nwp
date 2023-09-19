import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailReviewComponent } from './cocktail-review.component';

describe('CocktailReviewComponent', () => {
  let component: CocktailReviewComponent;
  let fixture: ComponentFixture<CocktailReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailReviewComponent]
    });
    fixture = TestBed.createComponent(CocktailReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
