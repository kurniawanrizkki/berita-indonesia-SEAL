import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'olahraga', component: Home },
  { path: 'politik', component: Home },
];
