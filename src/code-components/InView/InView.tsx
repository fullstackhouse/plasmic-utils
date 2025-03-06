import { CSSProperties, ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";

interface InViewProps {
  className?: string;
  style?: CSSProperties;

  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  initialInView?: boolean;
  fallbackInView?: boolean;
  onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;

  previewFallback?: boolean;
  fallback: ReactNode;
  children: ReactNode;
}

export function InView({
  className,
  style,
  root,
  rootMargin,
  threshold,
  triggerOnce,
  initialInView,
  fallbackInView,
  onChange,
  previewFallback,
  fallback,
  children,
}: InViewProps) {
  const { ref, inView } = useInView({
    root,
    rootMargin,
    threshold,
    triggerOnce,
    initialInView,
    fallbackInView,
    onChange,
  });
  return (
    <div ref={ref} className={className} style={style}>
      {previewFallback || !inView ? fallback : children}
    </div>
  );
}
