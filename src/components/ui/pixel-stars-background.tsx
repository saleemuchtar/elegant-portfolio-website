"use client"

import { useEffect, useRef } from "react"

interface PixelStar {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  phase: number
  isLight: boolean
}

interface PixelStarsBackgroundProps {
  density?: number
}

export function PixelStarsBackground({
  density = 0.00016,
}: PixelStarsBackgroundProps) {
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

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    let width = 0
    let height = 0
    let stars: PixelStar[] = []
    let animationFrameId = 0

    const createStars = () => {
      const starCount = Math.min(
        320,
        Math.max(70, Math.floor(width * height * density))
      )

      stars = Array.from(
        {
          length: starCount,
        },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() > 0.88 ? 2 : 1,
          opacity: 0.12 + Math.random() * 0.42,
          speed: 0.00035 + Math.random() * 0.001,
          phase: Math.random() * Math.PI * 2,
          isLight: Math.random() > 0.78,
        })
      )
    }

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(
        window.devicePixelRatio,
        2
      )

      width = bounds.width
      height = bounds.height

      canvas.width = Math.max(
        1,
        Math.floor(width * pixelRatio)
      )

      canvas.height = Math.max(
        1,
        Math.floor(height * pixelRatio)
      )

      context.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
      )

      createStars()
    }

    const drawStars = (time: number) => {
      context.clearRect(0, 0, width, height)

      stars.forEach((star) => {
        const twinkle = reducedMotion
          ? 1
          : 0.58 +
            Math.sin(time * star.speed + star.phase) * 0.42

        const alpha = Math.max(
          0.04,
          star.opacity * twinkle
        )

        context.fillStyle = star.isLight
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(28, 30, 35, ${alpha})`

        context.fillRect(
          Math.round(star.x),
          Math.round(star.y),
          star.size,
          star.size
        )
      })
    }

    const animate = (time: number) => {
      drawStars(time)

      animationFrameId =
        window.requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(
      resizeCanvas
    )

    resizeObserver.observe(canvas)
    resizeCanvas()

    if (reducedMotion) {
      drawStars(performance.now())
    } else {
      animationFrameId =
        window.requestAnimationFrame(animate)
    }

    return () => {
      resizeObserver.disconnect()

      window.cancelAnimationFrame(
        animationFrameId
      )
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="
        pointer-events-none absolute inset-0
        h-full w-full
      "
    />
  )
}