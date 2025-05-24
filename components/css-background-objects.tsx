"use client"

import { useMobile } from "@/hooks/use-mobile"

export function CSSBackgroundObjects() {
  const isMobile = useMobile()

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
      {/* Floating Code Blocks */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 border border-cyan-500/20 bg-cyan-950/10 animate-float-slow transform rotate-45"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 border border-cyan-400/15 bg-cyan-900/10 animate-float-medium transform rotate-12"></div>
      <div className="absolute bottom-1/3 left-1/3 w-10 h-10 border border-cyan-600/25 bg-cyan-800/10 animate-float-fast transform -rotate-30"></div>

      {/* Bracket Shapes */}
      <div className="absolute top-1/2 left-1/6 text-cyan-500/20 text-4xl animate-float-slow font-mono">{"{"}</div>
      <div className="absolute top-1/2 right-1/6 text-cyan-500/20 text-4xl animate-float-medium font-mono">{"}"}</div>
      <div className="absolute bottom-1/4 left-1/2 text-cyan-400/15 text-3xl animate-float-fast font-mono">{"<>"}</div>

      {/* Geometric Shapes */}
      <div className="absolute top-3/4 right-1/3 w-12 h-2 bg-cyan-500/10 animate-float-slow transform rotate-45"></div>
      <div className="absolute top-1/6 left-2/3 w-2 h-12 bg-cyan-400/15 animate-float-medium transform -rotate-12"></div>

      {/* Circles representing loops */}
      <div className="absolute bottom-1/2 right-1/4 w-8 h-8 border-2 border-cyan-500/20 rounded-full animate-spin-slow"></div>
      <div className="absolute top-2/3 left-1/5 w-6 h-6 border border-cyan-400/15 rounded-full animate-pulse"></div>

      {!isMobile && (
        <>
          {/* Additional objects for desktop */}
          <div className="absolute top-1/5 right-1/2 w-4 h-4 bg-cyan-600/20 animate-bounce transform rotate-45"></div>
          <div className="absolute bottom-1/5 left-3/4 text-cyan-500/15 text-2xl animate-float-slow font-mono">
            {"[]"}
          </div>
          <div className="absolute top-3/5 right-1/5 w-6 h-6 border border-cyan-400/20 bg-cyan-950/5 animate-float-medium transform rotate-90"></div>
          <div className="absolute bottom-2/3 left-1/2 w-3 h-8 bg-cyan-500/15 animate-float-fast transform -rotate-45"></div>
        </>
      )}
    </div>
  )
}
