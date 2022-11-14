import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ProductsListComponentUser } from './products-list.component'

describe('ProductsListComponent', () => {
  let component: ProductsListComponentUser;
  let fixture: ComponentFixture<ProductsListComponentUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsListComponentUser ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsListComponentUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});