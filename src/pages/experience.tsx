import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  Search,
  TrendingUp,
  Wrench,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { ExperienceSparklesBackground } from "@/components/ui/experience-sparkles-background"
import { motion, useReducedMotion } from "motion/react"
import type { Variants } from "motion/react"

import { useLanguage } from "@/lib/language"

interface ExperienceHighlight {
  label: string
  description: string
  icon: LucideIcon
}

interface Experience {
  id: string
  period: string
  type: string
  role: string
  organization: string
  location: string
  summary: string
  highlights: ExperienceHighlight[]
  skills: string[]
  proofUrl: string
  external?: boolean
}

const experienceCopy = {
  id: {
    label: "Pengalaman",
    title: "Terbiasa bekerja dengan standar,",
    titleAccent: "beradaptasi, dan bertanggung jawab.",
    description:
      "Dua lingkungan kerja yang berbeda membentuk kemampuan saya dalam menjaga kualitas, melayani orang lain, mengikuti arahan, dan tetap dapat diandalkan ketika situasi berubah.",
    experiences: [
      {
        id: "terpingkal-coffee-shop",
        period: "Jul 2024 – Agu 2024",
        type: "Part-Time Work",
        role: "Junior Barista & Kitchen Staff",
        organization: "Terpingkal Coffee Shop",
        location: "Indonesia",
        summary:
          "Terbiasa bekerja dengan SOP, menjaga konsistensi kualitas produk, melayani pelanggan, serta membantu operasional dan pengelolaan bahan dalam lingkungan kerja yang cepat.",
        highlights: [
          {
            label: "Tantangan",
            description:
              "Menjaga kualitas produk dan pelayanan tetap konsisten ketika pesanan meningkat, kebutuhan pelanggan berbeda, dan penggunaan bahan harus tetap terkendali.",
            icon: Search,
          },
          {
            label: "Kontribusi",
            description:
              "Menjalankan proses kerja sesuai SOP, membantu persiapan produk, menjaga kebersihan area, memperhatikan penggunaan stok, dan berkomunikasi langsung dengan pelanggan.",
            icon: Wrench,
          },
          {
            label: "Nilai",
            description:
              "Membentuk kebiasaan kerja yang disiplin, teliti, berorientasi pada pelanggan, dan sadar bahwa kualitas serta efisiensi harus berjalan bersama.",
            icon: TrendingUp,
          },
        ],
        skills: [
          "SOP Compliance",
          "Customer Service",
          "Teamwork",
          "Inventory Awareness",
          "Waste Control",
          "Work Discipline",
        ],
        proofUrl: "#kontak",
        external: false,
      },
      {
        id: "mnc-pictures",
        period: "Jul 2022 – Jan 2023",
        type: "Television Production",
        role: "Supporting Actor",
        organization: "MNC Pictures · Amanah Wali 5",
        location: "Indonesia",
        summary:
          "Bekerja dalam lingkungan produksi televisi yang cepat dan dinamis, mengikuti arahan, membaca situasi, menyesuaikan diri dengan perubahan, serta berkolaborasi dengan banyak pihak.",
        highlights: [
          {
            label: "Tantangan",
            description:
              "Jadwal produksi, arahan adegan, dan kondisi di lokasi dapat berubah dengan cepat sehingga membutuhkan konsentrasi, kesiapan, dan kemampuan menyesuaikan diri.",
            icon: Search,
          },
          {
            label: "Kontribusi",
            description:
              "Mempelajari naskah, mengikuti arahan sutradara, melakukan improvisasi sesuai kebutuhan adegan, serta menjaga koordinasi dengan talent dan kru produksi.",
            icon: Wrench,
          },
          {
            label: "Nilai",
            description:
              "Menguatkan kemampuan adaptasi, komunikasi, ketepatan waktu, pengendalian diri, dan kerja sama dalam situasi dengan tekanan serta ekspektasi tinggi.",
            icon: TrendingUp,
          },
        ],
        skills: [
          "Adaptability",
          "Communication",
          "Team Coordination",
          "Time Discipline",
          "Improvisation",
          "Professional Conduct",
        ],
        proofUrl: "#kontak",
        external: false,
      },
    ] satisfies Experience[],
  },
  en: {
    label: "Experience",
    title: "Accustomed to working with standards,",
    titleAccent: "adapting, and taking responsibility.",
    description:
      "Two different work environments shaped my ability to maintain quality, serve others, follow direction, and remain dependable when situations change.",
    experiences: [
      {
        id: "terpingkal-coffee-shop",
        period: "Jul 2024 – Aug 2024",
        type: "Part-Time Work",
        role: "Junior Barista & Kitchen Staff",
        organization: "Terpingkal Coffee Shop",
        location: "Indonesia",
        summary:
          "Accustomed to working with SOPs, maintaining consistent product quality, serving customers, and supporting operations and ingredient management in a fast-paced work environment.",
        highlights: [
          {
            label: "Challenge",
            description:
              "Maintaining consistent product and service quality when orders increased, customer needs varied, and ingredient usage still had to remain controlled.",
            icon: Search,
          },
          {
            label: "Contribution",
            description:
              "Following SOP-based workflows, helping prepare products, maintaining a clean work area, monitoring inventory usage, and communicating directly with customers.",
            icon: Wrench,
          },
          {
            label: "Value",
            description:
              "Developing disciplined, detail-oriented, and customer-focused work habits while understanding that quality and efficiency must work together.",
            icon: TrendingUp,
          },
        ],
        skills: [
          "SOP Compliance",
          "Customer Service",
          "Teamwork",
          "Inventory Awareness",
          "Waste Control",
          "Work Discipline",
        ],
        proofUrl: "#kontak",
        external: false,
      },
      {
        id: "mnc-pictures",
        period: "Jul 2022 – Jan 2023",
        type: "Television Production",
        role: "Supporting Actor",
        organization: "MNC Pictures · Amanah Wali 5",
        location: "Indonesia",
        summary:
          "Worked in a fast-paced and dynamic television production environment, following direction, reading situations, adjusting to change, and collaborating with many different people.",
        highlights: [
          {
            label: "Challenge",
            description:
              "Production schedules, scene directions, and on-location conditions could change quickly, requiring focus, readiness, and the ability to adapt.",
            icon: Search,
          },
          {
            label: "Contribution",
            description:
              "Studying scripts, following the director's instructions, improvising when scenes required it, and maintaining coordination with talent and the production crew.",
            icon: Wrench,
          },
          {
            label: "Value",
            description:
              "Strengthening adaptability, communication, punctuality, self-control, and teamwork in situations involving high pressure and expectations.",
            icon: TrendingUp,
          },
        ],
        skills: [
          "Adaptability",
          "Communication",
          "Team Coordination",
          "Time Discipline",
          "Improvisation",
          "Professional Conduct",
        ],
        proofUrl: "#kontak",
        external: false,
      },
    ] satisfies Experience[],
  },
} as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
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

export default function ExperiencePage() {
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const copy = experienceCopy[language]
  const experiences = copy.experiences

  return (
    <section
      id="pengalaman"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#2b2e34] text-white"
    >
      <ExperienceSparklesBackground />

      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.08,
        }}
        className="relative z-10 mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-32 lg:px-10"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-white/40 uppercase">
              {copy.label}
            </p>

            <h2 className="mt-4 text-[2.15rem] leading-[1.08] font-medium tracking-[-0.045em] sm:text-[2.7rem] lg:text-[3rem]">
              {copy.title}

              <span className="text-white/48"> {copy.titleAccent}</span>
            </h2>
          </div>

          <p className="max-w-sm text-[12px] leading-6 text-white/45 md:text-right">
            {copy.description}
          </p>
        </motion.div>

        {/* Experience timeline */}
        <div className="relative mt-16">
          {/* Desktop timeline rail */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-[124px] hidden w-px bg-gradient-to-b from-transparent via-white/18 to-transparent md:block"
          />

          <div className="space-y-7">
            {experiences.map((experience) => (
              <motion.article
                key={experience.id}
                variants={itemVariants}
                className="relative grid gap-4 md:grid-cols-[100px_1fr] md:gap-12"
              >
                {/* Period */}
                <div className="relative pt-1">
                  <div className="flex items-center gap-2 md:flex-col md:items-start md:gap-1">
                    <CalendarDays
                      className="size-3.5 text-black/32 md:hidden"
                      strokeWidth={1.7}
                    />

                    <p className="text-[11px] font-medium text-white/70 tabular-nums">
                      {experience.period}
                    </p>

                    <p className="text-[9px] tracking-[0.13em] text-white/35 uppercase">
                      {experience.type}
                    </p>
                  </div>

                  {/* Warm timeline node */}
                  <div
                    aria-hidden="true"
                    className="absolute top-2 -right-[31px] hidden size-3 rounded-full border-[3px] border-[#2b2e34] bg-[#f6c96b] shadow-[0_0_12px_rgba(246,201,107,0.75)] md:block"
                  />
                </div>

                {/* Experience card */}
                <div className="overflow-hidden rounded-[1.6rem] border border-white/[0.14] bg-white/[0.07] text-white shadow-[0_30px_100px_rgba(0,0,0,0.24)] ring-1 ring-white/[0.045] backdrop-blur-2xl transition-all duration-500 ring-inset hover:-translate-y-0.5 hover:border-white/[0.22] hover:bg-white/[0.095] hover:shadow-[0_38px_120px_rgba(0,0,0,0.3)]">
                  {/* Main information */}
                  <div className="p-6 sm:p-7">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.055] px-3 py-1.5 backdrop-blur-xl">
                          <BriefcaseBusiness
                            className="size-3 text-white/45"
                            strokeWidth={1.7}
                          />

                          <span className="text-[9px] font-semibold tracking-[0.14em] text-white/48 uppercase">
                            {experience.type}
                          </span>
                        </div>

                        <h3 className="mt-5 text-[19px] font-medium tracking-[-0.025em] text-white/90">
                          {experience.role}
                        </h3>

                        <p className="mt-1.5 text-[12px] font-medium text-white/55">
                          {experience.organization}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-white/40">
                        <MapPin className="size-3" strokeWidth={1.7} />

                        {experience.location}
                      </div>
                    </div>

                    <p className="mt-6 max-w-3xl text-[13px] leading-7 text-white/58 sm:text-[14px]">
                      {experience.summary}
                    </p>
                  </div>

                  {/* Tantangan, kontribusi, dan nilai */}
                  <div className="grid border-t border-white/[0.09] md:grid-cols-3">
                    {experience.highlights.map(
                      ({ label, description, icon: Icon }, index) => (
                        <div
                          key={label}
                          className={`group relative p-6 sm:p-7 ${
                            index < experience.highlights.length - 1
                              ? "border-b border-white/[0.09] md:border-r md:border-b-0"
                              : ""
                          } `}
                        >
                          {/* Highlight saat hover */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.065] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          />

                          <div className="relative">
                            <div className="flex items-center gap-2.5">
                              <div className="flex size-7 items-center justify-center rounded-full border border-[#f6c96b]/20 bg-[#f6c96b]/[0.07]">
                                <Icon
                                  className="size-3.5 text-[#f6c96b]/80"
                                  strokeWidth={1.8}
                                />
                              </div>

                              <p className="text-[10px] font-semibold tracking-[0.16em] text-[#f6c96b]/85 uppercase">
                                {label}
                              </p>
                            </div>

                            <p className="mt-4 text-[12px] leading-[1.7] text-white/58 sm:text-[13px]">
                              {description}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Skills and proof */}
                  <div className="flex flex-col justify-between gap-5 border-t border-white/[0.09] bg-black/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:px-7">
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/[0.1] bg-white/[0.055] px-2.5 py-1.5 text-[9px] text-white/48"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <a
                      href={experience.proofUrl}
                      target={experience.external ? "_blank" : undefined}
                      rel={experience.external ? "noreferrer" : undefined}
                      className="group inline-flex shrink-0 items-center gap-2 text-[10px] font-medium text-white/55 transition-colors hover:text-[#f6c96b]"
                    ></a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
