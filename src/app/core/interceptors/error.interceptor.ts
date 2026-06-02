import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

/** Handles 401/403/5xx errors globally. */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        router.navigate(['/login']);
      }

      if (err.status >= 500) {
        console.error('[API Error]', err.message);
        // TODO: show a toast/snackbar notification
      }

      return throwError(() => err);
    }),
  );
};
