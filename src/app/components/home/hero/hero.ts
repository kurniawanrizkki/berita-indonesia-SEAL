import { Component } from '@angular/core';
import { Data, Berita } from '../../../service/data';
import { NgIf, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './hero.html',
})
export class Hero {
  headlines$!: Observable<Berita[]>;
  currentIndex = 0;

  constructor(private data: Data) {
    this.headlines$ = this.data.getHeadlineNews();
  }

  next(total: number) {
    this.currentIndex = (this.currentIndex + 1) % total;
  }

  prev(total: number) {
    this.currentIndex = (this.currentIndex - 1 + total) % total;
  }
}
