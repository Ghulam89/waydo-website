import { CSSObject } from '@emotion/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import classNames from 'classnames';
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import styles from "./scroll-navigation.module.css";

type Props = {
  skipOffset?: number;
  children: ReactNode;
  leftCustomContent?: ReactNode;
  rightCustomContent?: ReactNode;
  itemsGap?: number;
  customStyle?: CSSObject;
  minWidthPerItem: number;
}

export default function ScrollNavigation({
  children,
  skipOffset = 300,
  itemsGap = 18,
  minWidthPerItem = 258
}: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visibleItems, setVisibleItems] = useState(0);

  const checkScrollPosition = useCallback(() => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  }, []);

  const scroll = useCallback((scrollOffset: number) => {
    if (!navRef.current) return;
    navRef.current.scrollBy({
      top: 0,
      left: scrollOffset,
      behavior: 'smooth'
    });

    setScrollLeft(scrollLeft + scrollOffset);
  }, [scrollLeft]);

  const handleResize = (width: number) => {
    const aproxVisibleItems = Math.floor(width / minWidthPerItem);
    const gapsMargin = itemsGap * Math.max(aproxVisibleItems - 2, 1)
    const realvisibleItems = Math.floor(
      (width - gapsMargin) / minWidthPerItem
    );

    /**
     * TODO:
     * - DEBUG OVERLEFT AND OVERRIGHT
     */

    setVisibleItems(realvisibleItems);
  }

  const handleScrollLeft = () => {
    if (!canScrollLeft) return;
    scroll(-skipOffset);
    setTimeout(checkScrollPosition, skipOffset);
    setVisibleItems(visibleItems - 1);
  }

  const handleScrollRight = () => {
    if (!canScrollRight) return;
    scroll(skipOffset);
    setTimeout(checkScrollPosition, skipOffset);
    setVisibleItems(visibleItems + 1);
  }

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      handleResize(width);
    });

    navRef?.current && observer.observe(navRef.current);
    return () => observer.disconnect();
  }, [navRef]);

  return (
    <div className={styles.navigationWrapper}>
      <div className={styles.navigationLeft}>
        <button
          onClick={() => handleScrollLeft()}
          style={{ opacity: canScrollLeft ? 1 : 0.5 }}
          className={classNames(styles.scrollButton, styles.scrollButtonBack)}
        >
          <ArrowBackIosNewIcon />
        </button>
      </div>
      <div
        className={styles.navigationContent}
        style={{
          gap: itemsGap + "px"
        }}
        ref={navRef}
      >
        {!!(children as ReactNode[])?.length && (children as ReactNode[]).map((child, i) => (
          <div
            key={i}
            style={{
              minWidth: minWidthPerItem + 'px',
              width: minWidthPerItem + 'px',
              opacity: i === 0 || (i + 1) <= visibleItems ? 1 : 0
            }}
          >
            {child}
          </div>
        ))}
      </div>
      <div className={styles.navigationLeft}>
        <button
          onClick={() => handleScrollRight()}
          style={{ opacity: canScrollRight ? 1 : 0.5 }}
          className={styles.scrollButton}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
}