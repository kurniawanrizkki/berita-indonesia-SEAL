import { Component, OnInit } from '@angular/core';
import { DatePipe, NgIf, AsyncPipe } from '@angular/common';
import { NewsService, NewsItem } from '../../../service/news/news';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  imports: [DatePipe, AsyncPipe, NgIf],
  standalone: true,
})
export class Hero implements OnInit {
  // Menggunakan observable agar sinkron dengan BehaviorSubject di service
  headlines$: Observable<NewsItem[] | null>;
  currentIndex: number = 0;

  constructor(private newsService: NewsService) {
    this.headlines$ = this.newsService.allNews$.pipe(
      map((allNews) => {
        if (!allNews) return null;

        return allNews.filter((news) => news.category === 'internasional').slice(0, 5);
      })
    );
  }

  ngOnInit(): void {}

  next(limit: number) {
    if (this.currentIndex < limit - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Kembali ke awal
    }
  }

  prev(limit: number) {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = limit - 1; // Ke data terakhir
    }
  }
}
