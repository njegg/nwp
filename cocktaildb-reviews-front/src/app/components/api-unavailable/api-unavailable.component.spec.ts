import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiUnavailableComponent } from './api-unavailable.component';

describe('ApiUnavailableComponent', () => {
  let component: ApiUnavailableComponent;
  let fixture: ComponentFixture<ApiUnavailableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiUnavailableComponent]
    });
    fixture = TestBed.createComponent(ApiUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
