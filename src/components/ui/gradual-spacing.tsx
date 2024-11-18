"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  className?: string;
}

export function GradualSpacingParagraph({
  text,
  duration = 0.3,
  delayMultiple = 0.015,
  className,
}: GradualSpacingProps) {
  // Split the entire text into words, maintaining the original structure
  const words = text.split(' ');

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap">
        <AnimatePresence mode="wait">
          {words.map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, x: -5 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration,
                delay: wordIndex * delayMultiple,
              }}
              className="mr-1 inline-block"
            >
              {word}
              {text.includes(word + '.') ? '.' : ''}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
