import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

const TOKEN_STORAGE_KEY = 'emoapp.auth.token';
const USER_STORAGE_KEY = 'emoapp.auth.user';

const hostname = typeof window === 'undefined' ? 'localhost' : window.location.hostname;
const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
const apiBaseUrl = isLocal ? 'http://localhost:5100' : window.location.origin;

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  companyId: string;
  companyName: string;
}

interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  companyName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppSessionService {
  private readonly http = inject(HttpClient);

  readonly token = signal<string | null>(this.readToken());
  readonly user = signal<AuthUser | null>(this.readUser());
  readonly isAuthenticated = computed(() => !!this.token());
  readonly displayName = computed(() => {
    const user = this.user();
    return user ? this.deriveNameFromEmail(user.email) : 'User';
  });
  readonly initials = computed(() => {
    const label = this.displayName();

    return label
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  });

  async login(request: LoginRequest): Promise<void> {
    const response = await firstValueFrom(this.http.post<AuthResponse>(`${apiBaseUrl}/auth/login`, request));
    this.persist(response.accessToken, response.user);
  }

  async register(request: RegisterRequest): Promise<void> {
    const response = await firstValueFrom(this.http.post<AuthResponse>(`${apiBaseUrl}/auth/register`, request));
    this.persist(response.accessToken, response.user);
  }

  async refreshCurrentUser(): Promise<void> {
    if (!this.token()) {
      return;
    }

    const user = await firstValueFrom(this.http.get<AuthUser>(`${apiBaseUrl}/auth/me`));
    this.user.set(user);
    this.writeUser(user);
  }

  logout(): void {
    this.token.set(null);
    this.user.set(null);

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }

  private persist(token: string, user: AuthUser): void {
    this.token.set(token);
    this.user.set(user);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  }

  private writeUser(user: AuthUser): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  }

  private readToken(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  private readUser(): AuthUser | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    try {
      const rawValue = localStorage.getItem(USER_STORAGE_KEY);
      return rawValue ? (JSON.parse(rawValue) as AuthUser) : null;
    } catch {
      return null;
    }
  }

  private deriveNameFromEmail(email: string): string {
    const localPart = email.split('@')[0] ?? 'User';

    return localPart
      .split(/[._-]/)
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ');
  }
}
