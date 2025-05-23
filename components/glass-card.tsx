import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  glowEffect?: boolean
  hoverEffect?: boolean
}

export function GlassCard({ children, className, glowEffect = false, hoverEffect = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-lg p-4 sm:p-6 transition-all duration-300",
        glowEffect && "glow-red-sm",
        hoverEffect && "hover:glow-red hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  )
}
