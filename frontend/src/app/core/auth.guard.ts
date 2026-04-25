import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppSessionService } from './app-session.service';

export const authGuard: CanActivateFn = () => {
  const sessionService = inject(AppSessionService);
  const router = inject(Router);

  return sessionService.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
