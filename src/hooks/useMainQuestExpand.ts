import { useEffect } from "react";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
}

const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t;
}

const readCssLength = (variable: string): number => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  if (!raw) return 0;
  const probe = document.createElement("div");
  probe.style.cssText = `position:absolute;visibility:hidden;height:${raw}`;
  document.documentElement.appendChild(probe);
  const value = probe.getBoundingClientRect().height;
  probe.remove();
  return value;
}

/**
 * Scroll-links Boot peek → FeaturedStage: thumb zooms into stage media,
 * peek copy fades out, stage chrome fades in. No duplicate hero while collapsing.
 */
export const useMainQuestExpand = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clone = document.createElement("div");
    clone.className = "mq-morph-thumb";
    clone.setAttribute("aria-hidden", "true");
    const cloneImg = document.createElement("img");
    cloneImg.alt = "";
    clone.appendChild(cloneImg);
    document.body.appendChild(clone);

    let peek: HTMLElement | null = null;
    let thumb: HTMLElement | null = null;
    let thumbImg: HTMLImageElement | null = null;
    let stage: HTMLElement | null = null;
    let media: HTMLElement | null = null;
    let meltdown: HTMLElement | null = null;
    let frame = 0;

    const hideClone = () => {
      clone.style.opacity = "0";
      clone.style.pointerEvents = "none";
      clone.classList.remove("is-active");
    };

    const setProgress = (progress: number) => {
      root.style.setProperty("--mq-progress", progress.toFixed(4));
      root.dataset.mqProgress = progress >= 0.999 ? "1" : progress <= 0.001 ? "0" : "mid";
    };

    const resolveNodes = () => {
      peek = document.querySelector<HTMLElement>(".ds-boot__peek");
      thumb = peek?.querySelector<HTMLElement>(".ds-boot__peek-thumb") ?? null;
      thumbImg = thumb?.querySelector("img") ?? null;
      meltdown = document.getElementById("meltdown");
      stage = meltdown?.querySelector<HTMLElement>(".ds-featured-stage") ?? null;
      media = stage?.querySelector<HTMLElement>(".ds-featured-stage__media") ?? null;
      return Boolean(peek && thumb && thumbImg && meltdown && stage && media);
    };

    const update = () => {
      frame = 0;
      if (!resolveNodes() || !peek || !thumb || !thumbImg || !meltdown || !media || !stage) {
        hideClone();
        return;
      }

      const navTop = readCssLength("--nav-top-height");

      // Finish expand when the main-quest block reaches the top nav.
      const endScroll = Math.max(meltdown.offsetTop - navTop, window.innerHeight * 0.75);
      const progress = reduceMotion
        ? window.scrollY >= endScroll * 0.9
          ? 1
          : 0
        : clamp(window.scrollY / endScroll, 0, 1);

      setProgress(progress);
      peek.classList.toggle("is-expanding", progress > 0 && progress < 1);
      peek.classList.toggle("is-expanded", progress >= 1);
      stage.classList.toggle("is-expanding", progress > 0 && progress < 1);
      stage.classList.toggle("is-expanded", progress >= 1);

      if (reduceMotion || progress <= 0 || progress >= 1) {
        hideClone();
        thumb.style.opacity = progress >= 1 ? "0" : "";
        return;
      }

      const rest = thumb.getBoundingClientRect();
      const target = media.getBoundingClientRect();
      if (rest.width < 1 || target.width < 1) {
        hideClone();
        return;
      }

      if (cloneImg.src !== thumbImg.currentSrc && thumbImg.currentSrc) {
        cloneImg.src = thumbImg.currentSrc;
      }

      const top = lerp(rest.top, target.top, progress);
      const left = lerp(rest.left, target.left, progress);
      const width = lerp(rest.width, target.width, progress);
      const height = lerp(rest.height, target.height, progress);

      clone.style.opacity = "1";
      clone.style.pointerEvents = "none";
      clone.style.top = `${top}px`;
      clone.style.left = `${left}px`;
      clone.style.width = `${width}px`;
      clone.style.height = `${height}px`;
      clone.classList.add("is-active");
      thumb.style.opacity = "0";
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    hideClone();
    requestUpdate();

    const observer = new MutationObserver(() => requestUpdate());
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      peek?.classList.remove("is-expanding", "is-expanded");
      stage?.classList.remove("is-expanding", "is-expanded");
      if (thumb) thumb.style.opacity = "";
      root.style.removeProperty("--mq-progress");
      delete root.dataset.mqProgress;
      clone.remove();
    };
  }, [enabled]);
}
