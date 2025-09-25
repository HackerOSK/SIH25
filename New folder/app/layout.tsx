import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Footer } from "@/components/footer"
import "./globals.css"
import 'leaflet/dist/leaflet.css'

export const metadata: Metadata = {
  title: "Jharkhand Tourism - Digital Soul of Jharkhand",
  description:
    "Discover the eco-cultural heritage of Jharkhand with AI-powered itinerary planning, tribal festivals, and immersive experiences",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Footer />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
