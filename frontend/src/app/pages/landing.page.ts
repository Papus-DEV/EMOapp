import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollSpyService } from '../core/services/scroll-spy.service';
import { SmoothScrollService } from '../core/services/smooth-scroll.service';
import { RevealOnScrollDirective } from '../shared/directives/reveal-on-scroll.directive';

type NavSectionId = 'problem' | 'solution' | 'features' | 'demo' | 'pricing';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, RouterLink, RevealOnScrollDirective],
  template: `
    <div class="bg-app-surface text-slate-900">
      <header class="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur-xl">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">EMOapp</p>
            <p class="text-lg font-extrabold tracking-tight text-slate-950">AI Marketing System</p>
          </div>

          <nav class="hidden items-center gap-2 md:flex">
            @for (item of navItems; track item.id) {
              <button
                type="button"
                class="landing-nav-link"
                [ngClass]="activeSection() === item.id ? 'landing-nav-link-active' : ''"
                (click)="scrollToSection(item.id)"
              >
                {{ item.label }}
              </button>
            }
          </nav>

          <div class="flex items-center gap-3">
            <a routerLink="/login" class="interactive-button rounded-2xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              Login
            </a>
            <a
              routerLink="/register"
              class="interactive-button rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Start free
            </a>
          </div>
        </div>
      </header>

      <main>
        <section class="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div class="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-gradient-to-br from-sky-200/40 via-indigo-200/20 to-transparent blur-3xl"></div>
          <div class="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div revealOnScroll>
              <span class="inline-flex rounded-full bg-sky-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                Stop guessing. Start converting.
              </span>
              <h1 class="mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">
                Stop guessing your marketing and start getting customers
              </h1>
              <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                You should not have to waste money on random posts, bad ads, and ideas that go nowhere. Turn your
                product into clear campaigns that help you sell faster.
              </p>

              <div class="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  routerLink="/register"
                  class="interactive-button inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Start free now
                </a>
                <button
                  type="button"
                  class="interactive-button inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-sky-300 hover:bg-sky-50"
                  (click)="scrollToSection('solution')"
                >
                  See it in action
                </button>
              </div>

              <div class="mt-10 grid gap-4 sm:grid-cols-3">
                @for (stat of heroStats; track stat.label) {
                  <div revealOnScroll class="interactive-card rounded-[1.75rem] border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
                    <p class="text-3xl font-extrabold tracking-tight text-slate-950">{{ stat.value }}</p>
                    <p class="mt-2 text-sm text-slate-500">{{ stat.label }}</p>
                  </div>
                }
              </div>
            </div>

            <div revealOnScroll class="interactive-card rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl">
              <div class="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-xs uppercase tracking-[0.22em] text-sky-200">System preview</p>
                    <p class="mt-2 text-2xl font-bold">Your future marketing system</p>
                  </div>
                  <div class="rounded-2xl bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">Live</div>
                </div>

                <div class="mt-6 grid gap-4 sm:grid-cols-2">
                  <div revealOnScroll class="rounded-[1.25rem] bg-white/8 p-4">
                    <p class="text-xs uppercase tracking-[0.2em] text-sky-100">Product</p>
                    <p class="mt-3 text-lg font-semibold">Organic hair serum</p>
                  </div>
                  <div revealOnScroll class="rounded-[1.25rem] bg-white/8 p-4">
                    <p class="text-xs uppercase tracking-[0.2em] text-sky-100">Goal</p>
                    <p class="mt-3 text-lg font-semibold">Get first 100 customers</p>
                  </div>
                </div>
              </div>

              <div class="mt-5 grid gap-4">
                @for (preview of previewCards; track preview.title) {
                  <div revealOnScroll class="interactive-card rounded-[1.5rem] bg-slate-50 p-4">
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

        <section id="problem" revealOnScroll class="px-4 py-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <div revealOnScroll class="max-w-2xl">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">Problem</p>
              <h2 class="mt-3 text-4xl font-black tracking-tight text-slate-950">Why most small businesses stay invisible</h2>
              <p class="mt-4 text-lg leading-8 text-slate-600">
                You can have a solid product and still lose money if your marketing is random, unclear, and impossible to
                repeat.
              </p>
            </div>

            <div class="mt-10 grid gap-5 md:grid-cols-3">
              @for (problem of problems; track problem.title) {
                <article revealOnScroll class="interactive-card rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
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

        <section id="solution" revealOnScroll class="px-4 py-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div revealOnScroll class="max-w-3xl">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">Solution</p>
              <h2 class="mt-3 text-4xl font-black tracking-tight text-slate-950">From confusion to campaigns in five clear steps</h2>
              <p class="mt-4 text-lg leading-8 text-slate-600">
                Instead of guessing your next move, you follow a simple path that turns what you sell into marketing
                people understand and buy from.
              </p>
            </div>

            <div class="mt-10 grid gap-4 lg:grid-cols-5">
              @for (step of workflow; track step.step) {
                <article revealOnScroll class="interactive-card rounded-[1.75rem] bg-slate-50 p-5">
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

        <section id="features" revealOnScroll class="px-4 py-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <div revealOnScroll class="max-w-2xl">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">Features</p>
              <h2 class="mt-3 text-4xl font-black tracking-tight text-slate-950">Everything you need to stop wasting effort</h2>
            </div>

            <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              @for (feature of features; track feature.title) {
                <article revealOnScroll class="interactive-card rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
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

        <section id="demo" revealOnScroll class="px-4 py-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <div class="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div revealOnScroll>
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">Demo</p>
                <h2 class="mt-3 text-4xl font-black tracking-tight text-slate-950">This is what your marketing can look like next week</h2>
                <p class="mt-4 text-lg leading-8 text-slate-600">
                  Your product, your message, your campaigns, and your next best actions in one place so you can stop
                  guessing and start moving with confidence.
                </p>
              </div>

              <div revealOnScroll class="interactive-card rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl">
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
                    <div revealOnScroll class="interactive-card rounded-[1.5rem] bg-slate-50 p-4">
                      <p class="text-xs uppercase tracking-[0.18em] text-slate-400">{{ metric.label }}</p>
                      <p class="mt-3 text-2xl font-bold text-slate-950">{{ metric.value }}</p>
                    </div>
                  }
                </div>

                <div revealOnScroll class="mt-5 rounded-[1.5rem] bg-slate-50 p-4">
                  <div class="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                    <div class="space-y-3">
                      @for (row of demoList; track row.title) {
                        <div revealOnScroll class="interactive-card rounded-[1.25rem] bg-white p-4 shadow-sm">
                          <p class="text-sm font-semibold text-slate-950">{{ row.title }}</p>
                          <p class="mt-1 text-sm text-slate-500">{{ row.description }}</p>
                        </div>
                      }
                    </div>

                    <div revealOnScroll class="interactive-card rounded-[1.25rem] bg-white p-5 shadow-sm">
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

        <section id="pricing" revealOnScroll class="px-4 py-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <div revealOnScroll class="max-w-2xl">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">Pricing</p>
              <h2 class="mt-3 text-4xl font-black tracking-tight text-slate-950">Start with zero risk. Upgrade when it starts working.</h2>
            </div>

            <div class="mt-10 grid gap-6 lg:grid-cols-2">
              <article revealOnScroll class="interactive-card rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">Free</span>
                <h3 class="mt-5 text-3xl font-black tracking-tight text-slate-950">$0</h3>
                <p class="mt-2 text-sm text-slate-500">Perfect for your first product. No big commitment. No pressure.</p>
                <ul class="mt-6 space-y-3 text-sm text-slate-600">
                  <li>1 product</li>
                  <li>Core AI workflow</li>
                  <li>Basic content and campaign guidance</li>
                </ul>
                <a
                  routerLink="/register"
                  class="interactive-button mt-8 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Start free now
                </a>
              </article>

              <article revealOnScroll class="interactive-card rounded-[2rem] border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-8 shadow-xl">
                <span class="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Pro</span>
                <h3 class="mt-5 text-3xl font-black tracking-tight text-slate-950">$50<span class="text-lg font-semibold text-slate-500">/month</span></h3>
                <p class="mt-2 text-sm text-slate-500">For businesses ready to scale what works with more clarity and momentum.</p>
                <ul class="mt-6 space-y-3 text-sm text-slate-600">
                  <li>Multiple products</li>
                  <li>Full campaign workflow</li>
                  <li>Optimization suggestions and faster execution</li>
                </ul>
                <a
                  routerLink="/register"
                  class="interactive-button mt-8 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Upgrade to Pro
                </a>
              </article>
            </div>
          </div>
        </section>

        <section revealOnScroll class="px-4 pb-24 pt-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl rounded-[2.25rem] bg-slate-950 px-6 py-12 text-center text-white shadow-2xl sm:px-10">
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Final CTA</p>
            <h2 class="mt-4 text-4xl font-black tracking-tight">Every week you wait is another week of lost sales</h2>
            <p class="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
              You already have something worth selling. Now build the marketing system that helps people buy it. Start
              free and launch with clarity today.
            </p>
            <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                routerLink="/register"
                class="interactive-button inline-flex rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 hover:bg-slate-100"
              >
                Start free now
              </a>
              <button
                type="button"
                class="interactive-button inline-flex rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                (click)="scrollToSection('pricing')"
              >
                Compare plans
              </button>
            </div>
          </div>
        </section>
      </main>

      @if (showBackToTop()) {
        <button
          type="button"
          class="interactive-button fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.75)] hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-200"
          aria-label="Back to top"
          (click)="scrollToTop()"
        >
          <i class="pi pi-chevron-up text-base"></i>
        </button>
      }
    </div>
  `
})
export class LandingPage implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly scrollSpy = inject(ScrollSpyService);
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly handleWindowScroll = () => {
    const view = this.document.defaultView;
    this.showBackToTop.set((view?.scrollY ?? 0) > 120);
  };

  protected readonly activeSection = this.scrollSpy.activeSection;
  protected readonly showBackToTop = signal(false);
  protected readonly navItems = [
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'features', label: 'Features' },
    { id: 'demo', label: 'Demo' },
    { id: 'pricing', label: 'Pricing' }
  ] as const;

  protected readonly heroStats = [
    { value: '5', label: 'steps between your product and your next customers' },
    { value: '1', label: 'clear system to launch without second-guessing every move' },
    { value: '0', label: 'reasons to keep wasting budget on random marketing' }
  ] as const;

  protected readonly previewCards = [
    { title: 'Strategy ready', description: 'A clear angle that makes your product easier to sell.', badge: 'Step 2' },
    { title: 'Content mapped', description: 'Publishable ideas for posts, emails, and campaign copy.', badge: 'Step 3' },
    { title: 'Campaigns launched', description: 'A simple action plan so you know exactly what to do next.', badge: 'Step 4' }
  ] as const;

  protected readonly problems = [
    {
      icon: 'pi pi-question-circle',
      title: 'You keep spending without knowing what works',
      description: 'You post, boost, and test things at random. Money goes out. Results stay flat.'
    },
    {
      icon: 'pi pi-clock',
      title: 'You have a product, but no marketing plan',
      description: 'You know what you sell. You do not know what to say, where to say it, or what to do next.'
    },
    {
      icon: 'pi pi-chart-line',
      title: 'You lose momentum every time you try',
      description: 'One week you are motivated. The next week you are overwhelmed, stuck, and back to zero.'
    }
  ] as const;

  protected readonly workflow = [
    { step: '01', title: 'Product', description: 'Clarify what makes your offer worth buying so you stop marketing the wrong thing.' },
    { step: '02', title: 'Strategy', description: 'Get a clear direction for who to target, what to say, and how to stand out.' },
    { step: '03', title: 'Content', description: 'Turn your message into content ideas you can actually publish without overthinking.' },
    { step: '04', title: 'Campaigns', description: 'Launch coordinated campaigns instead of disconnected tasks that waste time and budget.' },
    { step: '05', title: 'Optimization', description: 'See what is working, fix what is not, and improve without starting over.' }
  ] as const;

  protected readonly features = [
    {
      icon: 'pi pi-box',
      title: 'Know what to say',
      description: 'Get clear messaging so your product sounds valuable from day one.'
    },
    {
      icon: 'pi pi-sparkles',
      title: 'Move faster with less doubt',
      description: 'Spend less time deciding and more time launching work that actually matters.'
    },
    {
      icon: 'pi pi-pencil',
      title: 'Create without hiring a full team',
      description: 'Generate strategic content and campaign direction without expensive trial and error.'
    },
    {
      icon: 'pi pi-sync',
      title: 'Improve with every campaign',
      description: 'Learn what drives results so your marketing gets smarter instead of more chaotic.'
    }
  ] as const;

  protected readonly demoMetrics = [
    { label: 'Products', value: '1' },
    { label: 'Campaigns', value: '4' },
    { label: 'Next action', value: 'Optimize' }
  ] as const;

  protected readonly demoList = [
    { title: 'Product strategy', description: 'A clear message built to attract the right buyers.' },
    { title: 'Content queue', description: 'Email, social, and landing-page ideas ready to execute.' },
    { title: 'Campaign status', description: 'A focused view of what is live and what comes next.' }
  ] as const;

  ngAfterViewInit(): void {
    this.scrollSpy.observe(
      this.navItems.map((item) => item.id),
      this.document
    );

    this.handleWindowScroll();
    this.document.defaultView?.addEventListener('scroll', this.handleWindowScroll, { passive: true });
  }

  ngOnDestroy(): void {
    this.scrollSpy.disconnect();
    this.smoothScroll.cancel();
    this.document.defaultView?.removeEventListener('scroll', this.handleWindowScroll);
  }

  protected scrollToSection(sectionId: NavSectionId): void {
    const targetElement = this.document.getElementById(sectionId);

    if (!targetElement) {
      return;
    }

    this.scrollSpy.setActiveSection(sectionId);
    this.smoothScroll.scrollToElement(targetElement, {
      offset: this.getHeaderOffset(),
      targetKey: sectionId
    });
  }

  protected scrollToTop(): void {
    this.smoothScroll.scrollToTop({ targetKey: 'top' });
  }

  private getHeaderOffset(): number {
    return (this.document.defaultView?.innerWidth ?? 0) >= 768 ? 92 : 84;
  }
}
