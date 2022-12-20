import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductModel } from './order-product.model';

describe('OrderProductModel', () => {
  let component: OrderProductModel;
  let fixture: ComponentFixture<OrderProductModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProductModel ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProductModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
