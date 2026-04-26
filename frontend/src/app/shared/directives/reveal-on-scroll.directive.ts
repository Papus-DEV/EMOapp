import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[revealOnScroll]',
  standalone: true
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  @Input() revealOnScrollDelay?: number;
  @Input() revealOnScrollOnce = true;

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    this.renderer.addClass(element, 'reveal-on-scroll');
    this.renderer.setStyle(element, 'transition-delay', `${this.getDelay()}ms`);

    if (this.prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(element, 'reveal-on-scroll-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            if (!this.revealOnScrollOnce) {
              this.renderer.removeClass(element, 'reveal-on-scroll-visible');
            }

            continue;
          }

          this.renderer.addClass(element, 'reveal-on-scroll-visible');

          if (this.revealOnScrollOnce) {
            this.observer?.disconnect();
            this.observer = undefined;
          }
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -12% 0px'
      }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private getDelay(): number {
    if (typeof this.revealOnScrollDelay === 'number') {
      return this.revealOnScrollDelay;
    }

    const element = this.elementRef.nativeElement;
    const parent = element.parentElement;

    if (!parent) {
      return 0;
    }

    const revealSiblings = Array.from(parent.children).filter((sibling) => sibling.hasAttribute('revealOnScroll'));
    const index = revealSiblings.indexOf(element);

    if (index < 0) {
      return 0;
    }

    return Math.min(index * 120, 480);
  }

  private prefersReducedMotion(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
