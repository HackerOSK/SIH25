import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HighlightsSection } from "@/components/highlights-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HighlightsSection />
    </main>
  )
}
