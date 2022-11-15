import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ProductDetailsComponentUser} from './product-details.component'

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponentUser;
  let fixture: ComponentFixture<ProductDetailsComponentUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponentUser ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponentUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});