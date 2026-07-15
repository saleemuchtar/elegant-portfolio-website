"use client"

import { useState } from "react"
import type {
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

export function SpotlightCard({
  children,
  className,
}: SpotlightCardProps) {
  const pointerX = useMotionValue(-200)
  const pointerY = useMotionValue(-200)

  const smoothX = useSpring(pointerX, {
    stiffness: 280,
    damping: 32,
    mass: 0.45,
  })

  const smoothY = useSpring(pointerY, {
    stiffness: 280,
    damping: 32,
    mass: 0.45,
  })

  const [isSpotlightVisible, setIsSpotlightVisible] =
    useState(false)

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      360px circle at ${smoothX}px ${smoothY}px,
      rgba(255, 255, 255, 0.92),
      rgba(255, 255, 255, 0.32) 32%,
      transparent 68%
    )
  `

  const updateSpotlight = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const bounds =
      event.currentTarget.getBoundingClientRect()

    pointerX.set(event.clientX - bounds.left)
    pointerY.set(event.clientY - bounds.top)
  }

  const handlePointerEnter = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    setIsSpotlightVisible(true)
    updateSpotlight(event)
  }

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    setIsSpotlightVisible(true)
    updateSpotlight(event)
  }

  const handlePointerLeave = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    // Pada mobile, spotlight tetap terlihat di posisi
    // sentuhan terakhir. Pada desktop, spotlight menghilang.
    if (event.pointerType === "mouse") {
      setIsSpotlightVisible(false)
    }
  }

  return (
    <div
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "group relative isolate overflow-hidden touch-pan-y",
        className
      )}
    >
      <motion.div
        aria-hidden="true"
        style={{
          background: spotlightBackground,
        }}
        animate={{
          opacity: isSpotlightVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className="
          pointer-events-none absolute inset-0
          z-0 mix-blend-screen
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          z-[1] opacity-0 transition-opacity
          duration-500 group-hover:opacity-100
          bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_45%)]
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}