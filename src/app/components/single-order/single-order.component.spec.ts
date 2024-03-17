import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOrderComponent } from './single-order.component';

describe('SingleOrderComponent', () => {
  let component: SingleOrderComponent;
  let fixture: ComponentFixture<SingleOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleOrderComponent]
    });
    fixture = TestBed.createComponent(SingleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
