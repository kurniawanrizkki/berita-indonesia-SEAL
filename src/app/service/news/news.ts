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

    const requests = this.categories.map((cat) => {
      return this.http.get<ApiResponse>(`${this.baseUrl}/${cat}`).pipe(
        map((response) => {
          return response.data.map((item: NewsItem) => ({
            ...item,
            category: cat,
          }));
        })
      );
    });

    forkJoin(requests)
      .pipe(map((nestedArrays) => nestedArrays.flat()))
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

  // Fungsi pembantu untuk filter kategori di komponen
  getNewsByCategory(categoryName: string): Observable<NewsItem[]> {
    return this.allNews$.pipe(
      map((allBerita) => {
        // Pastikan allBerita tidak null sebelum melakukan filter
        return allBerita ? allBerita.filter((b) => b.category === categoryName) : [];
      })
    );
  }
}
