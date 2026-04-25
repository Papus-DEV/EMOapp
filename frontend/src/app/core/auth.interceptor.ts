import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppSessionService } from './app-session.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const sessionService = inject(AppSessionService);
  const token = sessionService.token();

  if (!token) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  );
};
