import { Component } from '@angular/core';
import { Hero } from '../../components/home/hero/hero';
import { BeritaTerpopuler } from '../../components/home/berita-terpopuler/berita-terpopuler';
import { Rekomendasi } from '../../components/home/rekomendasi/rekomendasi';
import { Banner } from '../../components/home/banner/banner';
@Component({
  selector: 'app-home',
  imports: [Hero, BeritaTerpopuler, Rekomendasi, Banner],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
