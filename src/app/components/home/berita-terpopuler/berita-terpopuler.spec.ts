import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeritaTerpopuler } from './berita-terpopuler';

describe('BeritaTerpopuler', () => {
  let component: BeritaTerpopuler;
  let fixture: ComponentFixture<BeritaTerpopuler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeritaTerpopuler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeritaTerpopuler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
