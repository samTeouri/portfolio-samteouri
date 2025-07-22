"use client"

import { useMobile } from "@/hooks/use-mobile"

export function SimpleBackgroundObjects() {
  const isMobile = useMobile()

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
      {/* Large floating shapes */}
      <div className="absolute top-10 left-10 w-16 h-16 border-2 border-cyan-500/30 bg-cyan-950/10 animate-float-slow transform rotate-45 rounded-lg"></div>
      <div className="absolute top-20 right-20 w-12 h-12 border border-cyan-400/20 bg-cyan-900/10 animate-float-medium transform rotate-12 rounded-full"></div>
      <div className="absolute bottom-32 left-32 w-20 h-20 border border-cyan-600/25 bg-cyan-800/10 animate-float-fast transform -rotate-30"></div>

      {/* Code symbols */}
      <div className="absolute top-1/2 left-1/6 text-cyan-500/30 text-6xl animate-float-slow font-mono select-none">
        {"{"}
      </div>
      <div className="absolute top-1/2 right-1/6 text-cyan-500/30 text-6xl animate-float-medium font-mono select-none">
        {"}"}
      </div>
      <div className="absolute bottom-1/4 left-1/2 text-cyan-400/25 text-4xl animate-float-fast font-mono select-none">
        {"<>"}
      </div>
      <div className="absolute top-1/4 right-1/3 text-cyan-300/20 text-5xl animate-float-slow font-mono select-none">
        {"[]"}
      </div>

      {/* Geometric lines */}
      <div className="absolute top-3/4 right-1/3 w-24 h-1 bg-cyan-500/20 animate-float-slow transform rotate-45"></div>
      <div className="absolute top-1/6 left-2/3 w-1 h-24 bg-cyan-400/25 animate-float-medium transform -rotate-12"></div>
      <div className="absolute bottom-1/3 right-1/4 w-16 h-1 bg-cyan-600/15 animate-float-fast transform rotate-90"></div>

      {/* Circles and dots */}
      <div className="absolute bottom-1/2 right-1/4 w-12 h-12 border-2 border-cyan-500/25 rounded-full animate-spin-slow"></div>
      <div className="absolute top-2/3 left-1/5 w-8 h-8 border border-cyan-400/20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 left-3/4 w-6 h-6 bg-cyan-500/15 rounded-full animate-bounce"></div>

      {/* HTML/CSS symbols */}
      <div className="absolute bottom-1/4 right-1/5 text-cyan-400/20 text-3xl animate-float-medium font-mono select-none">
        {"()"}
      </div>
      <div className="absolute top-1/5 left-1/4 text-cyan-500/25 text-4xl animate-float-slow font-mono select-none">
        {"=>"}
      </div>

      {!isMobile && (
        <>
          {/* Additional objects for desktop */}
          <div className="absolute top-1/5 right-1/2 w-8 h-8 bg-cyan-600/20 animate-bounce transform rotate-45 rounded"></div>
          <div className="absolute bottom-1/5 left-3/4 text-cyan-500/20 text-3xl animate-float-slow font-mono select-none">
            {"//"}
          </div>
          <div className="absolute top-3/5 right-1/5 w-10 h-10 border border-cyan-400/25 bg-cyan-950/10 animate-float-medium transform rotate-90 rounded-lg"></div>
          <div className="absolute bottom-2/3 left-1/2 w-2 h-16 bg-cyan-500/20 animate-float-fast transform -rotate-45"></div>

          {/* More code symbols */}
          <div className="absolute top-1/6 right-2/3 text-cyan-300/15 text-2xl animate-float-medium font-mono select-none">
            {"&&"}
          </div>
          <div className="absolute bottom-1/6 right-3/4 text-cyan-400/20 text-3xl animate-float-slow font-mono select-none">
            {"||"}
          </div>
          <div className="absolute top-4/5 left-1/6 text-cyan-500/25 text-2xl animate-float-fast font-mono select-none">
            {"!=="}
          </div>

          {/* Additional geometric shapes */}
          <div className="absolute top-2/5 left-1/8 w-6 h-6 border-2 border-cyan-500/20 transform rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-3/5 right-1/8 w-14 h-2 bg-cyan-400/15 transform -rotate-30 animate-float-medium"></div>
          <div className="absolute top-3/4 left-3/4 w-4 h-4 bg-cyan-600/25 rounded-full animate-ping"></div>
        </>
      )}

      {/* Floating particles */}
      <div className="absolute top-1/8 left-1/8 w-1 h-1 bg-cyan-400/40 rounded-full animate-float-slow"></div>
      <div className="absolute top-7/8 right-1/8 w-1 h-1 bg-cyan-500/30 rounded-full animate-float-medium"></div>
      <div className="absolute top-3/8 right-3/8 w-1 h-1 bg-cyan-300/35 rounded-full animate-float-fast"></div>
      <div className="absolute bottom-1/8 left-5/8 w-1 h-1 bg-cyan-600/25 rounded-full animate-bounce"></div>
    </div>
  )
}
