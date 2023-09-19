import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailReviewListComponent } from './cocktail-review-list.component';

describe('CocktailReviewListComponent', () => {
  let component: CocktailReviewListComponent;
  let fixture: ComponentFixture<CocktailReviewListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailReviewListComponent]
    });
    fixture = TestBed.createComponent(CocktailReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
