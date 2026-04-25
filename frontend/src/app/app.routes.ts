import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { guestGuard } from './core/guest.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/landing.page').then((m) => m.LandingPage)
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login.page').then((m) => m.LoginPage)
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/register.page').then((m) => m.RegisterPage)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/app-layout.component').then((m) => m.AppLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard.page').then((m) => m.DashboardPage)
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products.page').then((m) => m.ProductsPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
