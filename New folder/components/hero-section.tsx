"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Calendar, Users, DollarSign, Home, Globe, Leaf } from "lucide-react"

export function HeroSection() {
  const [searchData, setSearchData] = useState({
    place: "",
    type: "",
    budget: "",
    days: "",
    groupType: "",
    accommodation: "",
    language: "",
    ecoOptions: "",
  })

  return (
    <section className="relative min-h-screen flex items-center hero-gradient">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/placeholder.jpg"
        >
          <source src="bgvid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-8rem)]">
            {/* Left Content Section */}
            <div className="text-left space-y-8 backdrop-blur-sm bg-black/10 p-8 rounded-2xl border border-white/10">
              <Badge variant="secondary" className="inline-flex items-center bg-white/10 text-white border-white/20">
                <Leaf className="h-4 w-4 mr-2" />
                Digital Soul of Jharkhand
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-balance">
                <span className="text-white drop-shadow-lg">Discover the</span>
                <span className="text-primary block mt-2 drop-shadow-glow">Eco-Cultural</span>
                <span className="text-white block mt-2 drop-shadow-lg">Heritage of Jharkhand</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 text-pretty max-w-xl leading-relaxed drop-shadow-md">
                Experience tribal festivals, pristine waterfalls, and authentic cultural stories with AI-powered
                personalized itineraries and eco-friendly travel options.
              </p>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Festivals
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <MapPin className="h-5 w-5 mr-2" />
                  Eco-Trails
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <Leaf className="h-5 w-5 mr-2" />
                  Digital Soul Stories
                </Button>
              </div>
            </div>

            {/* Right Section - Empty for video focus */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
