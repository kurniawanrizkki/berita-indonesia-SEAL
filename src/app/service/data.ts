import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Berita {
  title: string;
  link: string;
  isoDate: string;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class Data {
  constructor(private http: HttpClient) {}
  getHeadlineNews(): Observable<Berita[]> {
    return this.http.get<any>('/api/antara-news/terkini').pipe(map((res) => res.data.slice(0, 5)));
  }

  getTopNews(): Observable<Berita[]> {
    return this.http.get<any>('/api/antara-news/top-news').pipe(map((res) => res.data.slice(0, 3)));
  }
}
