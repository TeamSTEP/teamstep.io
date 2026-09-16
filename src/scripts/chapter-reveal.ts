/**
 * Lightweight chapter reveal. Respects prefers-reduced-motion.
 * Attach via BaseLayout; observes [data-reveal] elements.
 */
export function initChapterReveal() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      el.dataset.reveal = "visible";
    });
    return;
  }

  const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (nodes.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.reveal = "visible";
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  nodes.forEach((node) => observer.observe(node));
}

initChapterReveal();
