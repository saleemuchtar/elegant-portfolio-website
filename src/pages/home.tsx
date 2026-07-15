import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  House,
  Mail,
  UserRound,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import type { Variants } from "motion/react"

import { ShaderAnimation } from "@/components/ui/shader-animation"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { useLanguage } from "@/lib/language"

const homeCopy = {
  id: {
    navigationAria: "Navigasi utama",
    navigation: {
      home: "Beranda",
      about: "Tentang",
      projects: "Proyek",
      experience: "Pengalaman",
      contact: "Kontak",
    },
    profileAlt: "Foto profil Ringu Elder",
    availability: "Tersedia untuk bekerja",
    eyebrow: "Web Development · Data · Business Systems",
    title: "Solusi digital membantu bisnis,",
    titleAccent: "bukan menambah rumit.",
    description:
      "Setiap bisnis memiliki kebutuhan yang berbeda. Saya membantu menerjemahkan proses kerja, data, dan kebutuhan bisnis menjadi website atau solusi digital yang lebih sederhana, efisien, dan mudah digunakan.",
    primaryCta: "Bagaimana Saya Membantu",
    secondaryCta: "Mari bertukar pikiran",
    githubAria: "Buka profil GitHub",
    closing: "Membangun pengalaman digital",
  },
  en: {
    navigationAria: "Main navigation",
    navigation: {
      home: "Home",
      about: "About",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    profileAlt: "Profile photo of Ringu Elder",
    availability: "Available for work",
    eyebrow: "Web Development · Data · Business Systems",
    title: "Digital solutions help businesses,",
    titleAccent: "not add complexity.",
    description:
      "Every business has different needs. I help translate workflows, data, and business requirements into websites or digital solutions that are simpler, more efficient, and easier to use.",
    primaryCta: "How I Can Help",
    secondaryCta: "Let’s exchange ideas",
    githubAria: "Open GitHub profile",
    closing: "Building digital experiences",
  },
} as const

const contentContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.28,
      staggerChildren: 0.11,
    },
  },
}

const contentItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}
function ProfilePhoto({ className, alt }: { className?: string; alt: string }) {
  return (
    <div
      className={`relative w-full max-w-[310px] sm:max-w-[350px] lg:max-w-[410px] ${
        className ?? ""
      }`}
    >
      {/* Cahaya lembut di belakang foto */}
      <div
        aria-hidden="true"
        className="absolute inset-x-12 top-14 bottom-8 rounded-[45%] bg-white/[0.09] blur-[70px]"
      />

      {/* Bayangan bawah */}
      <div
        aria-hidden="true"
        className="absolute -bottom-7 left-1/2 h-12 w-[72%] -translate-x-1/2 rounded-full bg-white/[0.07] blur-2xl"
      />

      {/* Frame foto */}
      <div className="relative rounded-[2.15rem] bg-gradient-to-b from-white/25 via-white/[0.055] to-white/10 p-px shadow-[0_35px_100px_rgba(0,0,0,0.48)]">
        <div className="relative overflow-hidden rounded-[calc(2.15rem-1px)] bg-black">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="/profile.png"
              alt={alt}
              className="h-full w-full object-cover object-[center_20%] contrast-[1.03] saturate-[0.92] transition-transform duration-1000 hover:scale-[1.018]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/[0.025]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_25%,rgba(0,0,0,0.16)_100%)]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[calc(2.15rem-1px)] ring-1 ring-white/[0.075] ring-inset"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const copy = homeCopy[language]

  const navigationItems = [
    {
      name: copy.navigation.home,
      url: "#beranda",
      icon: House,
    },
    {
      name: copy.navigation.about,
      url: "#tentang",
      icon: UserRound,
    },
    {
      name: copy.navigation.projects,
      url: "#proyek",
      icon: FolderKanban,
    },
    {
      name: copy.navigation.experience,
      url: "#pengalaman",
      icon: BriefcaseBusiness,
    },
    {
      name: copy.navigation.contact,
      url: "#kontak",
      icon: Mail,
    },
  ]

  return (
    <section
      id="beranda"
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* ShaderAnimation tetap sama */}
      <ShaderAnimation />

      {/* Overlay utama */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.78)_45%,rgba(0,0,0,0.28)_100%)]"
      />

      {/* Overlay radial yang lebih lembut */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_76%_45%,transparent_0%,rgba(0,0,0,0.06)_34%,rgba(0,0,0,0.72)_100%)]"
      />

      {/* Fade bagian bawah */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-56 bg-gradient-to-t from-black via-black/35 to-transparent"
      />

      {/* Intro curtain */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
          }}
          transition={{
            duration: 1.15,
            delay: 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="pointer-events-none fixed inset-0 z-[100] bg-black"
        />
      )}

      {/* Navbar baru */}
      <motion.div>
        <NavBar items={navigationItems} ariaLabel={copy.navigationAria} />
      </motion.div>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-14 px-5 pt-24 pb-28 sm:px-8 sm:pt-28 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10">
        {/* Konten teks */}
        <motion.div
          variants={contentContainerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          className="order-1 mx-auto w-full max-w-2xl lg:mx-0"
        >
          <motion.div
            variants={contentItemVariants}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.055] px-3.5 py-2 backdrop-blur-xl"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-55" />

              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-[10px] font-medium tracking-[0.17em] text-white/50 uppercase">
              {copy.availability}
            </span>
          </motion.div>

          <motion.p
            variants={contentItemVariants}
            className="mb-4 text-[11px] font-medium tracking-[0.23em] text-white/30 uppercase"
          >
            {copy.eyebrow}
          </motion.p>

          <motion.div
            variants={contentItemVariants}
            className="mb-8 flex justify-center lg:hidden"
          >
            <ProfilePhoto alt={copy.profileAlt} />
          </motion.div>

          <motion.h1
            variants={contentItemVariants}
            className="max-w-3xl text-[2.55rem] leading-[1.04] font-medium tracking-[-0.05em] sm:text-[3.15rem] md:text-[3.5rem] lg:text-[3.75rem]"
          >
            {copy.title}

            <span className="block bg-gradient-to-r from-white via-white/90 to-white/35 bg-clip-text text-transparent">
              {copy.titleAccent}
            </span>
          </motion.h1>

          <motion.p
            variants={contentItemVariants}
            className="mt-6 max-w-xl text-[14px] leading-7 text-white/48 sm:text-[15px]"
          >
            {copy.description}
          </motion.p>

          <motion.div
            variants={contentItemVariants}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#proyek"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black transition-all duration-300 hover:bg-white/85"
            >
              {copy.primaryCta}

              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="mailto:zanzibarrr212@gmail.com"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-5 py-2.5 text-[12px] font-medium text-white backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.09]"
            >
              <Mail className="size-3.5" />

              {copy.secondaryCta}
            </a>
          </motion.div>

          <motion.div
            variants={contentItemVariants}
            className="mt-9 flex items-center gap-4"
          >
            <a
              href="https://github.com/saleemuchtar"
              target="_blank"
              rel="noreferrer"
              aria-label={copy.githubAria}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/40 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
            >
              <Code2 className="size-3.5" />
            </a>

            <div className="h-px w-9 bg-white/12" />

            <span className="text-[10px] tracking-[0.15em] text-white/22 uppercase">
              {copy.closing}
            </span>
          </motion.div>
        </motion.div>

        {/* Foto profil desktop */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 26,
                  scale: 0.965,
                  filter: "blur(14px)",
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.05,
            delay: 0.38,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="order-2 hidden w-full justify-end lg:flex"
        >
          <ProfilePhoto alt={copy.profileAlt} />
        </motion.div>
      </section>
    </section>
  )
}
