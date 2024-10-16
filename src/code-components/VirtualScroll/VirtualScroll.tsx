import { ReactNode, useState } from "react";
import styles from "./VirtualScroll.module.css";

interface VirtualScrollProviderProps {
  listHeight: number;
  itemHeight: number;
  numberOfItems: number;
  overscan: number;
  children: ReactNode[];
}

export default function VirtualScrollProvider({
  numberOfItems,
  itemHeight,
  listHeight,
  overscan,
  children,
}: VirtualScrollProviderProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  let renderedNodesCount = Math.floor(listHeight / itemHeight) + 2 * overscan;
  renderedNodesCount = Math.min(numberOfItems - startIndex, renderedNodesCount);

  const generateRows = () => {
    let items: JSX.Element[] = [];
    for (let i = 0; i < renderedNodesCount; i++) {
      const index = i + startIndex;
      items.push(
        <div
          style={{
            height: `${itemHeight}px`,
          }}
          className={styles.listItem}
        >
          {children[index]}
        </div>,
      );
    }

    return items;
  };

  return (
    <div
      className={styles.virtualList}
      style={{ height: `${listHeight}px` }}
      onScroll={(e) => {
        setScrollTop(e.currentTarget.scrollTop);
      }}
    >
      <div
        style={{
          height: `${numberOfItems * itemHeight}px`,
        }}
      >
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
          }}
        >
          {generateRows()}
        </div>
      </div>
    </div>
  );
}
