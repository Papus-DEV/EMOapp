import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface ScrollOptions {
  offset?: number;
  targetKey?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SmoothScrollService {
  private readonly document = inject(DOCUMENT);
  private animationFrameId: number | null = null;
  private animationDelayId: number | null = null;
  private currentTargetKey: string | null = null;

  scrollToElement(element: HTMLElement, options: ScrollOptions = {}): void {
    const view = this.document.defaultView;

    if (!view) {
      return;
    }

    const targetY = Math.max(0, element.getBoundingClientRect().top + view.scrollY - (options.offset ?? 0));
    this.animateTo(targetY, options.targetKey ?? element.id);
  }

  scrollToTop(options: ScrollOptions = {}): void {
    this.animateTo(0, options.targetKey ?? 'top');
  }

  cancel(): void {
    const view = this.document.defaultView;

    if (!view) {
      return;
    }

    if (this.animationDelayId !== null) {
      view.clearTimeout(this.animationDelayId);
      this.animationDelayId = null;
    }

    if (this.animationFrameId !== null) {
      view.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    this.currentTargetKey = null;
  }

  private animateTo(targetY: number, targetKey: string): void {
    const view = this.document.defaultView;

    if (!view) {
      return;
    }

    if (this.currentTargetKey === targetKey && (this.animationFrameId !== null || this.animationDelayId !== null)) {
      return;
    }

    this.cancel();
    this.currentTargetKey = targetKey;

    const startY = view.scrollY;
    const distance = targetY - startY;

    if (Math.abs(distance) < 4) {
      this.currentTargetKey = null;
      return;
    }

    this.animationDelayId = view.setTimeout(() => {
      this.animationDelayId = null;
      const duration = this.getDuration(distance);
      const animationStart = performance.now();

      const step = (timestamp: number) => {
        const progress = Math.min((timestamp - animationStart) / duration, 1);
        const easedProgress = this.easeInOutCubic(progress);

        view.scrollTo({
          top: startY + distance * easedProgress,
          behavior: 'auto'
        });

        if (progress < 1) {
          this.animationFrameId = view.requestAnimationFrame(step);
          return;
        }

        this.animationFrameId = null;
        this.currentTargetKey = null;
      };

      this.animationFrameId = view.requestAnimationFrame(step);
    }, 45);
  }

  private getDuration(distance: number): number {
    const normalizedDistance = Math.abs(distance);
    return Math.min(1150, Math.max(650, normalizedDistance * 0.55));
  }

  private easeInOutCubic(progress: number): number {
    return progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  }
}
