import { useRef, useEffect, RefObject } from "react";

export function useIntersectionObserver(
  callback: () => Promise<void> | void,
  options?: IntersectionObserverInit
): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const calledOnceRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !calledOnceRef.current) {
          calledOnceRef.current = true;
          await callback();
          calledOnceRef.current = false;
        }
      },
      {
        root: null,
        rootMargin: "-10px 0px 0px 0px",
        threshold: 0.1,
        ...options,
      }
    );

    observerRef.current.observe(el);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [callback, options]);

  return ref;
}
