import { LanguageProvider } from "@/lib/language"
import AboutPage from "@/pages/about"
import ContactPage from "@/pages/contact"
import ExperiencePage from "@/pages/experience"
import HomePage from "@/pages/home"
import ProjectsPage from "@/pages/projects"

function App() {
  return (
    <LanguageProvider>
      <main className="overflow-x-hidden bg-black">
        <HomePage />
        <AboutPage />
        <ProjectsPage />
        <ExperiencePage />
        <ContactPage />
      </main>
    </LanguageProvider>
  )
}

export default App
