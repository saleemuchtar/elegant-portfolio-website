import { ArrowUpRight, Mail } from "lucide-react"
import type { IconType } from "react-icons"
import { FaLinkedinIn } from "react-icons/fa6"
import { SiGithub, SiGmail, SiYoutube } from "react-icons/si"
import { motion, useReducedMotion } from "motion/react"
import type { Variants } from "motion/react"

import { WebGLShader } from "@/components/ui/web-gl-shader"
import { useLanguage } from "@/lib/language"

const contactCopy = {
  id: {
    label: "Contact",
    title: "Punya ide, website, atau proses bisnis yang ingin dikembangkan?",
    description:
      "Mari kita diskusikan keinginan Anda dan temukan solusi digital yang sederhana, terstruktur, serta sesuai dengan tujuan yang ingin dicapai. Saya membantu melalui pengembangan web, analisis proses bisnis, dan sistem informasi.",
    cta: "Mulai Diskusi",
    role: "Mahasiswa Sistem Informasi · Web, Data, dan Business Systems",
    openSocial: "Buka",
    rights: "© 2026 Zanzibar Muchtar. All rights reserved.",
  },
  en: {
    label: "Contact",
    title: "Have an idea, website, or business process you want to develop?",
    description:
      "Let’s discuss what you need and find a digital solution that is simple, structured, and aligned with the goals you want to achieve. I can help through web development, business process analysis, and information systems.",
    cta: "Start a Discussion",
    role: "Information Systems Student · Web, Data, and Business Systems",
    openSocial: "Open",
    rights: "© 2026 Zanzibar Muchtar. All rights reserved.",
  },
} as const

interface SocialLink {
  name: string
  href: string
  icon: IconType
  external: boolean
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/saleemuchtar",
    icon: SiGithub,
    external: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/zibar-muchtar-a2b1592aa/",
    icon: FaLinkedinIn,
    external: true,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@zbrdev",
    icon: SiYoutube,
    external: true,
  },
  {
    name: "Gmail",
    href: "mailto:zanzibarrr212@gmail.com",
    icon: SiGmail,
    external: false,
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function ContactPage() {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const copy = contactCopy[language]

  return (
    <section
      id="kontak"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#05050a] text-white"
    >
      {/* Shader hanya sebagai atmosfer background */}
      <WebGLShader />

      {/* Overlay agar shader tidak terlalu ramai */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-black/45"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_30%,transparent_0%,rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.88)_100%)]"
      />

      {/* Transisi dari Experience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-[#111214] via-[#111214]/60 to-transparent"
      />

      <motion.footer
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="relative z-10 mx-auto max-w-6xl px-5 pt-28 pb-7 sm:px-8 sm:pt-32 lg:px-10"
      >
        {/* Bagian CTA utama */}
        <div className="grid gap-10 border-b border-white/[0.1] pb-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div variants={itemVariants} className="max-w-3xl">
            <p className="text-[10px] font-medium tracking-[0.22em] text-white/35 uppercase">
              {copy.label}
            </p>

            <h2 className="mt-5 max-w-3xl text-[2.35rem] leading-[1.06] font-medium tracking-[-0.05em] sm:text-[3rem] lg:text-[3.45rem]">
              {copy.title}
            </h2>

            <p className="mt-5 max-w-xl text-[14px] leading-7 text-white/50 sm:text-[15px]">
              {copy.description}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:pb-1">
            <a
              href="mailto:zanzibarrr212@gmail.com"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/[0.16] bg-white/[0.09] px-6 py-3 text-[13px] font-medium text-white shadow-[0_16px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:border-[#f6c96b]/35 hover:bg-white/[0.14]"
            >
              <Mail className="size-4" />

              {copy.cta}

              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Informasi dan sosial */}
        <div className="grid gap-10 py-10 md:grid-cols-[1fr_auto] md:items-center">
          <motion.div variants={itemVariants}>
            <p className="text-[15px] font-medium tracking-[-0.02em] text-white/85">
              Zanzibar Muchtar
            </p>

            <p className="mt-2 text-[12px] leading-6 text-white/38">
              {copy.role}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3"
          >
            {socialLinks.map(({ name, href, icon: Icon, external }) => (
              <a
                key={name}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                aria-label={`${copy.openSocial} ${name}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.045] px-4 py-2.5 text-[11px] font-medium text-white/48 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.09] hover:text-white"
              >
                <Icon className="size-4 transition-transform duration-300 group-hover:scale-110" />

                {name}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Footer paling bawah */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-between gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center"
        >
          <p className="text-[10px] text-white/25">{copy.rights}</p>

          <div className="flex items-center gap-3 text-[9px] tracking-[0.17em] text-white/22 uppercase">
            <span>Indonesia</span>

            <span className="size-1 rounded-full bg-[#f6c96b]/75" />

            <span>GMT+7</span>
          </div>
        </motion.div>
      </motion.footer>
    </section>
  )
}
