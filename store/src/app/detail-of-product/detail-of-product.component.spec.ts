import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOfProductComponent } from './detail-of-product.component';

describe('DetailOfProductComponent', () => {
  let component: DetailOfProductComponent;
  let fixture: ComponentFixture<DetailOfProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOfProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailOfProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
