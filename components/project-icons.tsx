"use client"

import { Globe, Database, BarChart3, Brain } from "lucide-react"

interface ProjectIconProps {
  type: string
  className?: string
}

export function ProjectIcon({ type, className = "h-16 w-16" }: ProjectIconProps) {
  const getIcon = () => {
    switch (type) {
      case "Web App":
        return <Globe className={`${className} text-cyan-500`} />
      case "API":
        return <Database className={`${className} text-cyan-500`} />
      case "Simulation":
        return <BarChart3 className={`${className} text-cyan-500`} />
      case "AI/Game":
        return <Brain className={`${className} text-cyan-500`} />
      default:
        return <Globe className={`${className} text-cyan-500`} />
    }
  }

  return (
    <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-cyan-950/20 to-black/50 rounded-lg">
      {getIcon()}
    </div>
  )
}
