"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useHideOnScroll
 * Returns `visible` — true when the bar(s) using this hook should be shown,
 * false when the user has scrolled down (hide), matching the original
 * Header scroll behavior. Shared so multiple bars (Header, RoleSubNav)
 * hide/show in perfect sync instead of each running its own listener
 * with its own timing.
 *
 * @param onHide optional callback fired the moment visibility flips to false
 *               (e.g. Header uses this to close its mobile menu)
 */
export function useHideOnScroll(onHide?: () => void) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setVisible((prevVisible) => {
        let next = prevVisible;

        if (currentScrollY < 10) {
          next = true;
        } else if (currentScrollY > lastScrollY.current) {
          next = false;
        } else {
          next = true;
        }

        if (prevVisible && !next) {
          onHide?.();
        }

        return next;
      });

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onHide]);

  return visible;
}