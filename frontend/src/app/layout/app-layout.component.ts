import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppSessionService } from '../core/app-session.service';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="min-h-screen bg-app-surface">
      <header class="app-navbar fixed inset-x-0 top-0 z-50">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
              (click)="toggleSidebar()"
              aria-label="Toggle menu"
            >
              <i class="pi pi-bars text-base"></i>
            </button>

            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">EMOapp</p>
              <h1 class="text-lg font-extrabold tracking-tight text-slate-950">Base Dashboard</h1>
            </div>
          </div>

          <div class="relative">
            <button
              type="button"
              class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
              (click)="toggleProfileMenu()"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-bold text-white">
                {{ initials() }}
              </div>
              <div class="hidden text-left sm:block">
                <p class="text-sm font-semibold text-slate-950">{{ displayName() }}</p>
                <p class="text-xs text-slate-500">{{ user()?.email }}</p>
              </div>
              <i class="pi pi-chevron-down text-xs text-slate-500"></i>
            </button>

            @if (isProfileOpen()) {
              <div class="absolute right-0 mt-3 w-52 rounded-3xl border border-slate-200 bg-white p-2 shadow-xl">
                <button type="button" class="menu-item" (click)="navigateToDashboard()">Profile</button>
                <button type="button" class="menu-item text-red-500 hover:bg-red-50" (click)="logout()">Logout</button>
              </div>
            }
          </div>
        </div>
      </header>

      @if (isSidebarOpen()) {
        <button
          type="button"
          class="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          (click)="closeSidebar()"
          aria-label="Close navigation"
        ></button>
      }

      <aside
        class="app-sidebar fixed bottom-18 left-0 top-[5.25rem] z-40 w-72 p-4 transition-transform duration-300 lg:left-4 lg:top-24 lg:bottom-20"
        [ngClass]="isSidebarOpen() ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
      >
        <div class="h-full rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Navigation</p>

          <nav class="mt-5 space-y-2">
            @for (item of navItems; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="bg-slate-950 text-white shadow-md"
                class="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                (click)="closeSidebar()"
              >
                <span>{{ item.label }}</span>
                <span class="text-xs uppercase tracking-[0.18em] opacity-70">{{ item.tag }}</span>
              </a>
            }

            <button
              type="button"
              class="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
              (click)="logout()"
            >
              <span>Logout</span>
              <span class="text-xs uppercase tracking-[0.18em] opacity-70">Exit</span>
            </button>
          </nav>

          <div class="mt-6 rounded-[1.75rem] bg-slate-50 p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Signed in</p>
            <p class="mt-2 text-lg font-bold text-slate-950">{{ displayName() }}</p>
            <p class="mt-1 text-sm text-slate-500">{{ user()?.email }}</p>
          </div>
        </div>
      </aside>

      <main class="px-4 pb-28 pt-24 sm:px-6 lg:px-8 lg:pb-24 lg:pl-[21rem]">
        <div class="mx-auto max-w-7xl">
          <router-outlet />
        </div>
      </main>

      <footer class="app-footer fixed bottom-0 inset-x-0 z-40">
        <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:pl-[21rem]">
          <p>© 2026 EMOapp. Responsive Angular base application.</p>
          <p>Top navbar, left sidebar, and fixed footer are active across app pages.</p>
        </div>
      </footer>
    </div>
  `
})
export class AppLayoutComponent {
  private readonly sessionService = inject(AppSessionService);
  private readonly router = inject(Router);

  protected readonly user = this.sessionService.user;
  protected readonly initials = this.sessionService.initials;
  protected readonly displayName = this.sessionService.displayName;
  protected readonly navItems = [
    { path: '/dashboard', label: 'Dashboard', tag: 'Home' },
    { path: '/products', label: 'Products', tag: 'List' }
  ] as const;
  protected readonly isSidebarOpen = signal(false);
  protected readonly isProfileOpen = signal(false);

  protected toggleSidebar(): void {
    this.isSidebarOpen.update((value) => !value);
  }

  protected closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  protected toggleProfileMenu(): void {
    this.isProfileOpen.update((value) => !value);
  }

  protected navigateToDashboard(): void {
    this.isProfileOpen.set(false);
    void this.router.navigate(['/dashboard']);
  }

  protected logout(): void {
    this.sessionService.logout();
    this.isSidebarOpen.set(false);
    this.isProfileOpen.set(false);
    void this.router.navigate(['/login']);
  }
}
