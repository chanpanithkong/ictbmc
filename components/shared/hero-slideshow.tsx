"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { format, localizeNumber } from "@/lib/i18n/format";
import { cn } from "@/lib/utils";

export interface Slide {
  id: string;
  title: string;
  text?: string;
  content: ReactNode;
}

const INTERVAL = 6000;

/**
 * Accessible hero slideshow (WAI-ARIA carousel pattern).
 * - Autoplays, pauses on hover / keyboard focus, has an explicit pause button.
 * - No autoplay when the visitor prefers reduced motion.
 * - Arrow keys move between slides; hidden slides are `inert`.
 * Slides are stacked in one grid cell, so the height never jumps.
 */
export function HeroSlideshow({ slides, className }: { slides: Slide[]; className?: string }) {
  const { locale, dict } = useI18n();
  const t = dict.slideshow;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const count = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  const active = playing && !hovered && !focused && !reduced && count > 1;
  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(id);
  }, [active, index, go]);

  const num = (n: number) => localizeNumber(n, locale);

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={t.region}
      className={cn("relative", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      {/* glow */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-tr from-brand-600/30 via-accent-500/15 to-transparent blur-3xl"
      />

      {/* slides */}
      <div className="grid grid-cols-[minmax(0,1fr)]" aria-live={active ? "off" : "polite"}>
        {slides.map((s, i) => {
          const on = i === index;
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={format(t.slide, { n: num(i + 1), total: num(count) }) + ` — ${s.title}`}
              aria-hidden={!on}
              inert={!on}
              className={cn(
                "flex min-w-0 items-center justify-center transition-all duration-700 ease-out [grid-area:1/1]",
                on ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-[0.98] opacity-0",
              )}
            >
              <div className="w-full min-w-0">{s.content}</div>
            </div>
          );
        })}
      </div>

      {/* caption + controls */}
      <div className="mt-8 flex items-end justify-between gap-4">
        <div className="relative min-h-[3.5rem] min-w-0 flex-1">
          {slides.map((s, i) => (
            <div
              key={s.id}
              aria-hidden={i !== index}
              className={cn(
                "absolute inset-x-0 bottom-0 transition-opacity duration-500",
                i === index ? "opacity-100" : "opacity-0",
              )}
            >
              <p className="font-semibold text-white">{s.title}</p>
              {s.text && <p className="mt-1 text-sm text-slate-400">{s.text}</p>}
            </div>
          ))}
        </div>

        {count > 1 && (
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={t.prev}
              className="focus-ring inline-flex size-9 items-center justify-center rounded-full text-slate-300 ring-1 ring-white/15 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? t.pause : t.play}
              className="focus-ring inline-flex size-9 items-center justify-center rounded-full text-slate-300 ring-1 ring-white/15 transition-colors hover:bg-white/10 hover:text-white"
            >
              {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={t.next}
              className="focus-ring inline-flex size-9 items-center justify-center rounded-full text-slate-300 ring-1 ring-white/15 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>

      {/* progress dots */}
      {count > 1 && (
        <div className="mt-4 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={format(t.goTo, { n: num(i + 1), title: s.title })}
              aria-current={i === index ? "true" : undefined}
              className="focus-ring group relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/15"
            >
              <span
                aria-hidden
                key={i === index ? `${index}-${active}` : "idle"}
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-400 to-accent-400",
                  i < index && "w-full",
                  i > index && "w-0",
                  i === index && (active ? "animate-slide-progress" : "w-full"),
                )}
                style={i === index && active ? { animationDuration: `${INTERVAL}ms` } : undefined}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
