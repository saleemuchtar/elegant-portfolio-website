"use client"

import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  motion,
  useReducedMotion,
} from "motion/react"

import { cn } from "@/lib/utils"

interface WarpBackgroundProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  perspective?: number
  beamsPerSide?: number
  beamSize?: number
  beamDelayMax?: number
  beamDelayMin?: number
  beamDuration?: number
  gridColor?: string
}

interface BeamData {
  x: number
  delay: number
  duration: number
  aspectRatio: number
  color: string
}

interface BeamProps extends BeamData {
  width: number
  reducedMotion: boolean
}

const beamPalette = [
  "#248cff",
  "#38d9ff",
  "#7657ff",
  "#dc5cff",
  "#f6c96b",
  "#ffffff",
]

function Beam({
  width,
  x,
  delay,
  duration,
  aspectRatio,
  color,
  reducedMotion,
}: BeamProps) {
  const style = {
    "--beam-x": `${x}%`,
    "--beam-width": `${width}%`,
    "--beam-ratio": `${aspectRatio}`,
    "--beam-color": color,
    "--beam-glow": `${color}66`,
  } as CSSProperties

  return (
    <motion.div
      aria-hidden="true"
      style={style}
      className="
        absolute left-[var(--beam-x)] top-0
        [aspect-ratio:1/var(--beam-ratio)]
        [width:var(--beam-width)]
        [background:linear-gradient(to_top,var(--beam-color),transparent_78%)]
        [box-shadow:0_0_18px_var(--beam-glow)]
        will-change-transform
      "
      initial={
        reducedMotion
          ? false
          : {
              y: "100cqmax",
              x: "-50%",
              opacity: 0,
            }
      }
      animate={
        reducedMotion
          ? {
              y: "38cqmax",
              x: "-50%",
              opacity: 0.18,
            }
          : {
              y: "-100%",
              x: "-50%",
              opacity: [0, 0.82, 0.52, 0],
            }
      }
      transition={
        reducedMotion
          ? {
              duration: 0,
            }
          : {
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.12, 0.78, 1],
            }
      }
    />
  )
}

export function WarpBackground({
  children,
  perspective = 115,
  className,
  beamsPerSide = 4,
  beamSize = 7,
  beamDelayMax = 4,
  beamDelayMin = 0,
  beamDuration = 5.5,
  gridColor = "rgba(255,255,255,0.075)",
  ...props
}: WarpBackgroundProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px)"
    )

    const updateMobileState = () => {
      setIsMobile(mediaQuery.matches)
    }

    updateMobileState()

    mediaQuery.addEventListener(
      "change",
      updateMobileState
    )

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateMobileState
      )
    }
  }, [])

  const activeBeamCount = isMobile
    ? Math.min(beamsPerSide, 2)
    : beamsPerSide

  const activeBeamSize = isMobile
    ? Math.max(beamSize, 11)
    : beamSize

  const activePerspective = isMobile
    ? Math.min(perspective, 82)
    : perspective

  const generateBeams = useCallback(
    (sideOffset: number): BeamData[] => {
      const cellsPerSide = Math.max(
        1,
        Math.floor(100 / activeBeamSize)
      )

      const step =
        cellsPerSide / activeBeamCount

      return Array.from(
        {
          length: activeBeamCount,
        },
        (_, index) => {
          const seed =
            (
              index * 0.61803398875 +
              sideOffset * 0.217
            ) %
            1

          const cellPosition = Math.min(
            cellsPerSide - 1,
            Math.max(
              0,
              Math.floor(
                index * step +
                  seed *
                    Math.max(step * 0.68, 1)
              )
            )
          )

          const delay =
            beamDelayMin +
            seed *
              (beamDelayMax - beamDelayMin)

          return {
            x: cellPosition * activeBeamSize,
            delay,
            duration:
              beamDuration + seed * 1.2,
            aspectRatio:
              4 +
              ((index * 3 + sideOffset) % 7),
            color:
              beamPalette[
                (index + sideOffset) %
                  beamPalette.length
              ],
          }
        }
      )
    },
    [
      activeBeamCount,
      activeBeamSize,
      beamDelayMax,
      beamDelayMin,
      beamDuration,
    ]
  )

  const topBeams = useMemo(
    () => generateBeams(0),
    [generateBeams]
  )

  const rightBeams = useMemo(
    () => generateBeams(1),
    [generateBeams]
  )

  const bottomBeams = useMemo(
    () => generateBeams(2),
    [generateBeams]
  )

  const leftBeams = useMemo(
    () => generateBeams(3),
    [generateBeams]
  )

  const renderBeams = (
    beams: BeamData[],
    side: string
  ) =>
    beams.map((beam, index) => (
      <Beam
        key={`${side}-${index}`}
        {...beam}
        width={activeBeamSize}
        reducedMotion={Boolean(
          shouldReduceMotion
        )}
      />
    ))

  const warpStyle = {
    "--warp-perspective": `${activePerspective}px`,
    "--warp-grid-color": gridColor,
    "--warp-beam-size": `${activeBeamSize}%`,
  } as CSSProperties

  const planeClassName = `
    absolute
    [transform-style:preserve-3d]
    [background:linear-gradient(var(--warp-grid-color)_0_1px,transparent_1px_var(--warp-beam-size))_50%_-0.5px_/var(--warp-beam-size)_var(--warp-beam-size),linear-gradient(90deg,var(--warp-grid-color)_0_1px,transparent_1px_var(--warp-beam-size))_50%_50%_/var(--warp-beam-size)_var(--warp-beam-size)]
    [container-type:inline-size]
    [height:100cqmax]
  `

  return (
    <div
      className={cn(
        `
          relative isolate
          overflow-hidden
          bg-[#090a0f]
        `,
        className
      )}
      {...props}
    >
      {/* Warna dasar */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-0
          bg-[radial-gradient(circle_at_50%_35%,rgba(36,140,255,0.12),transparent_34%),radial-gradient(circle_at_78%_20%,rgba(118,87,255,0.09),transparent_28%),radial-gradient(circle_at_24%_72%,rgba(220,92,255,0.055),transparent_32%),linear-gradient(180deg,#0b0c12_0%,#11131a_48%,#090a0f_100%)]
        "
      />

      {/* Warp tunnel */}
      <div
        aria-hidden="true"
        style={warpStyle}
        className="
          pointer-events-none
          absolute inset-0 z-0
          overflow-hidden
          opacity-80
          [clip-path:inset(0)]
          [container-type:size]
          [perspective:var(--warp-perspective)]
          [transform-style:preserve-3d]
          sm:opacity-90
        "
      >
        {/* Atas */}
        <div
          className={cn(
            planeClassName,
            `
              left-0 top-0
              w-[100cqi]
              origin-[50%_0%]
              [transform:rotateX(-90deg)]
            `
          )}
        >
          {renderBeams(topBeams, "top")}
        </div>

        {/* Bawah */}
        <div
          className={cn(
            planeClassName,
            `
              left-0 top-full
              w-[100cqi]
              origin-[50%_0%]
              [transform:rotateX(-90deg)]
            `
          )}
        >
          {renderBeams(
            bottomBeams,
            "bottom"
          )}
        </div>

        {/* Kiri */}
        <div
          className={cn(
            planeClassName,
            `
              left-0 top-0
              w-[100cqh]
              origin-[0%_0%]
              [transform:rotate(90deg)_rotateX(-90deg)]
            `
          )}
        >
          {renderBeams(leftBeams, "left")}
        </div>

        {/* Kanan */}
        <div
          className={cn(
            planeClassName,
            `
              right-0 top-0
              w-[100cqh]
              origin-[100%_0%]
              [transform:rotate(-90deg)_rotateX(-90deg)]
            `
          )}
        >
          {renderBeams(
            rightBeams,
            "right"
          )}
        </div>
      </div>

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-[1]
          bg-[radial-gradient(ellipse_at_50%_46%,transparent_0%,rgba(9,10,15,0.18)_50%,rgba(4,5,8,0.88)_100%)]
        "
      />

      {/* Grain */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-[1]
          opacity-[0.035]
          [background-image:radial-gradient(rgba(255,255,255,0.8)_0.55px,transparent_0.55px)]
          [background-size:7px_7px]
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}