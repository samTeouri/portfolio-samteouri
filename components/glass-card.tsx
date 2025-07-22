import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  glowEffect?: boolean
  hoverEffect?: boolean
  dynamicGlow?: boolean
  glowIntensity?: number
}

export function GlassCard({ 
  children, 
  className, 
  glowEffect = true, 
  hoverEffect = true, 
  dynamicGlow = true,
  glowIntensity = 0.7,
  ...props 
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dynamicGlow || !cardRef.current) return

    const card = cardRef.current
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return
      
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI)
      const distance = Math.min(
        Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) / 50,
        1
      )
      
      const intensity = glowIntensity * (1 - distance * 0.5)
      
      card.style.setProperty('--glow-opacity', intensity.toString())
      card.style.setProperty('--glow-angle', `${angle}deg`)
    }

    if (hoverEffect) {
      card.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (hoverEffect) {
        card.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [dynamicGlow, hoverEffect, glowIntensity])

  return (
    <div
      ref={cardRef}
      className={cn(
        "glass-card group relative rounded-lg p-4 sm:p-6 transition-all duration-300 overflow-hidden",
        glowEffect && "glow-cyan",
        hoverEffect && "hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
      style={{
        '--glow-opacity': '0',
        '--glow-angle': '0deg',
        '--glow-intensity': glowIntensity,
      } as React.CSSProperties}
      {...props}
    >
      {children}
      
      {/* Effet de lueur dynamique supplémentaire */}
      {dynamicGlow && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(
              circle at var(--glow-x, 50%) var(--glow-y, 50%),
              rgba(0, 255, 255, calc(0.15 * var(--glow-intensity, 0.7))) 0%,
              transparent 70%
            )`,
            transform: 'translate(calc(-50% + var(--glow-offset-x, 0px)), calc(-50% + var(--glow-offset-y, 0px)))',
          }}
        />
      )}
    </div>
  )
}
