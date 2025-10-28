import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: 'CUSTOMER' | 'VENDOR';
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private tokenKey = 'auth_token';
  private isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    // Load current user if token exists
    if (this.hasToken()) {
      this.userService.loadCurrentUser().subscribe();
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  /**
   * Login with email and password
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.isAuthenticated$.next(true);
          this.userService.loadCurrentUser().subscribe();
        })
      );
  }

  /**
   * Register new user
   */
  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.isAuthenticated$.next(true);
          this.userService.loadCurrentUser().subscribe();
        })
      );
  }

  /**
   * Azure AD B2C login
   */
  loginWithAzureAd(): void {
    // This would integrate with MSAL (Microsoft Authentication Library)
    // For now, redirect to Azure AD B2C login
    const azureAdConfig = environment.azureAdB2C;
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    const authUrl = `${azureAdConfig.authority}/oauth2/v2.0/authorize?` +
      `client_id=${azureAdConfig.clientId}&` +
      `response_type=code&` +
      `redirect_uri=${redirectUri}&` +
      `scope=openid%20profile%20email`;
    
    window.location.href = authUrl;
  }

  /**
   * Logout user
   */
  logout(): void {
    this.removeToken();
    this.isAuthenticated$.next(false);
    this.userService.clearCurrentUser();
    this.router.navigate(['/']);
  }

  /**
   * Get current auth token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Set auth token
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Remove auth token
   */
  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Check if token exists
   */
  private hasToken(): boolean {
    return !!this.getToken();
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): Observable<boolean> {
    return this.userService.getCurrentUser().pipe(
      catchError(() => of(null)),
      map(user => {
        if (!user) {
          return false;
        }
        return user.roles.includes(role as any);
      })
    );
  }

  /**
   * Verify token validity
   */
  verifyToken(): Observable<boolean> {
    if (!this.hasToken()) {
      return of(false);
    }

    return this.http.get<{ valid: boolean }>(`${this.apiUrl}/verify`)
      .pipe(
        tap(response => {
          if (!response.valid) {
            this.logout();
          }
        }),
        map(response => response.valid),
        catchError(() => {
          this.logout();
          return of(false);
        })
      );
  }
}
