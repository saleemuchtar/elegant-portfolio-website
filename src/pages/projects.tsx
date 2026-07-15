import { useState } from "react"
import {
  ArrowUpRight,
  ChevronDown,
  Globe2,
  Lightbulb,
  Target,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { ShoppingBasket } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import type { Variants } from "motion/react"

import { useLanguage } from "@/lib/language"

interface SolutionStep {
  title: string
  description: string
}

interface Project {
  number: string
  category: string
  title: string
  githubUrl: string
  description: string
  businessNeed: string
  value: string
  icon: LucideIcon
  technologies: string[]
  solutionSteps: SolutionStep[]
}

const projectCopy = {
  id: {
    label: "Selected Projects",
    title: "Proyek yang dimulai dari",
    titleAccent: " kebutuhan nyata.",
    description:
      "Setiap proyek menunjukkan cara saya memahami masalah, menyusun solusi, dan menerjemahkannya menjadi sistem yang dapat digunakan.",
    companyValue: "Nilai bagi perusahaan",
    solutionProcess: "Proses menemukan solusi",
    businessNeed: "Kebutuhan bisnis",
    repositoryAria: "Buka repository GitHub",
    projects: [
      {
        number: "01",
        category:
          "Business Process Analysis • CRM • Supply Chain Management • Pareto Analysis • Full-Stack Development",
        title: "Laundry Operations Management Platform",
        githubUrl: "https://github.com/saleemuchtar/laundry-scm-crm",
        description:
          "Dirancang untuk membantu operasional Khalisa Laundry di Jatiasih, Bekasi dengan menyatukan pelanggan, transaksi, stok, pemasok, program loyalitas, dan laporan dalam satu sistem. Tujuannya mengurangi pekerjaan manual, menjaga data tetap rapi, dan membantu bisnis mengambil keputusan dengan lebih mudah.",
        businessNeed:
          "Saat data pelanggan, transaksi, stok, dan pemasok masih dikelola di tempat yang berbeda, pekerjaan menjadi lebih lambat dan rawan kesalahan. Tim juga menghabiskan waktu untuk mencari data, mencatat ulang, atau memastikan informasi yang digunakan sudah benar.",
        value:
          "Semua proses berada dalam satu sistem sehingga informasi lebih mudah dicari, stok lebih terkontrol, pelayanan pelanggan lebih terarah, dan keputusan dapat dibuat berdasarkan data yang sama.",
        icon: Globe2,
        technologies: ["Next.js", "React", "Tailwind CSS", "MySQL"],
        solutionSteps: [
          {
            title: "Memahami hubungan antarproses",
            description:
              "Saya mulai dengan memahami hubungan antara pelanggan, transaksi, stok, pemasok, dan laporan agar sistem mengikuti alur operasional bisnis yang sebenarnya.",
          },
          {
            title: "Menyatukan data yang tersebar",
            description:
              "Data utama disatukan dalam satu sistem agar lebih mudah dicari, mengurangi pencatatan ganda, dan membantu setiap bagian menggunakan informasi yang sama.",
          },
          {
            title: "Mengotomatisasi pekerjaan penting",
            description:
              "Pekerjaan berulang seperti menghitung biaya, memperbarui stok, membuat invoice, dan mencatat transaksi dibuat lebih otomatis agar operasional lebih efisien.",
          },
          {
            title: "Mengubah aktivitas menjadi keputusan",
            description:
              "Dashboard dirancang untuk membantu pemilik bisnis melihat kondisi operasional dan memusatkan perhatian pada pelanggan, layanan, atau produk yang memberi dampak terbesar.",
          },
        ],
      },
      {
        number: "02",
        category:
          "Business Process Analysis • Sales Management • Inventory Management • Order Management • Full-Stack Development",
        title: "Neighborhood Vegetable Sales Platform",
        githubUrl: "https://github.com/saleemuchtar/sistem-penjualan-sayur-rw",
        description:
          "Dirancang untuk membantu operasional Toko Mama Aufar di Jakasampurna, Bekasi dengan menyatukan produk, stok, pelanggan, pesanan, pembayaran, dan laporan penjualan dalam satu sistem. Tujuannya mempermudah pelayanan warga dalam lingkungan satu RW dan mengurangi pencatatan manual.",
        businessNeed:
          "Saat produk, stok, pesanan, dan transaksi masih dikelola melalui pesan pribadi atau catatan terpisah, pekerjaan menjadi lebih lambat, pesanan berisiko terlewat, dan informasi stok sulit dipastikan.",
        value:
          "Semua proses penjualan berada dalam satu sistem sehingga pesanan lebih mudah dikelola, stok lebih terkontrol, pelayanan pelanggan lebih cepat, dan pemilik usaha dapat memantau hasil penjualan dengan lebih jelas.",
        icon: ShoppingBasket,
        technologies: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Go",
          "Gin",
          "GORM",
          "PostgreSQL",
        ],
        solutionSteps: [
          {
            title: "Memahami proses penjualan",
            description:
              "Saya memetakan alur dari pelanggan memilih produk hingga pedagang memproses pesanan agar sistem mengikuti kebutuhan operasional Toko Mama Aufar.",
          },
          {
            title: "Menyatukan data operasional",
            description:
              "Data produk, stok, pelanggan, pesanan, dan transaksi disatukan agar lebih mudah dicari serta mengurangi pencatatan berulang.",
          },
          {
            title: "Mempermudah pengelolaan pesanan",
            description:
              "Proses pemesanan, pembaruan stok, perubahan status pesanan, dan pencatatan transaksi dibuat lebih terstruktur agar pelayanan lebih efisien.",
          },
          {
            title: "Mendukung keputusan usaha",
            description:
              "Dashboard dan laporan membantu pemilik usaha memantau penjualan, kondisi stok, serta aktivitas pesanan dari data yang sama.",
          },
        ],
      },
    ] satisfies Project[],
  },
  en: {
    label: "Selected Projects",
    title: "Projects that begin with",
    titleAccent: " real needs.",
    description:
      "Each project shows how I understand problems, structure solutions, and translate them into systems that people can use.",
    companyValue: "Value for the company",
    solutionProcess: "Solution discovery process",
    businessNeed: "Business need",
    repositoryAria: "Open GitHub repository",
    projects: [
      {
        number: "01",
        category:
          "Business Process Analysis • CRM • Supply Chain Management • Pareto Analysis • Full-Stack Development",
        title: "Laundry Operations Management Platform",
        githubUrl: "https://github.com/saleemuchtar/laundry-scm-crm",
        description:
          "Designed to support Khalisa Laundry's operations in Jatiasih, Bekasi by bringing customers, transactions, inventory, suppliers, loyalty programs, and reports into one system. The goal is to reduce manual work, keep data organized, and help the business make decisions more easily.",
        businessNeed:
          "When customer, transaction, inventory, and supplier data is managed in separate places, work becomes slower and more prone to errors. The team also spends time searching for data, entering it again, or confirming that the information being used is correct.",
        value:
          "All processes are brought into one system, making information easier to find, inventory easier to control, customer service more focused, and decisions based on the same data.",
        icon: Globe2,
        technologies: ["Next.js", "React", "Tailwind CSS", "MySQL"],
        solutionSteps: [
          {
            title: "Understanding relationships between processes",
            description:
              "I began by understanding the relationships between customers, transactions, inventory, suppliers, and reports so the system follows the business's actual operational flow.",
          },
          {
            title: "Bringing distributed data together",
            description:
              "Core data is brought into one system so it is easier to find, duplicate entry is reduced, and every function can work with the same information.",
          },
          {
            title: "Automating important work",
            description:
              "Recurring tasks such as calculating fees, updating inventory, creating invoices, and recording transactions are automated to make operations more efficient.",
          },
          {
            title: "Turning activity into decisions",
            description:
              "The dashboard is designed to help business owners see operational conditions and focus on the customers, services, or products that create the greatest impact.",
          },
        ],
      },
      {
        number: "02",
        category:
          "Business Process Analysis • Sales Management • Inventory Management • Order Management • Full-Stack Development",
        title: "Neighborhood Vegetable Sales Platform",
        githubUrl: "https://github.com/saleemuchtar/sistem-penjualan-sayur-rw",
        description:
          "Designed to support Toko Mama Aufar's operations in Jakasampurna, Bekasi by bringing products, inventory, customers, orders, payments, and sales reports into one system. The goal is to make service within the neighborhood easier and reduce manual record-keeping.",
        businessNeed:
          "When products, inventory, orders, and transactions are still managed through private messages or separate notes, work becomes slower, orders can be missed, and inventory information is difficult to confirm.",
        value:
          "All sales processes are handled in one system, making orders easier to manage, inventory easier to control, customer service faster, and sales performance clearer for the business owner.",
        icon: ShoppingBasket,
        technologies: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Go",
          "Gin",
          "GORM",
          "PostgreSQL",
        ],
        solutionSteps: [
          {
            title: "Understanding the sales process",
            description:
              "I mapped the flow from customers selecting products to the seller processing orders so the system follows Toko Mama Aufar's operational needs.",
          },
          {
            title: "Bringing operational data together",
            description:
              "Product, inventory, customer, order, and transaction data is consolidated so it is easier to find and repeated data entry is reduced.",
          },
          {
            title: "Simplifying order management",
            description:
              "Ordering, inventory updates, order-status changes, and transaction recording are made more structured so service can be more efficient.",
          },
          {
            title: "Supporting business decisions",
            description:
              "Dashboards and reports help the business owner monitor sales, inventory conditions, and order activity using the same data.",
          },
        ],
      },
    ] satisfies Project[],
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
    y: 20,
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

export default function ProjectsPage() {
  const [openProject, setOpenProject] = useState<number | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const { language } = useLanguage()
  const copy = projectCopy[language]
  const projects = copy.projects

  const toggleProject = (index: number) => {
    setOpenProject((current) => (current === index ? null : index))
  }

  return (
    <section
      id="proyek"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#111214] text-white"
    >
      {/* Transisi halus dari About */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-[#111214] via-[#111214]/60 to-transparent"
      />
      {/* Background grid seperti halaman About */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_50%_42%,black_12%,transparent_78%)] [background-size:64px_64px] opacity-[0.16]"
      />

      {/* Glow tipis agar tidak datar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-28 left-1/2 z-0 h-[420px] w-[min(900px,94vw)] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[120px]"
      />

      {/* Aksen warna sangat halus */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-52 -right-52 z-0 size-[480px] rounded-full bg-[#7657ff]/[0.035] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-40 -left-52 z-0 size-[480px] rounded-full bg-[#38d9ff]/[0.025] blur-[150px]"
      />

      {/* Transisi halus menuju Experience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-64 bg-gradient-to-b from-transparent via-[#1f2126]/70 to-[#2b2e34]"
      />

      {/* Glow kecil agar warp menyatu dengan palet halaman lain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-32 left-1/2 z-[1] h-72 w-[min(860px,92vw)] -translate-x-1/2 rounded-full bg-[#248cff]/[0.055] blur-[110px]"
      />

      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.08,
        }}
        className="relative z-10 mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32"
      >
        {/* Header */}
        <motion.header
          variants={itemVariants}
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium tracking-[0.22em] text-[#f6c96b]/80 uppercase">
              {copy.label}
            </p>

            <h2 className="mt-4 text-[2.25rem] leading-[1.07] font-medium tracking-[-0.05em] text-white sm:text-[2.9rem] lg:text-[3.25rem]">
              {copy.title}
              <span className="text-white/42">{copy.titleAccent}</span>
            </h2>
          </div>

          <p className="max-w-sm text-[13px] leading-7 text-white/52 sm:text-[14px] md:text-right">
            {copy.description}
          </p>
        </motion.header>

        {/* Project cards */}
        <motion.div
          variants={itemVariants}
          className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-5 md:grid-cols-2 lg:gap-6"
        >
          {projects.map((project, index) => {
            const Icon = project.icon
            const isOpen = openProject === index
            const contentId = `project-content-${index}`

            return (
              <div
                key={project.title}
                className="group relative self-start overflow-hidden rounded-[1.65rem] border border-white/[0.1] bg-white/[0.055] text-white shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.17] hover:bg-white/[0.075]"
              >
                <article>
                  {/* Main card */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.055] text-[#38d9ff]/75 transition-colors duration-300 group-hover:text-[#38d9ff]">
                        <Icon className="size-3.5" strokeWidth={1.7} />
                      </div>

                      <span className="text-[10px] tracking-[0.12em] text-white/25 tabular-nums">
                        {project.number}
                      </span>
                    </div>

                    <p className="mt-8 text-[9px] leading-5 font-semibold tracking-[0.16em] text-[#f6c96b]/78 uppercase">
                      {project.category}
                    </p>

                    <h3 className="mt-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${copy.repositoryAria} ${project.title}`}
                        className="group/title inline-flex items-start gap-2 text-[19px] leading-snug font-medium tracking-[-0.025em] text-white/90 transition-colors duration-300 hover:text-white"
                      >
                        <span>{project.title}</span>

                        <ArrowUpRight
                          className="mt-1 size-3.5 shrink-0 text-white/28 transition-all duration-300 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 group-hover/title:text-[#f6c96b]"
                          strokeWidth={1.8}
                        />
                      </a>
                    </h3>

                    <p className="mt-4 text-[13px] leading-7 text-white/54 sm:text-[14px]">
                      {project.description}
                    </p>

                    <div className="mt-6 border-t border-white/[0.09] pt-5">
                      <p className="text-[9px] font-semibold tracking-[0.16em] text-white/34 uppercase">
                        {copy.companyValue}
                      </p>

                      <p className="mt-2 text-[12px] leading-6 text-white/62 sm:text-[13px]">
                        {project.value}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/[0.10] bg-white/[0.055] px-2.5 py-1.5 text-[9px] text-white/48 backdrop-blur-xl"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dropdown trigger */}
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleProject(index)}
                    className="group/trigger flex w-full items-center justify-between gap-4 border-t border-white/[0.09] bg-black/[0.08] px-6 py-5 text-left transition-colors duration-300 hover:bg-white/[0.055] sm:px-7"
                  >
                    <div className="flex items-center gap-3">
                      <Lightbulb
                        className="size-3.5 text-[#f6c96b]/72"
                        strokeWidth={1.7}
                      />

                      <span className="text-[11px] font-medium text-white/58 transition-colors duration-300 group-hover/trigger:text-white/82">
                        {copy.solutionProcess}
                      </span>
                    </div>

                    <motion.span
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.055]"
                    >
                      <ChevronDown
                        className="size-3.5 text-white/48"
                        strokeWidth={1.7}
                      />
                    </motion.span>
                  </button>

                  {/* Dropdown content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          height: {
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: {
                            duration: 0.25,
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/[0.08] bg-black/[0.18] px-6 pt-6 pb-7 sm:px-7">
                          <div className="rounded-xl border border-white/[0.09] bg-white/[0.045] p-4 backdrop-blur-xl">
                            <div className="flex items-start gap-3">
                              <Target
                                className="mt-0.5 size-3.5 shrink-0 text-[#38d9ff]/70"
                                strokeWidth={1.7}
                              />

                              <div>
                                <p className="text-[9px] font-semibold tracking-[0.16em] text-[#f6c96b]/75 uppercase">
                                  {copy.businessNeed}
                                </p>

                                <p className="mt-2 text-[12px] leading-6 text-white/56 sm:text-[13px]">
                                  {project.businessNeed}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 space-y-5">
                            {project.solutionSteps.map((step, stepIndex) => (
                              <div key={step.title} className="flex gap-4">
                                <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.05] text-[8px] text-white/36 tabular-nums">
                                  {String(stepIndex + 1).padStart(2, "0")}
                                </div>

                                <div>
                                  <h4 className="text-[12px] font-medium text-white/76">
                                    {step.title}
                                  </h4>

                                  <p className="mt-1.5 text-[11px] leading-6 text-white/46 sm:text-[12px]">
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
