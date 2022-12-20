import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderModel } from './order.model';

describe('OrderModel', () => {
  let component: OrderModel;
  let fixture: ComponentFixture<OrderModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderModel ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
