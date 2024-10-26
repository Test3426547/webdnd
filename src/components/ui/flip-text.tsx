"use client";

import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface SlightFlipProps {
  word: string | React.ReactNode;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

export default function SlightFlip({
  word,
  duration = 0.5,
  delayMultiple = 0.08,
  framerProps = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  },
  className,
}: SlightFlipProps) {
  return (
    <span className={cn("inline-block", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={framerProps}
          transition={{ duration }}
          className="inline-block origin-center"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
