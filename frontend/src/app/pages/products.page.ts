import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products-page',
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <section class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Products</p>
        <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">Product catalog</h1>
        <p class="mt-3 text-sm text-slate-500">A base products page wired into the shared sidebar navigation.</p>
      </section>

      <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        @for (product of products; track product.name) {
          <article class="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-lg font-bold text-slate-950">{{ product.name }}</p>
                <p class="mt-2 text-sm text-slate-500">{{ product.description }}</p>
              </div>
              <span
                class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
                [ngClass]="product.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
              >
                {{ product.status }}
              </span>
            </div>

            <div class="mt-6 flex items-center justify-between text-sm text-slate-500">
              <span>Price</span>
              <span class="font-semibold text-slate-950">{{ product.price }}</span>
            </div>
          </article>
        }
      </section>
    </div>
  `
})
export class ProductsPage {
  protected readonly products = [
    {
      name: 'Starter Kit',
      description: 'A lightweight product for onboarding new customers.',
      price: '$29',
      status: 'Active'
    },
    {
      name: 'Growth Plan',
      description: 'A mid-tier offer for scaling teams and operations.',
      price: '$79',
      status: 'Active'
    },
    {
      name: 'Enterprise Suite',
      description: 'A premium product placeholder for larger deployments.',
      price: '$199',
      status: 'Draft'
    }
  ] as const;
}
