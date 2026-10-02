import { useEffect } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

const writeProgress = (progress: number) => {
  const root = document.documentElement;
  root.style.setProperty("--mq-progress", progress.toFixed(4));
  root.dataset.mqProgress =
    progress >= 0.999 ? "1" : progress <= 0.001 ? "0" : "mid";
};

const readProgress = (scrollY: number, reduceMotion: boolean | null) => {
  const meltdown = document.getElementById("meltdown");
  if (!meltdown) return 0;

  const end = Math.max(meltdown.offsetTop, window.innerHeight * 0.75);
  if (reduceMotion) return scrollY >= end * 0.9 ? 1 : 0;
  return Math.min(1, Math.max(0, scrollY / end));
};

/**
 * Links Boot peek → FeaturedStage with scroll progress.
 * Motion tracks scroll; CSS handles expand transforms via `--mq-progress`.
 */
export const useMainQuestExpand = () => {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    writeProgress(readProgress(y, reduceMotion));
  });

  useEffect(() => {
    writeProgress(readProgress(scrollY.get(), reduceMotion));
    return () => {
      const root = document.documentElement;
      root.style.removeProperty("--mq-progress");
      delete root.dataset.mqProgress;
    };
  }, [reduceMotion, scrollY]);
};
