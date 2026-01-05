import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public router: Router) {}

  isScrolling = false;
  isMobileMenuOpen = false;

  categories = [
    'terbaru',
    'nasional',
    'internasional',
    'ekonomi',
    'olahraga',
    'teknologi',
    'hiburan',
    'gaya-hidup',
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    this.isScrolling = scrollTop > 0;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  formatTitle(text: string) {
    return text.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }
}
