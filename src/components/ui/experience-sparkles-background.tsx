"use client"

import { SparklesCore } from "@/components/ui/sparkles"

export function ExperienceSparklesBackground() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0 z-0
        overflow-hidden
      "
    >
      {/* Warna dasar */}
      <div className="absolute inset-0 bg-[#2b2e34]" />

      {/* Sparkles putih utama */}
      <div className="absolute inset-0 opacity-90">
        <SparklesCore
          id="experience-sparkles-white"
          background="transparent"
          minSize={0.65}
          maxSize={1.65}
          particleDensity={125}
          className="h-full w-full"
          particleColor="#FFFFFF"
          speed={0.45}
        />
      </div>

      {/* Sparkles warm sebagai aksen */}
      <div className="absolute inset-0 opacity-70">
        <SparklesCore
          id="experience-sparkles-warm"
          background="transparent"
          minSize={0.55}
          maxSize={1.25}
          particleDensity={34}
          className="h-full w-full"
          particleColor="#F6C96B"
          speed={0.3}
        />
      </div>

      {/* Cahaya utama */}
      <div
        aria-hidden="true"
        className="
          absolute left-1/2 top-32
          h-[360px] w-[min(820px,92vw)]
          -translate-x-1/2
          rounded-full
          bg-white/[0.025]
          blur-[130px]
        "
      />

      {/* Cahaya warm bagian atas */}
      <div
        className="
          absolute left-1/2 top-28
          h-[180px] w-[min(620px,76vw)]
          -translate-x-1/2
          rounded-full
          bg-[#f6c96b]/[0.07]
          blur-[90px]
        "
      />


      {/* Vignette tipis agar bagian tengah tetap terang */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_50%_38%,transparent_5%,rgba(43,46,52,0.12)_52%,rgba(43,46,52,0.72)_100%)]
        "
      />

      {/* Transisi dari Project */}

      {/* Transisi menuju page gelap berikutnya */}
      <div
        className="
          absolute inset-x-0 bottom-0
          h-52
          bg-gradient-to-t
          from-[#111214]
          via-[#202329]/65
          to-transparent
        "
      />

      {/* Grain digital */}
      <div
        className="
          absolute inset-0
          opacity-[0.055]
          [background-image:radial-gradient(rgba(255,255,255,0.85)_0.6px,transparent_0.6px)]
          [background-size:7px_7px]
        "
      />
    </div>
  )
}