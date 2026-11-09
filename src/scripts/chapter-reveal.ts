/**
 * Lightweight chapter reveal. Respects prefers-reduced-motion.
 * Attach via BaseLayout; observes [data-reveal] elements.
 *
 * Progressive enhancement: content stays visible until this module opts
 * below-the-fold chapters into the hide/reveal animation. That way a failed
 * module load (or a missed IntersectionObserver callback) never blanks the page.
 */
export const initChapterReveal = () => {
  if (typeof window === "undefined") return;

  const nodes = [
    ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
  ];
  if (nodes.length === 0) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((el) => {
      el.dataset.reveal = "visible";
    });
    return;
  }

  const inView = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.dataset.reveal = "visible";
        el.classList.remove("reveal-animate");
        observer.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0 },
  );

  nodes.forEach((node) => {
    if (inView(node)) {
      node.dataset.reveal = "visible";
      return;
    }
    node.classList.add("reveal-animate");
    observer.observe(node);
  });
};

initChapterReveal();
