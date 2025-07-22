"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useMobile()

  // Simplified animations for mobile
  const animationProps = isMobile
    ? {
        initial: { opacity: 0, y: 10 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
        transition: {
          duration: 0.4,
          delay: delay,
          ease: "easeOut",
        },
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        transition: {
          duration: 0.6,
          delay: delay,
          ease: "easeOut",
        },
      }

  return (
    <motion.div ref={ref} {...animationProps} className={`relative ${className}`}>
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
          className="absolute inset-0 -z-10 rounded-md opacity-0 group-hover:opacity-10"
        />
      )}
      {children}
    </motion.div>
  )
}

export function AnimatedTitle({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useMobile()

  const animationProps = isMobile
    ? {
        initial: { opacity: 0, y: 10 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        transition: {
          duration: 0.7,
          ease: "easeOut",
        },
      }

  return (
    <motion.div ref={ref} {...animationProps} className={className}>
      {children}
    </motion.div>
  )
}

export function AnimatedList({
  children,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode[]
  staggerDelay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useMobile()

  // Reduce stagger delay on mobile
  const delay = isMobile ? staggerDelay * 0.5 : staggerDelay

  return (
    <motion.div ref={ref}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 10 : 20 }}
          transition={{
            duration: isMobile ? 0.3 : 0.5,
            delay: index * delay,
            ease: "easeOut",
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
