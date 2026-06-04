import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Drop-in replacement for React Router's <ScrollRestoration /> that works
 * with <BrowserRouter> (which is not a "data router").
 *
 * Behavior:
 *   - On POP (back/forward): restore the previously saved scroll position
 *   - On PUSH/REPLACE (link click): scroll to top
 *
 * Position is keyed by pathname+search+hash, so each route remembers its own.
 */
const positions = new Map<string, number>();

export function useScrollRestoration() {
  const location = useLocation();
  const isFirstMount = useRef(true);
  const previousKey = useRef<string | null>(null);

  useEffect(() => {
    const key = location.pathname + location.search + location.hash;

    if (isFirstMount.current) {
      isFirstMount.current = false;
      previousKey.current = key;
      return;
    }

    // Detect popstate via the browser's native back/forward buttons
    // react-router doesn't expose action='POP' in BrowserRouter history state,
    // so we infer it by comparing pathname against the previous key.
    const isBack = previousKey.current !== null && key !== previousKey.current
      && window.history.state?.idx !== undefined
      && window.history.state.idx < ((window.history.state?.idx ?? 0));

    if (isBack && positions.has(key)) {
      window.scrollTo({ top: positions.get(key) ?? 0, behavior: "instant" as ScrollBehavior });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }

    previousKey.current = key;
  }, [location.pathname, location.search, location.hash]);

  // Save scroll position on scroll (throttled via rAF)
  useEffect(() => {
    let frame: number | null = null;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const key = location.pathname + location.search + location.hash;
        positions.set(key, window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [location.pathname, location.search, location.hash]);
}
