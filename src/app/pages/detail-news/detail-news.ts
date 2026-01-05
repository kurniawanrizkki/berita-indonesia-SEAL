import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService, NewsItem } from '../../service/news/news';
import { NgIf, AsyncPipe, NgFor, DatePipe } from '@angular/common';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
interface CommentItem {
  id: number;
  name: string;
  avatar: string;
  message: string;
  date: string;
}
@Component({
  selector: 'app-detail-news',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor, DatePipe, RouterLink, FormsModule],
  templateUrl: './detail-news.html',
  styleUrl: './detail-news.css',
})
export class DetailNews {
  detailNews$: Observable<NewsItem | null>;
  topNews$: Observable<NewsItem[] | null>;
  relatedNews$: Observable<NewsItem[] | null>;

  constructor(private newsService: NewsService, private route: ActivatedRoute) {
    // ================= DETAIL =================
    this.detailNews$ = combineLatest([this.newsService.allNews$, this.route.paramMap]).pipe(
      map(([allNews, params]) => {
        if (!allNews) return null;

        const kategori = params.get('kategori');
        const title = params.get('title');

        if (!kategori || !title) return null;

        return allNews.find((n) => n.category === kategori && n.slug === title) || null;
      })
    );

    // ================= TERPOPULER (KANAN) =================
    this.topNews$ = this.newsService.allNews$.pipe(
      startWith(null),
      map((allNews) => {
        if (!allNews) return null;
        const filtered = allNews.filter((news) => news.category === 'nasional');
        return filtered.length > 0 ? filtered.slice(0, 3) : null;
      })
    );

    // ================= BERITA TERKAIT (KIRI) =================
    this.relatedNews$ = combineLatest([this.newsService.allNews$, this.detailNews$]).pipe(
      map(([allNews, detail]) => {
        if (!allNews || !detail) return null;

        const related = allNews.filter(
          (news) => news.category === detail.category && news.slug !== detail.slug
        );

        return related.length > 0 ? related.slice(0, 3) : null;
      })
    );
  }
  commentText = '';
  maxLength = 50;

  comments: CommentItem[] = [
    {
      id: 1,
      name: 'UJANG YUSMIEDI S.P., M.Agr.',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU0a0iDtUPUzs0GFM6DSuovK0uOE4-Sc40Pg&s',
      message: 'Berita Yang Sangat Bermanfaat',
      date: '28 Mar 2024 11:15',
    },
  ];

  submitComment() {
    if (!this.commentText.trim()) return;

    this.comments.unshift({
      id: Date.now(),
      name: 'Anda',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU0a0iDtUPUzs0GFM6DSuovK0uOE4-Sc40Pg&s',
      message: this.commentText,
      date: new Date().toLocaleString('id-ID'),
    });

    this.commentText = '';
  }
}
