"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Deep background layer */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, #300 0%, #000 70%)",
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />

      {/* Middle layer - grid */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Floating elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-red-600/10 blur-[80px]"
          style={{
            width: `${Math.random() * 200 + 50}px`,
            height: `${Math.random() * 200 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 200}%`,
            opacity: 0.05 + Math.random() * 0.1,
            transform: `translateY(${scrollY * (0.05 + Math.random() * 0.1)}px)`,
          }}
        />
      ))}
    </div>
  )
}
