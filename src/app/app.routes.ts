import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DetailNews } from './pages/detail-news/detail-news';
import { CategoryNews } from './pages/category-news/category-news';
export const routes: Routes = [
  { path: '', component: Home },
  { path: ':kategori', component: CategoryNews },
  { path: ':kategori/:title', component: DetailNews },
  { path: 'api/**', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
