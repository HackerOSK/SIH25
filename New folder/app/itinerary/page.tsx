import { Header } from "@/components/header"
import { AIItineraryPlanner } from "@/components/ai-itinerary-planner"

export default function ItineraryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AIItineraryPlanner />
    </main>
  )
}
