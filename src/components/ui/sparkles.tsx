"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface Sparkle {
  x: number
  y: number
  size: number
  baseOpacity: number
  speed: number
  phase: number
  driftX: number
  driftY: number
}

interface SparklesCoreProps {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  particleColor?: string
  speed?: number
  className?: string
}

export function SparklesCore({
  id,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.2,
  particleDensity = 55,
  particleColor = "#ffffff",
  speed = 0.35,
  className,
}: SparklesCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const context = canvas.getContext("2d")

    if (!context) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    let width = 0
    let height = 0
    let animationFrameId = 0
    let sparkles: Sparkle[] = []

    const createSparkles = () => {
      const area = width * height

      // Density tetap terkontrol pada section yang panjang.
      const calculatedCount = Math.floor(
        (area / 1000000) * particleDensity
      )

      const sparkleCount = Math.max(
        35,
        Math.min(calculatedCount, 180)
      )

      sparkles = Array.from(
        {
          length: sparkleCount,
        },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          size:
            minSize +
            Math.random() * Math.max(maxSize - minSize, 0),
          baseOpacity: 0.15 + Math.random() * 0.65,
          speed:
            (0.00045 + Math.random() * 0.0011) *
            Math.max(speed, 0.1),
          phase: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.035 * speed,
          driftY: (Math.random() - 0.5) * 0.025 * speed,
        })
      )
    }

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2
      )

      width = Math.max(bounds.width, 1)
      height = Math.max(bounds.height, 1)

      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)

      context.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
      )

      createSparkles()
    }

    const drawSparkle = (
      sparkle: Sparkle,
      time: number
    ) => {
      const twinkle =
        0.55 +
        Math.sin(
          time * sparkle.speed + sparkle.phase
        ) *
          0.45

      const opacity = Math.max(
        0.04,
        sparkle.baseOpacity * twinkle
      )

      context.globalAlpha = opacity
      context.fillStyle = particleColor

      // Inti bintang
      context.fillRect(
        Math.round(sparkle.x),
        Math.round(sparkle.y),
        sparkle.size,
        sparkle.size
      )

      // Glow kecil hanya untuk sebagian bintang.
      if (sparkle.size > maxSize * 0.72) {
        context.globalAlpha = opacity * 0.25

        context.fillRect(
          Math.round(sparkle.x - sparkle.size),
          Math.round(sparkle.y),
          sparkle.size * 3,
          Math.max(0.45, sparkle.size * 0.35)
        )

        context.fillRect(
          Math.round(sparkle.x),
          Math.round(sparkle.y - sparkle.size),
          Math.max(0.45, sparkle.size * 0.35),
          sparkle.size * 3
        )
      }

      context.globalAlpha = 1
    }

    const updateSparkles = () => {
      sparkles.forEach((sparkle) => {
        sparkle.x += sparkle.driftX
        sparkle.y += sparkle.driftY

        if (sparkle.x < -4) {
          sparkle.x = width + 4
        } else if (sparkle.x > width + 4) {
          sparkle.x = -4
        }

        if (sparkle.y < -4) {
          sparkle.y = height + 4
        } else if (sparkle.y > height + 4) {
          sparkle.y = -4
        }
      })
    }

    const render = (time: number) => {
      context.clearRect(0, 0, width, height)

      if (background !== "transparent") {
        context.fillStyle = background
        context.fillRect(0, 0, width, height)
      }

      sparkles.forEach((sparkle) => {
        drawSparkle(sparkle, time)
      })

      if (!prefersReducedMotion) {
        updateSparkles()

        animationFrameId =
          window.requestAnimationFrame(render)
      }
    }

    const resizeObserver = new ResizeObserver(
      resizeCanvas
    )

    resizeObserver.observe(canvas)
    resizeCanvas()

    if (prefersReducedMotion) {
      render(performance.now())
    } else {
      animationFrameId =
        window.requestAnimationFrame(render)
    }

    return () => {
      resizeObserver.disconnect()
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [
    background,
    maxSize,
    minSize,
    particleColor,
    particleDensity,
    speed,
  ])

  return (
    <canvas
      ref={canvasRef}
      id={id}
      aria-hidden="true"
      className={cn(
        "block h-full w-full",
        className
      )}
    />
  )
}