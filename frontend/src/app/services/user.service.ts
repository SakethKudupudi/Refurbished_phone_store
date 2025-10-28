import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  roles: ('CUSTOMER' | 'VENDOR' | 'ADMIN')[];
  azureAdObjectId?: string;
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt?: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/users`;
  private currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  /**
   * Get observable for current user
   */
  getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  /**
   * Fetch and set current user profile
   */
  loadCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`)
      .pipe(tap(user => this.currentUser$.next(user)));
  }

  /**
   * Get user by ID (admin only)
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get all users (admin only)
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Get users by role (admin only)
   */
  getUsersByRole(role: 'CUSTOMER' | 'VENDOR' | 'ADMIN'): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/role/${role}`);
  }

  /**
   * Get pending vendor approvals (admin only)
   */
  getPendingVendors(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/vendors/pending`);
  }

  /**
   * Update current user profile
   */
  updateProfile(userData: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/me`, userData)
      .pipe(tap(user => this.currentUser$.next(user)));
  }

  /**
   * Update user (admin only)
   */
  updateUser(id: number, userData: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, userData);
  }

  /**
   * Approve vendor (admin only)
   */
  approveVendor(userId: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/approve`, {});
  }

  /**
   * Reject vendor (admin only)
   */
  rejectVendor(userId: number, reason: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/reject`, { reason });
  }

  /**
   * Delete user (admin only)
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Clear current user (on logout)
   */
  clearCurrentUser(): void {
    this.currentUser$.next(null);
  }
}
