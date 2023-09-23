import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableSelectComponent } from './searchable-select.component';

describe('SearchableSelectComponent', () => {
  let component: SearchableSelectComponent;
  let fixture: ComponentFixture<SearchableSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchableSelectComponent]
    });
    fixture = TestBed.createComponent(SearchableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
