import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-customer-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-header.component.html',
  styleUrl: './customer-header.component.scss'
})
export class CustomerHeaderComponent implements OnInit {
  cartItemCount: number = 0;
  showUserMenu: boolean = false;
  currentUser: string = 'Guest User';
  currentRoute: string = '';

  constructor(public router: Router) {}

  ngOnInit() {
    this.updateCartCount();
    this.loadUserInfo();
    
    // Update cart count on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCartCount();
      this.currentRoute = this.router.url;
    });
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', () => {
      this.updateCartCount();
    });
  }

  updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItemCount = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
  }

  loadUserInfo() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = user;
    }
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  navigateToShop() {
    this.router.navigate(['/shop']);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToOrders() {
    this.router.navigate(['/orders']);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    this.router.navigate(['/']);
  }
}
