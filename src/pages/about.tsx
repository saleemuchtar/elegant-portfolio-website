import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Database,
  GraduationCap,
  MapPin,
  Search,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import type { Variants } from "motion/react"

import { useLanguage } from "@/lib/language"

const aboutCopy = {
  id: {
    label: "Tentang saya",
    title: "Saya membantu perusahaan menemukan masalah",
    titleAccent: "sebelum membangun sistem.",
    description:
      "saya menganalisis proses bisnis, mengolah data dan merancang solusi digital yang benar-benar dibutuhkan pengguna.",
    student: "Mahasiswa Sistem Informasi",
    location: "Kota Bekasi, Indonesia",
    birthYear: "Lahir pada tahun 2005",
    capabilities: [
      {
        icon: Search,
        title: "Memahami kebutuhan bisnis",
        description:
          "Mengidentifikasi hambatan agar solusi yang dibangun benar-benar menyelesaikan masalah.",
        result: "Mengurangi solusi yang salah",
      },
      {
        icon: Code2,
        title: "Membangun sistem yang mempermudah pekerjaan",
        description:
          "Merancang website, aplikasi, dan sistem informasi yang jelas serta mudah digunakan.",
        result: "Mengurangi pekerjaan lebih",
      },
      {
        icon: Database,
        title: "Mengolah data",
        description:
          "Mengubah data menjadi informasi, visualisasi, dan dasar pertimbangan untuk pengambilan keputusan.",
        result: "Keputusan lebih terarah",
      },
    ],
    closing:
      "Solusi yang baik dimulai dari pemahaman yang tepat, bukan dari teknologi yang paling rumit.",
    cta: "Lihat cara saya menyelesaikan masalah",
  },
  en: {
    label: "About me",
    title: "I help companies identify problems",
    titleAccent: "before building systems.",
    description:
      "I analyze business processes, work with data, and design digital solutions that users genuinely need.",
    student: "Information Systems Student",
    location: "Bekasi City, Indonesia",
    birthYear: "Born in 2005",
    capabilities: [
      {
        icon: Search,
        title: "Understanding business needs",
        description:
          "Identifying obstacles so the solution being built genuinely solves the problem.",
        result: "Reducing unsuitable solutions",
      },
      {
        icon: Code2,
        title: "Building systems that simplify work",
        description:
          "Designing websites, applications, and information systems that are clear and easy to use.",
        result: "Reducing unnecessary work",
      },
      {
        icon: Database,
        title: "Working with data",
        description:
          "Turning data into information, visualizations, and a basis for better decision-making.",
        result: "More focused decisions",
      },
    ],
    closing:
      "A good solution begins with the right understanding, not the most complicated technology.",
    cta: "See how I solve problems",
  },
} as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const copy = aboutCopy[language]

  return (
    <section
      id="tentang"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#111214] text-white"
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:60px_60px] opacity-60"
      />

      {/* Grid fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_20%,#111214_78%)]"
      />

      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-white/[0.045] blur-[130px]"
      />

      {/* Transition from Home */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black via-[#111214]/75 to-transparent"
      />

      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="relative z-10 mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10"
      >
        {/* Header dan bio */}
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <motion.div variants={itemVariants} className="max-w-3xl">
            <p className="text-[10px] font-medium tracking-[0.22em] text-white/35 uppercase">
              {copy.label}
            </p>

            <h2 className="mt-4 text-[2.2rem] leading-[1.08] font-medium tracking-[-0.045em] sm:text-[2.75rem] lg:text-[3.05rem]">
              {copy.title}

              <span className="bg-gradient-to-r from-white via-white/80 to-white/35 bg-clip-text text-transparent">
                {" "}
                {copy.titleAccent}
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-[14px] leading-7 text-white/45 sm:text-[15px]">
              {copy.description}
            </p>
          </motion.div>

          {/* Bio singkat */}
          <motion.div
            variants={itemVariants}
            className="min-w-[250px] rounded-2xl border border-white/[0.09] bg-black/20 p-5 backdrop-blur-xl"
          >
            <p className="text-[13px] font-medium text-white/85">
              Zanzibar Muchtar Nazmudin
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <GraduationCap
                  className="size-3.5 text-white/30"
                  strokeWidth={1.7}
                />

                <span className="text-[11px] text-white/45">
                  {copy.student}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="size-3.5 text-white/30" strokeWidth={1.7} />

                <span className="text-[11px] text-white/45">
                  {copy.location}
                </span>
              </div>

              <p className="border-t border-white/[0.08] pt-3 text-[10px] tracking-[0.15em] text-white/25 uppercase">
                {copy.birthYear}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Tiga kemampuan utama */}
        <motion.div
          variants={itemVariants}
          className="mt-14 grid overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-black/15 backdrop-blur-xl md:grid-cols-3"
        >
          {copy.capabilities.map(
            ({ icon: Icon, title, description, result }, index) => (
              <article
                key={title}
                className={`group relative p-6 sm:p-7 ${
                  index < copy.capabilities.length - 1
                    ? "border-b border-white/[0.08] md:border-r md:border-b-0"
                    : ""
                } `}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.045] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative">
                  <div className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/45">
                    <Icon className="size-3.5" strokeWidth={1.7} />
                  </div>

                  <h3 className="mt-6 text-[13px] font-medium text-white/80">
                    {title}
                  </h3>

                  <p className="mt-3 text-[11px] leading-5 text-white/35">
                    {description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4">
                    <ArrowRight
                      className="size-3 text-white/25"
                      strokeWidth={1.7}
                    />

                    <span className="text-[10px] font-medium tracking-[0.12em] text-white/45 uppercase">
                      {result}
                    </span>
                  </div>
                </div>
              </article>
            )
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col justify-between gap-5 border-t border-white/[0.08] pt-7 sm:flex-row sm:items-center"
        >
          <p className="max-w-xl text-[12px] leading-6 text-white/35">
            {copy.closing}
          </p>

          <a
            href="#proyek"
            className="group inline-flex items-center gap-2 text-[11px] font-medium text-white/60 transition-colors hover:text-white"
          >
            {copy.cta}

            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
