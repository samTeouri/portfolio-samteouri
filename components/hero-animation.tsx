"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export function HeroAnimation() {
  const isMobile = useMobile()

  // Simplified animations for mobile
  const mobileAnimationProps = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.4, 0.3],
    },
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
    },
  }

  const desktopAnimationProps = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    },
    transition: {
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
    },
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-cyan-700/10 blur-[100px]"
        {...(isMobile ? mobileAnimationProps : desktopAnimationProps)}
      />
      <motion.div
        className="absolute -bottom-[10%] -left-[10%] h-[400px] w-[400px] rounded-full bg-cyan-700/10 blur-[100px]"
        animate={{
          scale: [1, isMobile ? 1.1 : 1.3, 1],
          opacity: [0.2, isMobile ? 0.3 : 0.4, 0.2],
        }}
        transition={{
          duration: isMobile ? 8 : 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      {/* Reduced additional elements on mobile */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-[30%] left-[20%] h-[200px] w-[200px] rounded-full bg-cyan-600/5 blur-[80px]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 2,
            }}
          />

          <motion.div
            className="absolute bottom-[20%] right-[30%] h-[150px] w-[150px] rounded-full bg-cyan-600/5 blur-[60px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 3,
            }}
          />
        </>
      )}

      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=50&width=50')] bg-[length:50px_50px] opacity-[0.03]"></div>
    </div>
  )
}
