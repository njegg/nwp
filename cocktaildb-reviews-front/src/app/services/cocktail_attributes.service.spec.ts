import { TestBed } from '@angular/core/testing';

import { CocktailAttributesService } from './cocktail_attributes.service';

describe('CocktailAttributesService', () => {
  let service: CocktailAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocktailAttributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
