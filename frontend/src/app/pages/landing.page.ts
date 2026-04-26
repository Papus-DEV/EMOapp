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
    <div class="landing-shell">
      <header class="landing-header sticky top-0 z-40">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p class="landing-brand-kicker text-xs font-semibold uppercase tracking-[0.24em]">EMOapp</p>
            <p class="landing-brand-title text-lg font-extrabold tracking-tight">AI Marketing System</p>
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
            <a routerLink="/login" class="interactive-button ai-text-button rounded-md px-4 py-2 text-sm font-semibold">
              Login
            </a>
            <a
              routerLink="/register"
              class="interactive-button ai-primary-button rounded-md px-4 py-2 text-sm font-semibold"
            >
              Start free
            </a>
          </div>
        </div>
      </header>

      <main>
        <section class="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div class="ai-orb-background absolute inset-x-0 top-0 -z-10 h-[32rem] blur-3xl"></div>
          <div class="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div revealOnScroll>
              <span class="landing-kicker inline-flex rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
                Stop guessing. Start converting.
              </span>
              <h1 class="landing-heading mt-6 max-w-3xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
                Stop guessing your marketing and start getting customers
              </h1>
              <p class="landing-body mt-6 max-w-2xl text-lg leading-8">
                You should not have to waste money on random posts, bad ads, and ideas that go nowhere. Turn your
                product into clear campaigns that help you sell faster.
              </p>

              <div class="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  routerLink="/register"
                  class="interactive-button ai-primary-button inline-flex items-center justify-center rounded-md px-6 py-3.5 text-sm font-semibold"
                >
                  Start free now
                </a>
                <button
                  type="button"
                  class="interactive-button ai-secondary-button inline-flex items-center justify-center rounded-md px-6 py-3.5 text-sm font-semibold"
                  (click)="scrollToSection('solution')"
                >
                  See it in action
                </button>
              </div>

              <div class="mt-10 grid gap-4 sm:grid-cols-3">
                @for (stat of heroStats; track stat.label) {
                  <div revealOnScroll class="interactive-card ai-soft-panel rounded-lg p-5">
                    <p class="ai-text-primary text-3xl font-extrabold tracking-tight">{{ stat.value }}</p>
                    <p class="ai-text-secondary mt-2 text-sm">{{ stat.label }}</p>
                  </div>
                }
              </div>
            </div>

            <div revealOnScroll class="interactive-card ai-glass-panel-strong rounded-lg p-5">
              <div class="ai-soft-panel rounded-lg p-5">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="ai-highlight-text text-xs uppercase tracking-[0.22em]">System preview</p>
                    <p class="ai-text-primary mt-2 text-2xl font-bold">Your future marketing system</p>
                  </div>
                  <div class="ai-live-badge rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em]">Live</div>
                </div>

                <div class="mt-6 grid gap-4 sm:grid-cols-2">
                  <div revealOnScroll class="ai-soft-panel rounded-lg p-4">
                    <p class="ai-highlight-text text-xs uppercase tracking-[0.2em]">Product</p>
                    <p class="ai-text-primary mt-3 text-lg font-semibold">Organic hair serum</p>
                  </div>
                  <div revealOnScroll class="ai-soft-panel rounded-lg p-4">
                    <p class="ai-highlight-text text-xs uppercase tracking-[0.2em]">Goal</p>
                    <p class="ai-text-primary mt-3 text-lg font-semibold">Get first 100 customers</p>
                  </div>
                </div>
              </div>

              <div class="mt-5 grid gap-4">
                @for (preview of previewCards; track preview.title) {
                  <div revealOnScroll class="interactive-card ai-soft-panel rounded-lg p-4">
                    <div class="flex items-center justify-between gap-4">
                      <div>
                        <p class="ai-text-primary text-sm font-semibold">{{ preview.title }}</p>
                        <p class="ai-text-secondary mt-1 text-sm">{{ preview.description }}</p>
                      </div>
                      <span class="ai-chip rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
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
              <p class="landing-section-kicker text-xs font-semibold uppercase tracking-[0.24em]">Problem</p>
              <h2 class="landing-section-title mt-3 text-4xl font-black tracking-tight">Why most small businesses stay invisible</h2>
              <p class="landing-section-copy mt-4 text-lg leading-8">
                You can have a solid product and still lose money if your marketing is random, unclear, and impossible to
                repeat.
              </p>
            </div>

            <div class="mt-10 grid gap-5 md:grid-cols-3">
              @for (problem of problems; track problem.title) {
                <article revealOnScroll class="interactive-card ai-glass-panel rounded-lg p-6">
                  <div class="ai-icon-panel flex h-12 w-12 items-center justify-center rounded-md text-sky-300">
                    <i class="{{ problem.icon }}"></i>
                  </div>
                  <h3 class="ai-text-primary mt-5 text-xl font-bold">{{ problem.title }}</h3>
                  <p class="ai-text-secondary mt-3 text-sm leading-7">{{ problem.description }}</p>
                </article>
              }
            </div>
          </div>
        </section>

        <section id="solution" revealOnScroll class="px-4 py-18 sm:px-6 lg:px-8">
          <div class="ai-glass-panel mx-auto max-w-7xl rounded-lg p-6 sm:p-8 lg:p-10">
            <div revealOnScroll class="max-w-3xl">
              <p class="landing-section-kicker text-xs font-semibold uppercase tracking-[0.24em]">Solution</p>
              <h2 class="landing-section-title mt-3 text-4xl font-black tracking-tight">From confusion to campaigns in five clear steps</h2>
              <p class="landing-section-copy mt-4 text-lg leading-8">
                Instead of guessing your next move, you follow a simple path that turns what you sell into marketing
                people understand and buy from.
              </p>
            </div>

            <div class="mt-10 grid gap-4 lg:grid-cols-5">
              @for (step of workflow; track step.step) {
                <article revealOnScroll class="interactive-card ai-soft-panel rounded-lg p-5">
                  <span class="ai-primary-button inline-flex rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                    {{ step.step }}
                  </span>
                  <h3 class="ai-text-primary mt-5 text-xl font-bold">{{ step.title }}</h3>
                  <p class="ai-text-secondary mt-3 text-sm leading-7">{{ step.description }}</p>
                </article>
              }
            </div>
          </div>
        </section>

        <section id="features" revealOnScroll class="px-4 py-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <div revealOnScroll class="max-w-2xl">
              <p class="landing-section-kicker text-xs font-semibold uppercase tracking-[0.24em]">Features</p>
              <h2 class="landing-section-title mt-3 text-4xl font-black tracking-tight">Everything you need to stop wasting effort</h2>
            </div>

            <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              @for (feature of features; track feature.title) {
                <article revealOnScroll class="interactive-card ai-glass-panel rounded-lg p-6">
                  <div class="ai-icon-panel flex h-12 w-12 items-center justify-center rounded-md text-sky-300">
                    <i class="{{ feature.icon }}"></i>
                  </div>
                  <h3 class="ai-text-primary mt-5 text-xl font-bold">{{ feature.title }}</h3>
                  <p class="ai-text-secondary mt-3 text-sm leading-7">{{ feature.description }}</p>
                </article>
              }
            </div>
          </div>
        </section>

        <section id="demo" revealOnScroll class="px-4 py-18 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <div class="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div revealOnScroll>
                <p class="landing-section-kicker text-xs font-semibold uppercase tracking-[0.24em]">Demo</p>
                <h2 class="landing-section-title mt-3 text-4xl font-black tracking-tight">This is what your marketing can look like next week</h2>
                <p class="landing-section-copy mt-4 text-lg leading-8">
                  Your product, your message, your campaigns, and your next best actions in one place so you can stop
                  guessing and start moving with confidence.
                </p>
              </div>

              <div revealOnScroll class="interactive-card ai-glass-panel-strong rounded-lg p-5">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="ai-text-muted text-xs font-semibold uppercase tracking-[0.2em]">Dashboard preview</p>
                    <h3 class="ai-text-primary mt-2 text-2xl font-bold">Campaign command center</h3>
                  </div>
                  <span class="ai-live-badge rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                    Placeholder demo
                  </span>
                </div>

                <div class="mt-6 grid gap-4 md:grid-cols-3">
                  @for (metric of demoMetrics; track metric.label) {
                    <div revealOnScroll class="interactive-card ai-soft-panel rounded-lg p-4">
                      <p class="ai-text-muted text-xs uppercase tracking-[0.18em]">{{ metric.label }}</p>
                      <p class="ai-text-primary mt-3 text-2xl font-bold">{{ metric.value }}</p>
                    </div>
                  }
                </div>

                <div revealOnScroll class="ai-soft-panel mt-5 rounded-lg p-4">
                  <div class="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                    <div class="space-y-3">
                      @for (row of demoList; track row.title) {
                        <div revealOnScroll class="interactive-card ai-soft-panel rounded-lg p-4">
                          <p class="ai-text-primary text-sm font-semibold">{{ row.title }}</p>
                          <p class="ai-text-secondary mt-1 text-sm">{{ row.description }}</p>
                        </div>
                      }
                    </div>

                    <div revealOnScroll class="interactive-card ai-soft-panel rounded-lg p-5">
                      <p class="ai-text-primary text-sm font-semibold">Optimization suggestion</p>
                      <div class="ai-progress-track mt-4 h-3 overflow-hidden rounded-md">
                        <div class="h-full w-[74%] rounded-full bg-gradient-to-r from-sky-500 to-indigo-600"></div>
                      </div>
                      <p class="ai-text-secondary mt-4 text-sm leading-7">
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
              <p class="landing-section-kicker text-xs font-semibold uppercase tracking-[0.24em]">Pricing</p>
              <h2 class="landing-section-title mt-3 text-4xl font-black tracking-tight">Start with zero risk. Upgrade when it starts working.</h2>
            </div>

            <div class="mt-10 grid gap-6 lg:grid-cols-2">
              <article revealOnScroll class="interactive-card ai-glass-panel rounded-lg p-8">
                <span class="ai-chip rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">Free</span>
                <h3 class="ai-text-primary mt-5 text-3xl font-black tracking-tight">$0</h3>
                <p class="ai-text-secondary mt-2 text-sm">Perfect for your first product. No big commitment. No pressure.</p>
                <ul class="ai-text-secondary mt-6 space-y-3 text-sm">
                  <li>1 product</li>
                  <li>Core AI workflow</li>
                  <li>Basic content and campaign guidance</li>
                </ul>
                <a
                  routerLink="/register"
                  class="interactive-button ai-primary-button mt-8 inline-flex rounded-md px-5 py-3 text-sm font-semibold"
                >
                  Start free now
                </a>
              </article>

              <article revealOnScroll class="interactive-card ai-glass-panel-strong rounded-lg p-8">
                <span class="ai-live-badge rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">Pro</span>
                <h3 class="ai-text-primary mt-5 text-3xl font-black tracking-tight">$50<span class="ai-text-secondary text-lg font-semibold">/month</span></h3>
                <p class="ai-text-secondary mt-2 text-sm">For businesses ready to scale what works with more clarity and momentum.</p>
                <ul class="ai-text-secondary mt-6 space-y-3 text-sm">
                  <li>Multiple products</li>
                  <li>Full campaign workflow</li>
                  <li>Optimization suggestions and faster execution</li>
                </ul>
                <a
                  routerLink="/register"
                  class="interactive-button ai-primary-button mt-8 inline-flex rounded-md px-5 py-3 text-sm font-semibold"
                >
                  Upgrade to Pro
                </a>
              </article>
            </div>
          </div>
        </section>

        <section revealOnScroll class="px-4 pb-24 pt-18 sm:px-6 lg:px-8">
          <div class="ai-glass-panel-strong mx-auto max-w-7xl rounded-lg px-6 py-12 text-center shadow-2xl sm:px-10">
            <p class="landing-section-kicker text-xs font-semibold uppercase tracking-[0.24em]">Final CTA</p>
            <h2 class="landing-section-title mt-4 text-4xl font-black tracking-tight">Every week you wait is another week of lost sales</h2>
            <p class="landing-section-copy mx-auto mt-5 max-w-2xl text-base leading-8">
              You already have something worth selling. Now build the marketing system that helps people buy it. Start
              free and launch with clarity today.
            </p>
            <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                routerLink="/register"
                class="interactive-button ai-primary-button inline-flex rounded-md px-6 py-3.5 text-sm font-semibold"
              >
                Start free now
              </a>
              <button
                type="button"
                class="interactive-button ai-secondary-button inline-flex rounded-md px-6 py-3.5 text-sm font-semibold"
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
          class="interactive-button ai-primary-button fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-lg focus:outline-none focus:ring-4 focus:ring-sky-200"
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
