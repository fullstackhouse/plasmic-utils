import { CSSProperties, ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { MemoDataProvider } from "../MemoDataProvider/MemoDataProvider";

interface InViewContextProviderProps {
  contextName: string;
  className?: string;
  style?: CSSProperties;

  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  initialInView?: boolean;
  fallbackInView?: boolean;
  onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;

  children: ReactNode;
}

export function InViewContextProvider({
  contextName,
  className,
  style,
  root,
  rootMargin,
  threshold,
  triggerOnce,
  initialInView,
  fallbackInView,
  onChange,
  children,
}: InViewContextProviderProps) {
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
      <MemoDataProvider name={contextName} data={inView} deps={[inView]}>
        {children}
      </MemoDataProvider>
    </div>
  );
}
