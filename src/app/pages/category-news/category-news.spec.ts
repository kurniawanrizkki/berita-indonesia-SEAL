import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNews } from './category-news';

describe('CategoryNews', () => {
  let component: CategoryNews;
  let fixture: ComponentFixture<CategoryNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryNews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryNews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
