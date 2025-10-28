import { HttpInterceptorFn } from '@angular/common/http';

// Firebase token interceptor
// Adds Firebase ID token to all HTTP requests for backend authentication
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get Firebase token from localStorage (set by FirebaseAuthService)
  const firebaseToken = localStorage.getItem('firebaseToken');
  
  if (firebaseToken) {
    // Clone the request and add Authorization header with Firebase token
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${firebaseToken}`
      }
    });
    return next(authReq);
  }
  
  // If no token, pass request as-is
  return next(req);
};
