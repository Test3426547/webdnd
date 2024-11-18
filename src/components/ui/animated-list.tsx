"use client";

import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  maxItems?: number;
}

export const AnimatedList = React.memo(
  ({ className, children, delay = 1000, maxItems = 3 }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
      }, delay);

      return () => clearInterval(interval);
    }, [childrenArray.length, delay]);

    const itemsToShow = useMemo(() => {
      const endIndex = index + 1;
      const startIndex = Math.max(0, endIndex - maxItems);
      return childrenArray.slice(startIndex, endIndex).reverse();
    }, [index, childrenArray, maxItems]);

    return (
      <div 
        className={`flex flex-col items-center gap-4 ${className}`}
        style={{ 
          height: `${maxItems * 84}px`,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {itemsToShow.map((item, i) => (
            <AnimatedListItem 
              key={(item as ReactElement).key || i}
              custom={i}
            >
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);

AnimatedList.displayName = "AnimatedList";

interface AnimatedListItemProps {
  children: React.ReactNode;
  custom: number;
}

export function AnimatedListItem({ children, custom }: AnimatedListItemProps) {
  const animations = {
    initial: { 
      opacity: 0,
      y: 50,
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 40,
      }
    },
    exit: { 
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.2,
      }
    },
  };

  return (
    <motion.div 
      {...animations}
      layout
      className="mx-auto w-full absolute"
      style={{
        top: `${custom * 84}px`,
      }}
    >
      {children}
    </motion.div>
  );
}
