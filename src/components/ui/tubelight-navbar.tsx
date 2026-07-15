"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import type { LucideIcon } from "lucide-react"

import { LanguageSwitcher } from "@/components/language-switcher"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  ariaLabel?: string
}

export function NavBar({
  items,
  className,
  ariaLabel = "Main navigation",
}: NavBarProps) {
  const [activeUrl, setActiveUrl] = useState(items[0]?.url ?? "")

  useEffect(() => {
    const synchronizeActiveTab = () => {
      const currentHash = window.location.hash

      const activeItem = items.find((item) => item.url === currentHash)

      if (activeItem) {
        setActiveUrl(activeItem.url)
      }
    }

    synchronizeActiveTab()

    window.addEventListener("hashchange", synchronizeActiveTab)

    return () => {
      window.removeEventListener("hashchange", synchronizeActiveTab)
    }
  }, [items])

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -16,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "pointer-events-auto fixed left-1/2 z-[200]",
        "bottom-5 -translate-x-1/2",
        "sm:top-5 sm:bottom-auto",
        className
      )}
    >
      <nav
        aria-label={ariaLabel}
        className={cn(
          "isolate flex max-w-[calc(100vw-1rem)] items-center gap-0.5 rounded-full",
          "border border-white/15 bg-black/70 p-1 sm:gap-1 sm:p-1.5",
          "shadow-[0_18px_60px_rgba(0,0,0,0.45)]",
          "backdrop-blur-2xl"
        )}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeUrl === item.url

          return (
            <a
              key={item.name}
              href={item.url}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                setActiveUrl(item.url)
              }}
              className={cn(
                "relative z-10 flex h-9 min-w-9",
                "cursor-pointer items-center justify-center",
                "rounded-full px-2 sm:h-10 sm:min-w-0 sm:px-5",
                "text-[12px] font-medium",
                "tracking-[-0.01em]",
                "text-white/60 transition-colors",
                "duration-300 hover:text-white",
                isActive && "text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="tubelight-active-tab"
                  className={cn(
                    "absolute inset-0 -z-10",
                    "rounded-full border border-white/10",
                    "bg-[#f6c96b]/[0.08]"
                  )}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 360,
                    damping: 32,
                  }}
                >
                  {/* Garis lampu utama */}
                  <div className="absolute -top-[7px] left-1/2 h-[2px] w-7 -translate-x-1/2 rounded-full bg-[#f6c96b] shadow-[0_0_8px_rgba(246,201,107,0.95),0_0_18px_rgba(246,201,107,0.55)]" />

                  {/* Cahaya luar */}
                  <div className="absolute -top-3 left-1/2 h-6 w-12 -translate-x-1/2 rounded-full bg-[#f6c96b]/25 blur-xl" />

                  {/* Cahaya inti */}
                  <div className="absolute -top-2 left-1/2 h-4 w-7 -translate-x-1/2 rounded-full bg-[#ffd98a]/25 blur-md" />
                </motion.div>
              )}

              <span className="relative z-10 hidden sm:inline">
                {item.name}
              </span>

              <span className="relative z-10 sm:hidden">
                <Icon size={17} strokeWidth={1.9} />
              </span>
            </a>
          )
        })}

        <div
          aria-hidden="true"
          className="mx-0.5 h-6 w-px shrink-0 bg-white/10 sm:mx-1"
        />

        <LanguageSwitcher />
      </nav>
    </motion.div>
  )
}
