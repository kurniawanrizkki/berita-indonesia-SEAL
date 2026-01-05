import { Component, OnInit } from '@angular/core';
import { NewsService, NewsItem } from '../../../service/news/news';
import { CommonModule } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rekomendasi',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rekomendasi.html',
  styleUrl: './rekomendasi.css',
})
export class Rekomendasi implements OnInit {
  rekomendasi$: Observable<NewsItem[] | null>;

  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalItems: number = 0;

  constructor(private newsService: NewsService) {
    this.rekomendasi$ = this.newsService.allNews$.pipe(
      startWith(null),
      map((allNews) => {
        if (!allNews) return null;
        // give a random category news
        const shuffled = [...allNews].sort(() => Math.random() - 0.5);

        const limitedNews = shuffled.slice(0, 50);

        this.totalItems = limitedNews.length;

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return limitedNews.slice(startIndex, startIndex + this.itemsPerPage);
      })
    );
  }

  ngOnInit(): void {}

  goToPage(page: number): void {
    this.currentPage = page;
    // Pemicu render ulang
    this.newsService.refreshAllNews();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get startRange(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endRange(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
}
