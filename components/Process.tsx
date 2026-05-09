"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LiquidGlass } from "@/components/ui/liquid-glass";

type Step = {
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    title: "Échange & découverte",
    description:
      "On parle de votre activité, vos clients, et ce que vous voulez que votre site fasse pour vous.",
  },
  {
    title: "Maquette & validation",
    description:
      "Je vous montre l’aspect du site avant de coder. Vous validez, on ajuste.",
  },
  {
    title: "Création du site",
    description:
      "Développement, intégration, optimisation mobile et référencement Google.",
  },
  {
    title: "Mise en ligne",
    description:
      "Votre site est en ligne. Je vous montre comment le mettre à jour vous‑même.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const afterRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [locked, setLocked] = useState(false);

  const targetRef = useRef(0); // target progress driven by wheel
  const progressRef = useRef(0); // eased progress shown in UI
  const lockedRef = useRef(false);
  const scrollYRef = useRef(0);
  const touchYRef = useRef<number | null>(null);
  const relockCooldownUntilRef = useRef(0);
  const lockDisabledRef = useRef(false);
  const lastScrollYRef = useRef(0); // tracks scroll direction for re-lock

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lockBody = () => {
      const y = window.scrollY || 0;
      scrollYRef.current = y;
      document.body.style.position = "fixed";
      document.body.style.top = `-${y}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    };

    const scrollInstant = (y: number) => {
      // The global `html { scroll-behavior: smooth }` makes both
      // `scrollTo(0, y)` and `scrollTo({ top: y })` smooth-scroll.
      // Temporarily override it so the restore is truly instant.
      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, y);
      // Restore on the next frame, after the scroll has been committed.
      requestAnimationFrame(() => {
        html.style.scrollBehavior = prev;
      });
    };

    const unlockBody = () => {
      const y = scrollYRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      scrollInstant(y);
    };

    const startLock = (direction: "up" | "down" = "down") => {
      if (lockedRef.current) return;
      if (direction === "down") {
        // Forward entry (scrolling down into the section): align it under
        // the navbar with an instant scroll so the lock anchors cleanly.
        const targetY = Math.max(0, section.offsetTop - 64);
        scrollInstant(targetY);
      }
      // Backward entry (scrolling up from below): freeze the user where
      // they currently are. The sticky timeline is already engaged at the
      // top of the viewport, so skipping the scrollInstant avoids a jump.
      lockBody();
      // Forward starts empty (0), backward starts completed (1) and plays
      // in reverse as the user keeps scrolling up.
      const initial = direction === "up" ? 1 : 0;
      targetRef.current = initial;
      progressRef.current = initial;
      setProgress(initial);
      lockedRef.current = true;
      setLocked(true);
    };

    const endLockToAfter = () => {
      if (!lockedRef.current) return;
      lockedRef.current = false;
      setLocked(false);
      relockCooldownUntilRef.current = Date.now() + 900;
      lockDisabledRef.current = true;
      // Snap to fully completed so the last card stays visible.
      targetRef.current = 1;
      progressRef.current = 1;
      setProgress(1);
      // Resume normal scroll WITHOUT teleporting the page.
      // We keep the current scroll position and simply unlock; the user's next
      // wheel gesture continues the page scroll naturally.
      unlockBody();
    };

    const endLockToBefore = () => {
      if (!lockedRef.current) return;
      lockedRef.current = false;
      setLocked(false);
      relockCooldownUntilRef.current = Date.now() + 900;
      lockDisabledRef.current = true;
      // User went back: reset the timeline visual.
      targetRef.current = 0;
      progressRef.current = 0;
      setProgress(0);
      unlockBody();
    };

    let raf = 0;
    const tick = () => {
      // Only ease while locked. When unlocked, leave progress alone — the
      // unlock helpers (endLockToAfter / endLockToBefore) and startLock set
      // the right value explicitly. Resetting here would make the cards
      // visually disappear the instant the lock releases at the end.
      if (lockedRef.current) {
        const t = targetRef.current;
        const p = progressRef.current;
        // easing tuned for "premium" feel
        const eased = p + (t - p) * 0.14;
        // Snap to target when essentially there. The exponential ease is
        // asymptotic, so without a snap progress would creep toward 1
        // forever and the line would never quite reach the last node.
        const next = Math.abs(t - eased) < 0.001 ? t : eased;
        progressRef.current = next;
        setProgress(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const shouldLockNow = () => {
      if (lockedRef.current) return false;
      if (Date.now() < relockCooldownUntilRef.current) return false;
      if (lockDisabledRef.current) {
        // Re-enable lock once the user has clearly left the section in
        // EITHER direction so we can re-engage when they come back from
        // below (to play the unload animation in reverse).
        const y = window.scrollY || 0;
        const vh = window.innerHeight || 1;
        const aboveSection = y < section.offsetTop - 180;
        const belowSection =
          y > section.offsetTop + section.offsetHeight - vh + 180;
        if (aboveSection || belowSection) {
          lockDisabledRef.current = false;
        } else {
          return false;
        }
      }
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Lock ONLY when the section effectively takes the whole screen (under navbar).
      // This avoids locking while still transitioning into the section.
      const topOk = rect.top <= 72; // navbar(64) + small slack
      const bottomOk = rect.bottom >= vh - 24; // near bottom of viewport
      return topOk && bottomOk;
    };

    const onScroll = () => {
      if (lockedRef.current) return;
      const y = window.scrollY || 0;
      const direction: "up" | "down" =
        y < lastScrollYRef.current ? "up" : "down";
      lastScrollYRef.current = y;
      if (shouldLockNow()) startLock(direction);
    };

    // run once in case user lands via anchor
    lastScrollYRef.current = window.scrollY || 0;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const applyDelta = (deltaY: number) => {
      if (!lockedRef.current) return;
      // normalize trackpad spikes + slow progression
      const capped = Math.max(-140, Math.min(140, deltaY));
      const speed = 1 / 2400; // slower = smoother UX
      const nextTarget = Math.max(0, Math.min(1, targetRef.current + capped * speed));
      targetRef.current = nextTarget;

      // Unlock immediately on the first scroll past the ends (no "extra delay").
      if (nextTarget >= 0.999 && deltaY > 0) {
        targetRef.current = 1;
        progressRef.current = 1;
        setProgress(1);
        endLockToAfter();
        return;
      }
      if (nextTarget <= 0.001 && deltaY < 0) {
        targetRef.current = 0;
        progressRef.current = 0;
        setProgress(0);
        endLockToBefore();
        return;
      }

      // Release only once the line has actually reached the last node.
      // Combined with the snap in `tick`, progress will hit exactly 1 a
      // few frames after target does — so the line completes visually
      // before the lock ends.
      if (nextTarget >= 0.999 && progressRef.current >= 0.999 && deltaY > 0)
        endLockToAfter();
      // Symmetric for the reverse: wait until the line has fully emptied
      // (progress back to 0) before releasing upward.
      if (nextTarget <= 0.001 && progressRef.current <= 0.001 && deltaY < 0)
        endLockToBefore();
    };

    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return;
      e.preventDefault();
      applyDelta(e.deltaY);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!lockedRef.current) return;
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      const delta =
        e.key === "ArrowDown" || e.key === "PageDown" || e.key === " " || e.key === "End"
          ? 120
          : -120;
      applyDelta(delta);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!lockedRef.current) return;
      touchYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!lockedRef.current) return;
      e.preventDefault();
      const y = e.touches[0]?.clientY;
      if (y == null) return;
      const prev = touchYRef.current ?? y;
      touchYRef.current = y;
      applyDelta((prev - y) * 1.1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (lockedRef.current) unlockBody();
    };
  }, []);

  const activeIndex = useMemo(() => {
    if (steps.length <= 1) return 0;
    // Activate exactly when the progress reaches each node:
    // idx lights up at progress >= idx/(n-1)
    const idx = Math.floor(progress * (steps.length - 1) + 1e-6);
    return Math.max(0, Math.min(steps.length - 1, idx));
  }, [progress]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-16"
    >
      <div className="sticky top-16 flex min-h-[calc(100vh-4rem)] items-center">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                Comment ça se passe
              </h2>
            </div>

            <div className="mt-16 sm:mt-24">
              <div className="relative mx-auto max-w-5xl">
                {/* Desktop: cards above/below the line */}
                <div className="hidden md:block">
                  {/* Base + progress line: spans the full row from 0% to 100%. */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
                    <div className="h-[2px] w-full rounded-full bg-white/10" />
                    <div
                      className="h-[3px] rounded-full bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-300"
                      style={{
                        width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
                        opacity: progress > 0 ? 1 : 0,
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-4 grid-rows-[1fr_auto_1fr] gap-x-6">
                    {steps.map((step, idx) => {
                      // Each node sits at the center of its grid column, so the
                      // line reaches it at progress = (2*idx + 1) / (2*n).
                      // For 4 steps: 0.125 / 0.375 / 0.625 / 0.875.
                      const threshold = (2 * idx + 1) / (2 * steps.length);
                      // Reveal a touch before the line hits the node; first
                      // card pops in as soon as scrolling starts.
                      const showAt =
                        idx === 0 ? 0.02 : Math.max(0, threshold - 0.05);
                      const isReached =
                        progress > 0 ? progress >= threshold : false;
                      const isVisible = progress >= showAt;
                      const isCurrent = idx === activeIndex;
                      const isBottom = idx % 2 === 1; // 1 haut, 2 bas, 3 haut, 4 bas

                      const card = (
                        <LiquidGlass
                          glow={isReached ? "blue" : "none"}
                          blur={isReached}
                          glowOrigin="bc"
                          className="p-4"
                        >
                          <p className="text-[13px] font-semibold text-white">
                            {step.title}
                          </p>
                          <p className="mt-2 text-[13px] leading-5 text-white/75">
                            {step.description}
                          </p>
                        </LiquidGlass>
                      );

                      return (
                        <div key={step.title} className="relative col-span-1">
                          {/* Top card */}
                          {!isBottom ? (
                            <div
                              className={[
                                "pb-4 transition-all duration-700 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,2.2)]",
                                isVisible
                                  ? "opacity-100 translate-y-0 hover:-translate-y-1"
                                  : "opacity-0 -translate-y-3 pointer-events-none",
                              ].join(" ")}
                            >
                              {card}
                            </div>
                          ) : (
                            <div className="h-full" />
                          )}

                          {/* Node (middle row) */}
                          <div className="row-start-2 flex items-center justify-center py-1.5">
                            <div
                              className={[
                                "relative flex items-center justify-center",
                                // create a gap between the main line and the circle
                                isBottom ? "translate-y-3" : "-translate-y-3",
                              ].join(" ")}
                            >
                              {/* connector */}
                              <div
                                aria-hidden="true"
                                className={[
                                  "absolute left-1/2 w-px -translate-x-1/2 bg-white/10",
                                  isBottom ? "-top-3 h-3" : "-bottom-3 h-3",
                                ].join(" ")}
                              />

                              <div
                                className={[
                                  "flex h-11 w-11 items-center justify-center rounded-full border",
                                  isReached
                                    ? "border-white/25 bg-white/10"
                                    : "border-white/10 bg-black/20",
                                ].join(" ")}
                              >
                                <span
                                  className={[
                                    "text-xs font-semibold",
                                    isReached ? "text-white" : "text-white/70",
                                  ].join(" ")}
                                >
                                  {idx + 1}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Bottom card */}
                          {isBottom ? (
                            <div
                              className={[
                                "pt-4 transition-all duration-700 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,2.2)]",
                                isVisible
                                  ? "opacity-100 translate-y-0 hover:-translate-y-1"
                                  : "opacity-0 translate-y-3 pointer-events-none",
                              ].join(" ")}
                            >
                              {card}
                            </div>
                          ) : (
                            <div className="h-full" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile: stack */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  {steps.map((step, idx) => {
                    const threshold = (2 * idx + 1) / (2 * steps.length);
                    const showAt =
                      idx === 0 ? 0.02 : Math.max(0, threshold - 0.05);
                    const isReached =
                      progress > 0 ? progress >= threshold : false;
                    const isVisible = progress >= showAt;
                    const isCurrent = idx === activeIndex;
                    return (
                      <div
                        key={step.title}
                        className={[
                          "transition-all duration-700 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,2.2)]",
                          isVisible
                            ? "opacity-100 translate-y-0 hover:-translate-y-1"
                            : "opacity-0 translate-y-3 pointer-events-none",
                        ].join(" ")}
                      >
                        <LiquidGlass
                          glow={isReached ? "blue" : "none"}
                          blur={isReached}
                          className="p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={[
                                "flex h-9 w-9 items-center justify-center rounded-full border",
                                isReached
                                  ? "border-white/25 bg-white/10"
                                  : "border-white/10 bg-black/20",
                              ].join(" ")}
                            >
                              <span
                                className={[
                                  "text-xs font-semibold",
                                  isReached ? "text-white" : "text-white/70",
                                ].join(" ")}
                              >
                                {idx + 1}
                              </span>
                            </div>
                            <p className="text-[13px] font-semibold text-white">
                              {step.title}
                            </p>
                          </div>
                          <p className="mt-3 text-[13px] leading-5 text-white/75">
                            {step.description}
                          </p>
                        </LiquidGlass>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="mt-8 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/85">
                  De l&apos;échange initial à la mise en ligne : comptez en moyenne 2
                  semaines.
                </span>
              </p>
            </div>
        </div>
      </div>

      <div ref={afterRef} aria-hidden="true" className="h-px w-px" />
    </section>
  );
}

