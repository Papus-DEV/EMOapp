import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppSessionService } from './app-session.service';

export const guestGuard: CanActivateFn = () => {
  const sessionService = inject(AppSessionService);
  const router = inject(Router);

  return sessionService.isAuthenticated() ? router.createUrlTree(['/dashboard']) : true;
};
