import { Languages } from "lucide-react"

import { useLanguage } from "@/lib/language"
import { cn } from "@/lib/utils"

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center gap-0.5 rounded-full bg-white/[0.035] p-0.5",
        className
      )}
      role="group"
      aria-label={language === "id" ? "Pilih bahasa" : "Choose language"}
    >
      <Languages
        className="mx-1 hidden size-3.5 text-white/35 md:block"
        strokeWidth={1.8}
        aria-hidden="true"
      />

      {(["id", "en"] as const).map((option) => {
        const isActive = language === option

        return (
          <button
            key={option}
            type="button"
            onClick={() => setLanguage(option)}
            aria-pressed={isActive}
            aria-label={
              option === "id" ? "Gunakan Bahasa Indonesia" : "Use English"
            }
            className={cn(
              "flex h-8 min-w-7 items-center justify-center rounded-full px-1.5",
              "text-[9px] font-semibold tracking-[0.06em] uppercase",
              "transition-all duration-300 sm:min-w-8 sm:px-2",
              isActive
                ? "bg-[#f6c96b]/[0.12] text-[#f6c96b] ring-1 ring-[#f6c96b]/20 ring-inset"
                : "text-white/35 hover:bg-white/[0.06] hover:text-white/75"
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
