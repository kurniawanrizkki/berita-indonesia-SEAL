import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor, AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { NewsService, NewsItem } from '../../service/news/news';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-news',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, DatePipe, NgClass, RouterLink],
  templateUrl: './category-news.html',
  styleUrls: ['./category-news.css'],
})
export class CategoryNews {
  rekomendasi$;
  private page$ = new BehaviorSubject<number>(1);

  currentPage = 1;
  itemsPerPage = 8;

  totalItems = 0;
  totalPages = 0;
  startRange = 0;
  endRange = 0;
  kategori = '';

  constructor(private newsService: NewsService, private route: ActivatedRoute) {
    const category$ = this.route.paramMap.pipe(
      map((params) => params.get('kategori')),
      startWith(null)
    );

    this.rekomendasi$ = combineLatest([
      this.newsService.allNews$.pipe(startWith(null)),
      category$,
      this.page$,
    ]).pipe(
      map(([allNews, category, page]) => {
        if (!allNews || !category) return null;
        if (page !== this.currentPage) {
          this.currentPage = page;
        }

        this.kategori = category.toLowerCase();
        const filtered = allNews.filter((n) => n.category === category);

        this.totalItems = filtered.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

        const start = (page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;

        this.startRange = this.totalItems === 0 ? 0 : start + 1;
        this.endRange = Math.min(end, this.totalItems);

        return filtered.slice(start, end);
      })
    );

    // 🔥 RESET PAGE SAAT CATEGORY BERUBAH
    category$.subscribe(() => {
      this.currentPage = 1;
      this.page$.next(1);
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.page$.next(page); // 🔥 trigger observable
  }
}
