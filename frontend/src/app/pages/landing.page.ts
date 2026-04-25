import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-app-surface text-slate-900">
      <header class="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur-xl">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">EMOapp</p>
            <p class="text-lg font-extrabold tracking-tight text-slate-950">AI Marketing System</p>
          </div>

          <nav class="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#problem" class="transition hover:text-sky-600">Problem</a>
            <a href="#workflow" class="transition hover:text-sky-600">How it works</a>
            <a href="#pricing" class="transition hover:text-sky-600">Pricing</a>
          </nav>

          <div class="flex items-center gap-3">
            <a routerLink="/login" class="rounded-2xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Login</a>
            <a routerLink="/register" class="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Start free
            </a>
          </div>
        </div>
      </header>

      <main>
        <section class="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div class="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-gradient-to-br from-sky-200/40 via-indigo-200/20 to-transparent blur-3xl"></div>
          <div class="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span class="inline-flex rounded-full bg-sky-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                AI-driven marketing automation
              </span>
              <h1 class="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">
                Your first marketing system that works without being an expert
              </h1>
              <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                EMOapp turns product details into strategy, content, campaigns, and optimization steps so beginners can
                launch structured marketing without learning every channel first.
              </p>

              <div class="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  routerLink="/register"
                  class="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Start free
                </a>
                <a
                  href="#workflow"
                  class="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
                >
                  See how it works
                </a>
              </div>

              <div class="mt-10 grid gap-4 sm:grid-cols-3">
                @for (stat of heroStats; track stat.label) {
                  <div class="rounded-[1.75rem] border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
                    <p class="text-3xl font-extrabold tracking-tight text-slate-950">{{ stat.value }}</p>
                    <p class="mt-2 text-sm text-slate-500">{{ stat.label }}</p>
                  </div>
                }
              </div>
            </div>

            <div class="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl">
              <div class="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs uppercase tracking-[0.22em] text-sky-200">System preview</p>
                    <p class="mt-2 text-2xl font-bold">Marketing machine</p>
                  </div>
                  <div class="rounded-2xl bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">Live</div>
                </div>

                <div class="mt-6 grid gap-4 sm:grid-cols-2">
                  <div class="rounded-[1.25rem] bg-white/8 p-4">
                    <p class="text-xs uppercase tracking-[0.2em] text-sky-100">Product</p>
                    <p class="mt-3 text-lg font-semibold">Organic hair serum</p>
                  </div>
                  <div class="rounded-[1.25rem] bg-white/8 p-4">
                    <p class="text-xs uppercase tracking-[0.2em] text-sky-100">Goal</p>
                    <p class="mt-3 text-lg font-semibold">Get first 100 customers</p>
                  </div>
                </div>
              </div>

              <div class="mt-5 grid gap-4">
                @for (preview of previewCards; track preview.title) {
                  <div class="rounded-[1.5rem] bg-slate-50 p-4">
                    <div class="flex items-center justify-between gap-4">
                      <div>
                        <p class="text-sm font-semibold text-slate-950">{{ preview.title }}</p>
                        <p class="mt-1 text-sm text-slate-500">{{ preview.description }}</p>
                      </div>
                      <span class="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                        {{ preview.badge }}
                      </span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>

        <section id="problem" class="px-4 py-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <div class="max-w-2xl">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">Problem</p>
              <h2 class="mt-3 text-4xl font-black tracking-tight text-slate-950">Most beginners fail before they even start</h2>
              <p class="mt-4 text-lg leading-8 text-slate-600">
                Marketing feels overwhelming when you have a product but no system for turning it into consistent campaigns.
              </p>
            </div>

            <div class="mt-10 grid gap-5 md:grid-cols-3">
              @for (problem of problems; track problem.title) {
                <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                    <i class="{{ problem.icon }}"></i>
                  </div>
                  <h3 class="mt-5 text-xl font-bold text-slate-950">{{ problem.title }}</h3>
                  <p class="mt-3 text-sm leading-7 text-slate-600">{{ problem.description }}</p>
                </article>
              }
            </div>
          </div>
        </section>

        <section id="workflow" class="px-4 py-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div class="max-w-3xl">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">Solution</p>
              <h2 class="mt-3 text-4xl font-black tracking-tight text-slate-950">A 5-step workflow anyone can follow</h2>
              <p class="mt-4 text-lg leading-8 text-slate-600">
                Instead of guessing what to do next, EMOapp moves your business through a simple system from idea to improvement.
              </p>
            </div>

            <div class="mt-10 grid gap-4 lg:grid-cols-5">
              @for (step of workflow; track step.step) {
                <article class="rounded-[1.75rem] bg-slate-50 p-5">
                  <span class="inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                    {{ step.step }}
                  </span>
                  <h3 class="mt-5 text-xl font-bold text-slate-950">{{ step.title }}</h3>
                  <p class="mt-3 text-sm leading-7 text-slate-600">{{ step.description }}</p>
                </article>
              }
            </div>
          </div>
        </section>

        <section class="px-4 py-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <div class="max-w-2xl">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">Features</p>
              <h2 class="mt-3 text-4xl font-black tracking-tight text-slate-950">Simple tools in clear business language</h2>
            </div>

            <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              @for (feature of features; track feature.title) {
                <article class="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                    <i class="{{ feature.icon }}"></i>
                  </div>
                  <h3 class="mt-5 text-xl font-bold text-slate-950">{{ feature.title }}</h3>
                  <p class="mt-3 text-sm leading-7 text-slate-600">{{ feature.description }}</p>
                </article>
              }
            </div>
          </div>
        </section>

        <section class="px-4 py-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <div class="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">Demo</p>
                <h2 class="mt-3 text-4xl font-black tracking-tight text-slate-950">See the dashboard before you sign up</h2>
                <p class="mt-4 text-lg leading-8 text-slate-600">
                  This preview shows how your product, strategy, campaign status, and optimization suggestions can live in one place.
                </p>
              </div>

              <div class="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Dashboard preview</p>
                    <h3 class="mt-2 text-2xl font-bold text-slate-950">Campaign command center</h3>
                  </div>
                  <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    Placeholder demo
                  </span>
                </div>

                <div class="mt-6 grid gap-4 md:grid-cols-3">
                  @for (metric of demoMetrics; track metric.label) {
                    <div class="rounded-[1.5rem] bg-slate-50 p-4">
                      <p class="text-xs uppercase tracking-[0.18em] text-slate-400">{{ metric.label }}</p>
                      <p class="mt-3 text-2xl font-bold text-slate-950">{{ metric.value }}</p>
                    </div>
                  }
                </div>

                <div class="mt-5 rounded-[1.5rem] bg-slate-50 p-4">
                  <div class="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                    <div class="space-y-3">
                      @for (row of demoList; track row.title) {
                        <div class="rounded-[1.25rem] bg-white p-4 shadow-sm">
                          <p class="text-sm font-semibold text-slate-950">{{ row.title }}</p>
                          <p class="mt-1 text-sm text-slate-500">{{ row.description }}</p>
                        </div>
                      }
                    </div>

                    <div class="rounded-[1.25rem] bg-white p-5 shadow-sm">
                      <p class="text-sm font-semibold text-slate-950">Optimization suggestion</p>
                      <div class="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                        <div class="h-full w-[74%] rounded-full bg-gradient-to-r from-sky-500 to-indigo-600"></div>
                      </div>
                      <p class="mt-4 text-sm leading-7 text-slate-600">
                        Increase landing-page clarity and repurpose top-performing content into email follow-up to improve conversions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" class="px-4 py-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <div class="max-w-2xl">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">Pricing</p>
              <h2 class="mt-3 text-4xl font-black tracking-tight text-slate-950">Start small and scale when the system proves itself</h2>
            </div>

            <div class="mt-10 grid gap-6 lg:grid-cols-2">
              <article class="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">Free</span>
                <h3 class="mt-5 text-3xl font-black tracking-tight text-slate-950">$0</h3>
                <p class="mt-2 text-sm text-slate-500">Perfect for testing your first product workflow.</p>
                <ul class="mt-6 space-y-3 text-sm text-slate-600">
                  <li>1 product</li>
                  <li>Core AI workflow</li>
                  <li>Basic content and campaign guidance</li>
                </ul>
                <a routerLink="/register" class="mt-8 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Start free
                </a>
              </article>

              <article class="rounded-[2rem] border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-8 shadow-xl">
                <span class="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Pro</span>
                <h3 class="mt-5 text-3xl font-black tracking-tight text-slate-950">$50<span class="text-lg font-semibold text-slate-500">/month</span></h3>
                <p class="mt-2 text-sm text-slate-500">For businesses ready to run more products and campaigns consistently.</p>
                <ul class="mt-6 space-y-3 text-sm text-slate-600">
                  <li>Multiple products</li>
                  <li>Full campaign workflow</li>
                  <li>Optimization suggestions and faster execution</li>
                </ul>
                <a routerLink="/register" class="mt-8 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Upgrade to Pro
                </a>
              </article>
            </div>
          </div>
        </section>

        <section class="px-4 pb-24 pt-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl rounded-[2.25rem] bg-slate-950 px-6 py-12 text-center text-white shadow-2xl sm:px-10">
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Final CTA</p>
            <h2 class="mt-4 text-4xl font-black tracking-tight">Build your first real marketing system today</h2>
            <p class="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Stop guessing what to post, write, or optimize next. Start with one product and let the workflow guide the rest.
            </p>
            <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a routerLink="/register" class="inline-flex rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                Start free
              </a>
              <a href="#pricing" class="inline-flex rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                Compare plans
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  `
})
export class LandingPage {
  protected readonly heroStats = [
    { value: '5', label: 'steps from product to optimization' },
    { value: '1', label: 'system to manage your first marketing process' },
    { value: '0', label: 'need to be an expert before starting' }
  ] as const;

  protected readonly previewCards = [
    { title: 'Strategy ready', description: 'Positioning and message generated from your product.', badge: 'Step 2' },
    { title: 'Content mapped', description: 'Ideas for posts, emails, and campaign copy.', badge: 'Step 3' },
    { title: 'Campaigns launched', description: 'A simple execution queue for your next actions.', badge: 'Step 4' }
  ] as const;

  protected readonly problems = [
    {
      icon: 'pi pi-question-circle',
      title: 'They do not know where to start',
      description: 'Beginners usually jump into random posts or ads without a plan that connects product, audience, and message.'
    },
    {
      icon: 'pi pi-clock',
      title: 'They waste time on disconnected tasks',
      description: 'Writing copy, making visuals, and choosing channels separately creates stress and inconsistent execution.'
    },
    {
      icon: 'pi pi-chart-line',
      title: 'They cannot improve what they launched',
      description: 'Without a workflow, it is hard to know what worked, what failed, and what should be optimized next.'
    }
  ] as const;

  protected readonly workflow = [
    { step: '01', title: 'Product', description: 'Describe what you sell and who it helps.' },
    { step: '02', title: 'Strategy', description: 'Get positioning, offer direction, and marketing priorities.' },
    { step: '03', title: 'Content', description: 'Generate simple content ideas and business-ready messaging.' },
    { step: '04', title: 'Campaigns', description: 'Turn content into coordinated marketing actions.' },
    { step: '05', title: 'Optimization', description: 'Review outcomes and improve the next cycle.' }
  ] as const;

  protected readonly features = [
    {
      icon: 'pi pi-box',
      title: 'Product-based setup',
      description: 'Start with your product, not with complex marketing tools or channel jargon.'
    },
    {
      icon: 'pi pi-sparkles',
      title: 'AI strategy guidance',
      description: 'Receive clear suggestions for positioning and next steps in plain business language.'
    },
    {
      icon: 'pi pi-pencil',
      title: 'Content made simple',
      description: 'Generate useful content ideas without hiring a full team on day one.'
    },
    {
      icon: 'pi pi-sync',
      title: 'Built-in optimization loop',
      description: 'Track what happened and improve your campaigns instead of starting from zero every time.'
    }
  ] as const;

  protected readonly demoMetrics = [
    { label: 'Products', value: '1' },
    { label: 'Campaigns', value: '4' },
    { label: 'Next action', value: 'Optimize' }
  ] as const;

  protected readonly demoList = [
    { title: 'Product strategy', description: 'Clear positioning for your first audience.' },
    { title: 'Content queue', description: 'Email, social, and landing-page ideas in one view.' },
    { title: 'Campaign status', description: 'Simple progress tracking for execution.' }
  ] as const;
}
