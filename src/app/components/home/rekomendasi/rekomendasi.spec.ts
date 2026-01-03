import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rekomendasi } from './rekomendasi';

describe('Rekomendasi', () => {
  let component: Rekomendasi;
  let fixture: ComponentFixture<Rekomendasi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rekomendasi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rekomendasi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
