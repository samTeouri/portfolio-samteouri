"use client";
import { motion } from "framer-motion";
import React from "react";

interface AnimatedListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const directionVariants = {
  up: { y: 20, opacity: 0 },
  down: { y: -20, opacity: 0 },
  left: { x: 20, opacity: 0 },
  right: { x: -20, opacity: 0 },
} as const;

export function AnimatedList({
  children,
  delay = 0.08,
  direction = "up",
  className = "",
  ...props
}: AnimatedListProps) {
  const items = React.Children.toArray(children);
  
  return (
    <div className={className} {...props}>
      {items.map((child, i) => (
        <motion.div
          key={i}
          initial={directionVariants[direction]}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{
            duration: 0.48,
            delay: i * delay,
            ease: "easeOut",
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
