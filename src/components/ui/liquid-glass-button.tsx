"use client"

import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface LiquidButtonProps {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
}

export function LiquidButton({
  href,
  children,
  className,
  external = false,
}: LiquidButtonProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      whileHover={{
        scale: 1.018,
      }}
      whileTap={{
        scale: 0.975,
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 24,
      }}
      className={cn(
        `
          group relative isolate
          inline-flex min-h-13
          items-center justify-center
          gap-2.5 overflow-hidden
          rounded-full
          border border-white/20
          bg-white/[0.095]
          px-6 py-3
          text-[12px] font-medium
          text-white
          shadow-[0_16px_60px_rgba(0,0,0,0.28)]
          backdrop-blur-2xl
        `,
        className
      )}
    >
      {/* Liquid color layer */}
      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -inset-[80%]
          -z-20 rounded-[42%]
          bg-[conic-gradient(from_90deg,rgba(57,189,248,0.55),rgba(139,92,246,0.52),rgba(246,201,107,0.42),rgba(57,189,248,0.55))]
          blur-xl
        "
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glass surface */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-px
          -z-10 rounded-full
          bg-black/45
          backdrop-blur-2xl
        "
      />

      {/* Top reflection */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-6 top-px
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/70
          to-transparent
        "
      />

      {/* Hover light */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-16 top-0
          h-full w-14 -skew-x-12
          bg-gradient-to-r
          from-transparent
          via-white/15
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-[320px]
        "
      />

      <span className="relative">
        {children}
      </span>

      <ArrowUpRight
        className="
          relative size-3.5
          transition-transform
          duration-300
          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5
        "
        strokeWidth={1.8}
      />
    </motion.a>
  )
}