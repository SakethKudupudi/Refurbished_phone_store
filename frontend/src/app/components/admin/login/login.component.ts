import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) {}

  navigateToCustomer() {
    // Navigate to customer landing page
    this.router.navigate(['/shop']);
  }

  navigateToVendor() {
    // Bypass authentication and navigate to vendor dashboard
    this.router.navigate(['/vendor/dashboard']);
  }

  navigateToAdmin() {
    // Bypass authentication and navigate to admin dashboard
    this.router.navigate(['/admin/dashboard']);
  }
}
