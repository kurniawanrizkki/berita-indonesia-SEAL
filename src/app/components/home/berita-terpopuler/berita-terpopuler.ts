import { Component } from '@angular/core';
import { NewsService, NewsItem } from '../../../service/news/news'; // Sesuaikan path
import { NgIf, AsyncPipe, NgFor, DatePipe } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-berita-terpopuler',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor, DatePipe, RouterLink],
  templateUrl: './berita-terpopuler.html',
  styleUrl: './berita-terpopuler.css',
})
export class BeritaTerpopuler {
  topNews$: Observable<NewsItem[] | null>;

  constructor(private newsService: NewsService) {
    this.topNews$ = this.newsService.allNews$.pipe(
      startWith(null),
      map((allNews) => {
        if (!allNews) return null;
        const filtered = allNews.filter((news) => news.category === 'nasional');
        return filtered.length > 0 ? filtered.slice(0, 3) : null;
      })
    );
  }
}
