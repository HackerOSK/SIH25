"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  CalendarIcon,
  MapPin,
  Clock,
  Users,
  Camera,
  Play,
  Star,
  Heart,
  Share,
  Eye,
  Music,
  Palette,
  TreePine,
  Sun,
  Moon,
  Flower,
} from "lucide-react"

interface Festival {
  id: string
  name: string
  type: "tribal" | "religious"
  season: "spring" | "summer" | "monsoon" | "autumn" | "winter"
  dates: string
  nextDate: Date
  location: string
  description: string
  significance: string
  rituals: string[]
  highlights: string[]
  arFiltersAvailable: boolean
  vrExperience: boolean
  images: string[]
  duration: string
  participants: string
  bestTimeToVisit: string
  culturalElements: string[]
  foodSpecialties: string[]
  musicAndDance: string[]
  ecoFriendly: boolean
}

const festivals: Festival[] = [
  {
    id: "1",
    name: "Sarhul",
    type: "tribal",
    season: "spring",
    dates: "March-April (Chaitra month)",
    nextDate: new Date("2024-03-15"),
    location: "Throughout Jharkhand tribal villages",
    description:
      "The most important festival of the Oraon, Munda, and Ho tribes, celebrating the blossoming of Sal trees and welcoming spring.",
    significance: "Worship of nature and trees, marking the beginning of the new year for tribal communities",
    rituals: ["Sal tree worship", "Traditional dance around sacred groves", "Community feast", "Blessing ceremonies"],
    highlights: ["Sal flower offerings", "Traditional Jhumur dance", "Community bonding", "Nature worship"],
    arFiltersAvailable: true,
    vrExperience: true,
    images: ["/sarhul-festival.jpg"],
    duration: "3-5 days",
    participants: "Entire tribal community",
    bestTimeToVisit: "Early morning for rituals, evening for cultural programs",
    culturalElements: ["Sacred grove ceremonies", "Traditional attire", "Folk songs", "Community prayers"],
    foodSpecialties: ["Handia (rice beer)", "Pitha (rice cakes)", "Traditional tribal cuisine"],
    musicAndDance: ["Jhumur dance", "Tribal folk songs", "Drum beats", "Flute music"],
    ecoFriendly: true,
  },
  {
    id: "2",
    name: "Karma",
    type: "tribal",
    season: "monsoon",
    dates: "August-September (Bhadra month)",
    nextDate: new Date("2024-08-20"),
    location: "Tribal villages across Jharkhand",
    description:
      "Festival dedicated to Karma tree worship, celebrating fertility, prosperity, and the bond between humans and nature.",
    significance: "Seeking blessings for good harvest and prosperity from the Karma deity",
    rituals: [
      "Karma tree branch installation",
      "Fasting by unmarried girls",
      "Traditional dance performances",
      "Community prayers",
    ],
    highlights: ["Karma tree worship", "Karma dance", "Folk storytelling", "Traditional games"],
    arFiltersAvailable: true,
    vrExperience: true,
    images: ["/karma-festival.jpg"],
    duration: "2-3 days",
    participants: "Especially unmarried girls and young women",
    bestTimeToVisit: "Evening for dance performances and cultural activities",
    culturalElements: ["Tree worship rituals", "Traditional jewelry", "Folk narratives", "Community gathering"],
    foodSpecialties: ["Kheer", "Puri", "Seasonal fruits", "Traditional sweets"],
    musicAndDance: ["Karma dance", "Folk songs", "Traditional instruments", "Group performances"],
    ecoFriendly: true,
  },
  {
    id: "3",
    name: "Sohrai",
    type: "tribal",
    season: "autumn",
    dates: "October-November (post-harvest)",
    nextDate: new Date("2024-11-05"),
    location: "Hazaribagh, Ramgarh, and surrounding areas",
    description: "Harvest festival celebrating cattle and featuring the famous Sohrai wall paintings by tribal women.",
    significance: "Thanksgiving for good harvest and honoring cattle for their contribution to agriculture",
    rituals: ["Cattle decoration and worship", "Sohrai wall painting", "Traditional songs", "Community celebrations"],
    highlights: ["Sohrai art murals", "Cattle processions", "Wall painting workshops", "Cultural exhibitions"],
    arFiltersAvailable: true,
    vrExperience: true,
    images: ["/sohrai-festival.jpg"],
    duration: "4-5 days",
    participants: "Entire community, especially women artists",
    bestTimeToVisit: "Morning for art creation, evening for celebrations",
    culturalElements: ["Wall painting art", "Cattle decoration", "Traditional motifs", "Community art"],
    foodSpecialties: ["Rice-based dishes", "Milk products", "Traditional sweets", "Seasonal vegetables"],
    musicAndDance: ["Folk songs", "Traditional dances", "Celebration music", "Community singing"],
    ecoFriendly: true,
  },
  {
    id: "4",
    name: "Tusu",
    type: "tribal",
    season: "winter",
    dates: "December-January (Poush month)",
    nextDate: new Date("2024-12-15"),
    location: "Purulia border areas and tribal villages",
    description: "Winter harvest festival featuring Tusu dolls, folk songs, and community celebrations.",
    significance: "Celebrating the harvest season and honoring the goddess Tusu for prosperity",
    rituals: ["Tusu doll making", "Folk song competitions", "Community processions", "River immersion ceremony"],
    highlights: ["Tusu doll crafting", "Folk song performances", "Cultural competitions", "Traditional crafts"],
    arFiltersAvailable: false,
    vrExperience: false,
    images: ["/tusu-festival.jpg"],
    duration: "15-20 days",
    participants: "Young girls and women primarily",
    bestTimeToVisit: "Evening for cultural programs and competitions",
    culturalElements: ["Doll making", "Folk songs", "Traditional crafts", "Community participation"],
    foodSpecialties: ["Pitha varieties", "Date palm jaggery", "Seasonal fruits", "Traditional snacks"],
    musicAndDance: ["Tusu songs", "Folk melodies", "Traditional instruments", "Group singing"],
    ecoFriendly: true,
  },
  {
    id: "5",
    name: "Mage Parab",
    type: "tribal",
    season: "winter",
    dates: "January (Magh month)",
    nextDate: new Date("2024-01-14"),
    location: "Santhal tribal areas",
    description:
      "Santhal tribal festival marking the end of harvest season with traditional dances and community bonding.",
    significance: "Thanksgiving for successful harvest and strengthening community bonds",
    rituals: ["Community gathering", "Traditional Santhal dance", "Ancestor worship", "Feast preparation"],
    highlights: ["Santhal cultural dance", "Traditional music", "Community feast", "Cultural storytelling"],
    arFiltersAvailable: true,
    vrExperience: false,
    images: ["/mage-parab-festival.jpg"],
    duration: "2-3 days",
    participants: "Santhal tribal community",
    bestTimeToVisit: "Evening for dance performances and cultural activities",
    culturalElements: ["Santhal traditions", "Ancestral worship", "Community bonding", "Cultural preservation"],
    foodSpecialties: ["Traditional Santhal cuisine", "Rice beer", "Seasonal vegetables", "Community prepared meals"],
    musicAndDance: ["Santhal folk dance", "Traditional drums", "Folk songs", "Cultural performances"],
    ecoFriendly: true,
  },
  {
    id: "6",
    name: "Shrawani Mela",
    type: "religious",
    season: "monsoon",
    dates: "July-August (Shravan month)",
    nextDate: new Date("2024-07-22"),
    location: "Deoghar (Baba Baidyanath Temple)",
    description:
      "Major Hindu pilgrimage festival where devotees carry holy water from Ganges to offer at Baidyanath Temple.",
    significance: "One of the most important Shiva festivals, attracting millions of devotees",
    rituals: ["Ganga water carrying", "Temple offerings", "Continuous chanting", "Pilgrimage journey"],
    highlights: ["Kanwar Yatra", "Temple ceremonies", "Devotional singing", "Cultural programs"],
    arFiltersAvailable: false,
    vrExperience: true,
    images: ["/shrawani-mela.jpg"],
    duration: "1 month",
    participants: "Millions of Hindu devotees",
    bestTimeToVisit: "Early morning for temple visits, avoid peak crowd times",
    culturalElements: ["Religious processions", "Devotional music", "Temple architecture", "Pilgrimage traditions"],
    foodSpecialties: ["Prasad", "Vegetarian meals", "Traditional sweets", "Holy offerings"],
    musicAndDance: ["Devotional songs", "Bhajans", "Religious chanting", "Cultural performances"],
    ecoFriendly: false,
  },
  {
    id: "7",
    name: "Chhath Puja",
    type: "religious",
    season: "autumn",
    dates: "October-November (Kartik month)",
    nextDate: new Date("2024-11-07"),
    location: "River banks and water bodies across Jharkhand",
    description:
      "Ancient Hindu festival dedicated to Sun God and Chhathi Maiya, involving rigorous fasting and water rituals.",
    significance: "Worship of Sun God for health, prosperity, and well-being of family",
    rituals: ["River worship", "Standing in water", "Offering to Sun", "Community prayers"],
    highlights: ["River ceremonies", "Traditional songs", "Community participation", "Cultural unity"],
    arFiltersAvailable: false,
    vrExperience: false,
    images: ["/chhath-puja.jpg"],
    duration: "4 days",
    participants: "Hindu families, especially women",
    bestTimeToVisit: "Early morning and evening for main rituals",
    culturalElements: ["Water worship", "Traditional attire", "Community gathering", "Religious devotion"],
    foodSpecialties: ["Thekua", "Kheer", "Fruits", "Traditional offerings"],
    musicAndDance: ["Chhath songs", "Folk melodies", "Devotional music", "Traditional singing"],
    ecoFriendly: true,
  },
]

export function CulturalFestivals() {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null)
  const [filterType, setFilterType] = useState<"all" | "tribal" | "religious">("all")
  const [filterSeason, setFilterSeason] = useState<"all" | "spring" | "summer" | "monsoon" | "autumn" | "winter">("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const filteredFestivals = festivals.filter((festival) => {
    const typeMatch = filterType === "all" || festival.type === filterType
    const seasonMatch = filterSeason === "all" || festival.season === filterSeason
    return typeMatch && seasonMatch
  })

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case "spring":
        return <Flower className="h-4 w-4" />
      case "summer":
        return <Sun className="h-4 w-4" />
      case "monsoon":
        return <TreePine className="h-4 w-4" />
      case "autumn":
        return <Star className="h-4 w-4" />
      case "winter":
        return <Moon className="h-4 w-4" />
      default:
        return <CalendarIcon className="h-4 w-4" />
    }
  }

  const getSeasonColor = (season: string) => {
    switch (season) {
      case "spring":
        return "bg-pink-100 text-pink-700"
      case "summer":
        return "bg-yellow-100 text-yellow-700"
      case "monsoon":
        return "bg-green-100 text-green-700"
      case "autumn":
        return "bg-orange-100 text-orange-700"
      case "winter":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Palette className="h-4 w-4 mr-2" />
            Cultural Heritage
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Festivals & Cultural Celebrations</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Experience the vibrant tribal festivals and religious celebrations that showcase Jharkhand's rich cultural
            tapestry and deep connection with nature.
          </p>
        </div>

        <Tabs defaultValue="festivals" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="festivals">Festival Gallery</TabsTrigger>
            <TabsTrigger value="calendar">Festival Calendar</TabsTrigger>
            <TabsTrigger value="experiences">AR/VR Experiences</TabsTrigger>
          </TabsList>

          <TabsContent value="festivals" className="space-y-8">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Festival Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Festivals</SelectItem>
                  <SelectItem value="tribal">Tribal Festivals</SelectItem>
                  <SelectItem value="religious">Religious Festivals</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterSeason} onValueChange={(value: any) => setFilterSeason(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Seasons</SelectItem>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="monsoon">Monsoon</SelectItem>
                  <SelectItem value="autumn">Autumn</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                </SelectContent>
              </Select>

              <Badge variant="outline" className="px-3 py-1">
                {filteredFestivals.length} festivals found
              </Badge>
            </div>

            {/* Festival Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFestivals.map((festival) => (
                <Card
                  key={festival.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedFestival(festival)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={festival.images[0] || "/placeholder.svg"}
                      alt={festival.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={getSeasonColor(festival.season)}>
                        {getSeasonIcon(festival.season)}
                        <span className="ml-1 capitalize">{festival.season}</span>
                      </Badge>
                      <Badge variant={festival.type === "tribal" ? "default" : "secondary"}>
                        {festival.type === "tribal" ? "Tribal" : "Religious"}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      {festival.arFiltersAvailable && (
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          <Eye className="h-3 w-3 mr-1" />
                          AR
                        </Badge>
                      )}
                      {festival.vrExperience && (
                        <Badge variant="secondary" className="bg-accent/20 text-accent">
                          <Play className="h-3 w-3 mr-1" />
                          VR
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{festival.name}</h3>
                      {festival.ecoFriendly && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <TreePine className="h-3 w-3 mr-1" />
                          Eco
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{festival.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {festival.dates}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {festival.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {festival.duration}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {festival.highlights.slice(0, 2).map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {festival.highlights.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{festival.highlights.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Festival Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Festivals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {festivals
                      .sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime())
                      .slice(0, 5)
                      .map((festival) => (
                        <div
                          key={festival.id}
                          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{festival.nextDate.getDate()}</div>
                            <div className="text-xs text-muted-foreground">
                              {festival.nextDate.toLocaleDateString("en-US", { month: "short" })}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{festival.name}</h4>
                              <Badge className={getSeasonColor(festival.season)} variant="outline">
                                {festival.season}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{festival.location}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{festival.description}</p>
                          </div>
                          <div className="flex gap-2">
                            {festival.arFiltersAvailable && (
                              <Badge variant="secondary" className="text-xs">
                                AR
                              </Badge>
                            )}
                            {festival.vrExperience && (
                              <Badge variant="secondary" className="text-xs">
                                VR
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experiences" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {festivals
                .filter((f) => f.arFiltersAvailable || f.vrExperience)
                .map((festival) => (
                  <Card key={festival.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={festival.images[0] || "/placeholder.svg"}
                        alt={festival.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Play className="h-16 w-16 mx-auto mb-4" />
                          <h3 className="text-xl font-bold mb-2">{festival.name}</h3>
                          <p className="text-sm opacity-90">Immersive Cultural Experience</p>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        {festival.arFiltersAvailable && (
                          <Badge className="bg-primary">
                            <Eye className="h-3 w-3 mr-1" />
                            AR Filters
                          </Badge>
                        )}
                        {festival.vrExperience && (
                          <Badge className="bg-accent">
                            <Play className="h-3 w-3 mr-1" />
                            VR Experience
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2">Available Experiences</h4>
                      <div className="space-y-3">
                        {festival.arFiltersAvailable && (
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Eye className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">AR Festival Filters</p>
                              <p className="text-sm text-muted-foreground">Try traditional attire and decorations</p>
                            </div>
                          </div>
                        )}
                        {festival.vrExperience && (
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/10 rounded-lg">
                              <Play className="h-4 w-4 text-accent" />
                            </div>
                            <div>
                              <p className="font-medium">VR Cultural Immersion</p>
                              <p className="text-sm text-muted-foreground">360° festival experience and rituals</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <Button className="w-full mt-4">
                        <Camera className="h-4 w-4 mr-2" />
                        Launch Experience
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Festival Detail Modal */}
        {selectedFestival && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedFestival(null)}
          >
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="relative">
                <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={selectedFestival.images[0] || "/placeholder.svg"}
                    alt={selectedFestival.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={getSeasonColor(selectedFestival.season)}>
                      {getSeasonIcon(selectedFestival.season)}
                      <span className="ml-1 capitalize">{selectedFestival.season}</span>
                    </Badge>
                    <Badge variant={selectedFestival.type === "tribal" ? "default" : "secondary"}>
                      {selectedFestival.type === "tribal" ? "Tribal" : "Religious"}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button variant="secondary" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setSelectedFestival(null)}>
                      ×
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-2xl">{selectedFestival.name}</CardTitle>
                <p className="text-muted-foreground">{selectedFestival.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Festival Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedFestival.dates}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedFestival.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedFestival.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedFestival.participants}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Cultural Significance</h4>
                      <p className="text-sm text-muted-foreground">{selectedFestival.significance}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Key Rituals</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {selectedFestival.rituals.map((ritual, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                            {ritual}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Festival Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFestival.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Music & Dance</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFestival.musicAndDance.map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Music className="h-3 w-3 mr-1" />
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Traditional Food</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFestival.foodSpecialties.map((food, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {food}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Best Time to Visit</h4>
                      <p className="text-sm text-muted-foreground">{selectedFestival.bestTimeToVisit}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-4">
                  <Button className="flex-1">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Add to Itinerary
                  </Button>
                  {selectedFestival.arFiltersAvailable && (
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Try AR Filters
                    </Button>
                  )}
                  {selectedFestival.vrExperience && (
                    <Button variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      VR Experience
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
