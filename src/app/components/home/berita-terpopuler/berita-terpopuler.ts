import { Component } from '@angular/core';
import { Data, Berita } from '../../../service/data';
import { NgIf, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-berita-terpopuler',
  imports: [NgIf, AsyncPipe],
  templateUrl: './berita-terpopuler.html',
  styleUrl: './berita-terpopuler.css',
})
export class BeritaTerpopuler {
  topNews$!: Observable<Berita[]>;
  constructor(private data: Data) {
    this.topNews$ = this.data.getTopNews();
  }
}
