import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';

export interface NewsImage {
  small: string;
  large: string;
}

export interface NewsItem {
  title: string;
  link: string;
  contentSnippet: string;
  isoDate: string;
  slug: string;
  image: NewsImage;
  category?: string;
}

export interface ApiResponse {
  message: string;
  total: number;
  data: NewsItem[];
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseUrl = '/api/cnn-news';

  private categories = [
    'nasional',
    'internasional',
    'ekonomi',
    'olahraga',
    'teknologi',
    'hiburan',
    'gaya-hidup',
  ];

  private newsSubject = new BehaviorSubject<NewsItem[] | null>(null);
  allNews$ = this.newsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshAllNews();
  }

  refreshAllNews(): void {
    this.loadingSubject.next(true);

    const requests = this.categories.map((cat) =>
      this.http.get<ApiResponse>(`${this.baseUrl}/${cat}`).pipe(
        map((response) =>
          response.data.map((item: NewsItem) => ({
            ...item,
            category: cat,
            slug: item.title.replaceAll(' ', '-').toLowerCase(),
          }))
        )
      )
    );

    forkJoin(requests)
      .pipe(
        map((nestedArrays) => {
          const allNews = nestedArrays.flat();

          // KATEGORI "TERBARU"
          // 5 BERITA TERBARU TIAP KATEGORI
          // =========================
          const terbaruNews: NewsItem[] = [];

          this.categories.forEach((cat) => {
            const latestPerCategory = allNews
              .filter((news) => news.category === cat)
              .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
              .slice(0, 5)
              .map((item) => ({
                ...item,
                category: 'terbaru',
              }));

            terbaruNews.push(...latestPerCategory);
          });

          // Gabungkan berita asli + kategori terbaru
          return [...allNews, ...terbaruNews];
        })
      )
      .subscribe({
        next: (combinedData: NewsItem[]) => {
          this.newsSubject.next(combinedData);
          this.loadingSubject.next(false);
        },
        error: (err) => {
          console.error('Gagal mengambil berita:', err);
          this.loadingSubject.next(false);
        },
      });
  }

  // FILTER BERITA BERDASARKAN KATEGORI
  getNewsByCategory(categoryName: string): Observable<NewsItem[]> {
    return this.allNews$.pipe(
      map((allBerita) => (allBerita ? allBerita.filter((b) => b.category === categoryName) : []))
    );
  }
}
