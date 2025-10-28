import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  user,
  UserCredential,
  updateProfile
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth); // Observable of current user
  currentUser: User | null = null;

  constructor() {
    // Subscribe to auth state changes
    this.user$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        // Store Firebase ID token for backend authentication
        user.getIdToken().then(token => {
          localStorage.setItem('firebaseToken', token);
        });
      } else {
        localStorage.removeItem('firebaseToken');
      }
    });
  }

  // Email/Password Sign Up
  signUp(email: string, password: string, displayName?: string): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
        .then(async (userCredential) => {
          // Update profile with display name
          if (displayName && userCredential.user) {
            await updateProfile(userCredential.user, { displayName });
          }
          return userCredential;
        })
    );
  }

  // Email/Password Sign In
  signIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // Google Sign In
  signInWithGoogle(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  // Sign Out
  logout(): Observable<void> {
    localStorage.removeItem('firebaseToken');
    return from(signOut(this.auth));
  }

  // Get current Firebase ID token (for backend API calls)
  async getIdToken(): Promise<string | null> {
    if (this.currentUser) {
      return await this.currentUser.getIdToken();
    }
    return null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Get user email
  getUserEmail(): string | null {
    return this.currentUser?.email || null;
  }

  // Get user display name
  getDisplayName(): string | null {
    return this.currentUser?.displayName || null;
  }
}
