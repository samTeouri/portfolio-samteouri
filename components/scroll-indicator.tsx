"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        className="p-2 rounded-full bg-cyan-950/20 glass-dark glow-cyan-sm"
      >
        <ChevronDown className="h-6 w-6 text-cyan-600" />
      </motion.div>
    </motion.div>
  )
}
