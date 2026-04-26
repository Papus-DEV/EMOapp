import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService {
  private observer?: IntersectionObserver;
  private readonly visibleSections = new Map<string, number>();

  readonly activeSection = signal<string | null>(null);

  observe(sectionIds: string[], document: Document): void {
    this.disconnect();

    const view = document.defaultView;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (!sections.length) {
      this.activeSection.set(null);
      return;
    }

    this.activeSection.set(sectionIds[0] ?? null);

    if (!view || typeof view.IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new view.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.visibleSections.set(entry.target.id, entry.intersectionRatio);
            continue;
          }

          this.visibleSections.delete(entry.target.id);
        }

        const nextSection = this.pickActiveSection(sections);

        if (nextSection) {
          this.activeSection.set(nextSection);
        }
      },
      {
        root: null,
        threshold: [0.18, 0.35, 0.55, 0.72],
        rootMargin: '-18% 0px -52% 0px'
      }
    );

    for (const section of sections) {
      this.observer.observe(section);
    }
  }

  setActiveSection(sectionId: string): void {
    this.activeSection.set(sectionId);
  }

  disconnect(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    this.visibleSections.clear();
  }

  private pickActiveSection(sections: HTMLElement[]): string | null {
    const visibleSections = sections.filter((section) => this.visibleSections.has(section.id));

    if (!visibleSections.length) {
      return this.activeSection();
    }

    visibleSections.sort((left, right) => {
      const ratioDifference = (this.visibleSections.get(right.id) ?? 0) - (this.visibleSections.get(left.id) ?? 0);

      if (Math.abs(ratioDifference) > 0.02) {
        return ratioDifference;
      }

      return Math.abs(left.getBoundingClientRect().top) - Math.abs(right.getBoundingClientRect().top);
    });

    return visibleSections[0]?.id ?? null;
  }
}
