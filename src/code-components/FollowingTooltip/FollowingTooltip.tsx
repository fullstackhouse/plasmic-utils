import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./FollowingTooltip.module.css";

interface TooltipCursorProps {
  content: string;
  children: React.ReactNode;
  delay: number;
  className?: string;
  contentClassName?: string;
}

export const FollowingTooltip = ({
  content,
  children,
  delay,
  className,
  contentClassName,
}: TooltipCursorProps) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltipContent, setShowTooltipContent] = useState(false);

  const tooltipRef = useRef<HTMLDivElement>(document.createElement("div"));

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;

    const tooltipWidth = tooltipRef.current?.offsetWidth || 0;
    const tooltipHeight = tooltipRef.current?.offsetHeight || 0;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let tooltipX = clientX + 12;
    let tooltipY = clientY + 30;

    if (tooltipX + tooltipWidth > viewportWidth) {
      tooltipX = clientX - tooltipWidth - 10;
    }

    if (tooltipY + tooltipHeight > viewportHeight) {
      tooltipY = viewportHeight - tooltipHeight - 10;
    }

    setTooltipPosition({ x: tooltipX, y: tooltipY });
  };

  const handleMouseEnter = () => {
    setTooltipVisible(true);
    setShowTooltipContent(false);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isTooltipVisible) {
      timeoutId = setTimeout(() => {
        setShowTooltipContent(true);
      }, delay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isTooltipVisible, delay]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={[styles.container, className].join(" ")}
    >
      {isTooltipVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={[styles.tooltip, contentClassName].join(" ")}
            style={{
              top: tooltipPosition.y,
              left: tooltipPosition.x,
              zIndex: "2147483647",
              opacity: showTooltipContent ? 1 : 0,
            }}
          >
            {content}
          </div>,
          document.body,
        )}
      {children}
    </div>
  );
};
