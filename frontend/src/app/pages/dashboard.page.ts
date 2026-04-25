import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <section class="overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-sky-900 to-indigo-700 p-6 text-white shadow-xl sm:p-8">
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Dashboard</p>
        <h1 class="mt-4 text-4xl font-black tracking-tight">Base application ready</h1>
        <p class="mt-5 max-w-2xl text-base leading-8 text-slate-200">
          This is the main dashboard page for the EMOapp Angular base. The layout is shared, responsive, and ready for feature growth.
        </p>
      </section>

      <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        @for (metric of metrics; track metric.label) {
          <article class="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{{ metric.label }}</p>
            <p class="mt-4 text-3xl font-extrabold tracking-tight text-slate-950">{{ metric.value }}</p>
            <p class="mt-2 text-sm text-slate-500">{{ metric.caption }}</p>
          </article>
        }
      </section>

      <section class="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Recent activity</p>
          <div class="mt-6 space-y-4">
            @for (item of activity; track item.title) {
              <div class="rounded-[1.5rem] bg-slate-50 p-4">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="font-semibold text-slate-950">{{ item.title }}</p>
                    <p class="mt-1 text-sm text-slate-500">{{ item.description }}</p>
                  </div>
                  <span class="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {{ item.when }}
                  </span>
                </div>
              </div>
            }
          </div>
        </article>

        <article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Summary</p>
          <div class="mt-6 space-y-4">
            <div class="rounded-[1.5rem] bg-slate-50 p-4">
              <p class="font-semibold text-slate-950">Responsive by default</p>
              <p class="mt-2 text-sm text-slate-500">The sidebar collapses into an overlay on smaller screens.</p>
            </div>
            <div class="rounded-[1.5rem] bg-slate-50 p-4">
              <p class="font-semibold text-slate-950">Reusable shell</p>
              <p class="mt-2 text-sm text-slate-500">Navbar, sidebar, and fixed footer stay consistent across app pages.</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  `
})
export class DashboardPage {
  protected readonly metrics = [
    { label: 'Users', value: '1,284', caption: 'Active users this month' },
    { label: 'Products', value: '86', caption: 'Items in the current catalog' },
    { label: 'Orders', value: '356', caption: 'Processed in the last 7 days' },
    { label: 'Growth', value: '+18%', caption: 'Compared to the previous month' }
  ] as const;

  protected readonly activity = [
    { title: 'Dashboard initialized', description: 'The base application layout was loaded successfully.', when: 'Now' },
    { title: 'Profile ready', description: 'User avatar and dropdown actions are active in the navbar.', when: 'Today' },
    { title: 'Products route online', description: 'Sidebar navigation is wired to the products page.', when: 'Today' }
  ] as const;
}
