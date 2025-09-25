import { Header } from "@/components/header"
import { InteractiveMap } from "@/components/interactive-map"

export default function MapPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <InteractiveMap />
    </main>
  )
}
