import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppSessionService } from '../core/app-session.service';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonModule],
  template: `
    <div class="flex min-h-screen items-center justify-center px-4 py-10">
      <div class="grid w-full max-w-6xl overflow-hidden rounded-[2.25rem] bg-white shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <section class="bg-gradient-to-br from-slate-950 via-sky-900 to-indigo-700 p-8 text-white sm:p-10 lg:p-14">
          <p class="text-xs font-semibold uppercase tracking-[0.26em] text-sky-200">EMOapp</p>
          <h1 class="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Login</h1>
          <p class="mt-6 max-w-xl text-base leading-8 text-slate-200">
            A clean starting point for your Angular application with responsive auth screens and a modern shell.
          </p>

          <div class="mt-10 grid gap-4 sm:grid-cols-2">
            <div class="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-md">
              <p class="text-lg font-bold">Backend auth</p>
              <p class="mt-2 text-sm text-slate-200">Login calls the API and stores the JWT in localStorage.</p>
            </div>
            <div class="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-md">
              <p class="text-lg font-bold">Protected routes</p>
              <p class="mt-2 text-sm text-slate-200">Guards and the interceptor keep dashboard routes authenticated.</p>
            </div>
          </div>
        </section>

        <section class="p-6 sm:p-8 lg:p-10">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Account access</p>
          <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">Welcome back</h2>
          <p class="mt-3 text-sm text-slate-500">Enter your credentials to call the backend and open the dashboard.</p>

          <form class="mt-8 space-y-5" [formGroup]="form" (ngSubmit)="submit()">
            <div>
              <label class="field-label" for="email">Email</label>
              <input id="email" class="field-input" type="email" formControlName="email" placeholder="alex@example.com" />
              @if (showFieldError('email', 'required')) {
                <p class="mt-2 text-sm text-red-500">Email is required.</p>
              }
              @if (showFieldError('email', 'email')) {
                <p class="mt-2 text-sm text-red-500">Enter a valid email address.</p>
              }
            </div>

            <div>
              <label class="field-label" for="password">Password</label>
              <input id="password" class="field-input" type="password" formControlName="password" placeholder="********" />
              @if (showFieldError('password', 'required')) {
                <p class="mt-2 text-sm text-red-500">Password is required.</p>
              }
              @if (showFieldError('password', 'minlength')) {
                <p class="mt-2 text-sm text-red-500">Password must be at least 6 characters.</p>
              }
            </div>

            @if (errorMessage()) {
              <div class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {{ errorMessage() }}
              </div>
            }

            <p-button
              type="submit"
              label="{{ isSubmitting() ? 'Signing in...' : 'Login' }}"
              styleClass="w-full !rounded-2xl !bg-slate-950 !border-slate-950 !py-3"
              [disabled]="form.invalid || isSubmitting()"
            />
          </form>

          <p class="mt-6 text-sm text-slate-500">
            Don't have an account?
            <a routerLink="/register" class="font-semibold text-sky-600 hover:text-sky-700">Register</a>
          </p>
        </section>
      </div>
    </div>
  `
})
export class LoginPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly sessionService = inject(AppSessionService);
  private readonly router = inject(Router);

  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  protected showFieldError(fieldName: 'email' | 'password', errorKey: string): boolean {
    const control = this.form.controls[fieldName];
    return control.touched && control.hasError(errorKey);
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    try {
      await this.sessionService.login(this.form.getRawValue());
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      this.errorMessage.set(this.toErrorMessage(error, 'Unable to sign in right now.'));
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private toErrorMessage(error: unknown, fallback: string): string {
    if (
      typeof error === 'object' &&
      error !== null &&
      'error' in error &&
      typeof (error as { error?: unknown }).error === 'object' &&
      (error as { error?: { error?: string } }).error?.error
    ) {
      return (error as { error: { error: string } }).error.error;
    }

    if (error instanceof Error && error.message) {
      return error.message;
    }

    return fallback;
  }
}
