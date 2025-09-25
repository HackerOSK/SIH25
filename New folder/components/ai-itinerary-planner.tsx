"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Leaf,
  Star,
  MessageCircle,
  Download,
  Share,
  Heart,
  Utensils,
  Home,
  Car,
} from "lucide-react"

interface ItineraryDay {
  day: number
  title: string
  activities: Activity[]
  ecoScore: number
  totalCost: number
}

interface Activity {
  time: string
  title: string
  location: string
  description: string
  type: "cultural" | "nature" | "food" | "accommodation" | "transport"
  cost: number
  ecoScore: number
  duration: string
  highlights: string[]
}

export function AIItineraryPlanner() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "ai"; message: string }>>([])
  const [chatInput, setChatInput] = useState("")

  // Mock generated itinerary data
  const mockItinerary: ItineraryDay[] = [
    {
      day: 1,
      title: "Cultural Immersion in Ranchi",
      ecoScore: 85,
      totalCost: 3500,
      activities: [
        {
          time: "09:00 AM",
          title: "Tribal Museum Visit",
          location: "Ranchi Tribal Museum",
          description: "Explore authentic Sohrai and Kohbar art collections with AR-guided tours",
          type: "cultural",
          cost: 200,
          ecoScore: 90,
          duration: "2 hours",
          highlights: ["AR Art Experience", "Tribal History", "Interactive Displays"],
        },
        {
          time: "12:00 PM",
          title: "Traditional Lunch",
          location: "Tribal Heritage Restaurant",
          description: "Authentic Jharkhand cuisine featuring Dhuska, Pitha, and Handia",
          type: "food",
          cost: 800,
          ecoScore: 80,
          duration: "1.5 hours",
          highlights: ["Local Ingredients", "Traditional Recipes", "Cultural Storytelling"],
        },
        {
          time: "02:30 PM",
          title: "Jagannath Temple",
          location: "Jagannath Temple, Ranchi",
          description: "Historic temple with spiritual significance and architectural beauty",
          type: "cultural",
          cost: 0,
          ecoScore: 95,
          duration: "1 hour",
          highlights: ["Spiritual Experience", "Architecture", "Local Traditions"],
        },
        {
          time: "06:00 PM",
          title: "Eco-Lodge Check-in",
          location: "Green Valley Eco Lodge",
          description: "Sustainable accommodation with tribal-inspired architecture",
          type: "accommodation",
          cost: 2500,
          ecoScore: 85,
          duration: "Evening",
          highlights: ["Eco-Friendly", "Local Materials", "Cultural Design"],
        },
      ],
    },
    {
      day: 2,
      title: "Nature & Waterfalls Adventure",
      ecoScore: 92,
      totalCost: 2800,
      activities: [
        {
          time: "07:00 AM",
          title: "Hundru Falls Trek",
          location: "Hundru Falls",
          description: "Scenic waterfall trek with 360° VR experience points",
          type: "nature",
          cost: 500,
          ecoScore: 95,
          duration: "4 hours",
          highlights: ["Waterfall Views", "VR Experience", "Nature Photography"],
        },
        {
          time: "01:00 PM",
          title: "Eco-Friendly Transport",
          location: "Electric Vehicle Tour",
          description: "Sustainable transport to Jonha Falls with minimal carbon footprint",
          type: "transport",
          cost: 800,
          ecoScore: 90,
          duration: "2 hours",
          highlights: ["Zero Emissions", "Scenic Route", "Local Guide"],
        },
        {
          time: "03:30 PM",
          title: "Jonha Falls Experience",
          location: "Jonha Falls",
          description: "Multi-tiered waterfall with tribal legends and AR storytelling",
          type: "nature",
          cost: 300,
          ecoScore: 90,
          duration: "3 hours",
          highlights: ["AR Storytelling", "Tribal Legends", "Natural Beauty"],
        },
      ],
    },
  ]

  const handleGenerateItinerary = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
    setShowResults(true)
  }

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return

    setChatMessages((prev) => [...prev, { role: "user", message: chatInput }])

    // Mock AI response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          message:
            "I'd be happy to help customize your itinerary! Based on your interest in tribal culture, I recommend adding a visit to a local Santali village where you can participate in traditional pottery making. This would increase your eco-score and provide authentic cultural immersion. Would you like me to add this to day 2?",
        },
      ])
    }, 1000)

    setChatInput("")
  }

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "cultural":
        return <Star className="h-4 w-4" />
      case "nature":
        return <Leaf className="h-4 w-4" />
      case "food":
        return <Utensils className="h-4 w-4" />
      case "accommodation":
        return <Home className="h-4 w-4" />
      case "transport":
        return <Car className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getEcoScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  if (!showResults) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Planning
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Create Your Perfect Jharkhand Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Our AI analyzes your preferences, cultural interests, and eco-consciousness to craft personalized
              itineraries with real-time eco-scoring.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                AI Itinerary Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Primary Interests</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your main interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cultural">Tribal Culture & Festivals</SelectItem>
                        <SelectItem value="nature">Nature & Waterfalls</SelectItem>
                        <SelectItem value="spiritual">Spiritual Journey</SelectItem>
                        <SelectItem value="adventure">Adventure Sports</SelectItem>
                        <SelectItem value="photography">Photography Tour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Eco-Consciousness Level</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="How important is sustainability?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Very Important - Maximize eco-score</SelectItem>
                        <SelectItem value="medium">Moderately Important</SelectItem>
                        <SelectItem value="low">Not a priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Cultural Immersion Preference</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Level of cultural engagement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deep">Deep Immersion - Stay with tribal families</SelectItem>
                        <SelectItem value="moderate">Moderate - Cultural sites & experiences</SelectItem>
                        <SelectItem value="light">Light - Tourist-friendly cultural spots</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Physical Activity Level</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Your activity preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High - Trekking & adventure sports</SelectItem>
                        <SelectItem value="medium">Medium - Moderate walking & hiking</SelectItem>
                        <SelectItem value="low">Low - Minimal physical activity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Food Adventure Level</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Culinary exploration preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adventurous">Adventurous - Try everything local</SelectItem>
                        <SelectItem value="moderate">Moderate - Some local dishes</SelectItem>
                        <SelectItem value="safe">Safe - Familiar foods preferred</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Special Interests</label>
                    <Input placeholder="e.g., Photography, Handicrafts, Meditation..." />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-center">
                <Button size="lg" onClick={handleGenerateItinerary} disabled={isGenerating} className="px-8">
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                      Generating Your Perfect Journey...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate AI Itinerary
                    </>
                  )}
                </Button>
              </div>

              {isGenerating && (
                <div className="space-y-4">
                  <div className="text-center text-sm text-muted-foreground">
                    AI is analyzing your preferences and creating personalized recommendations...
                  </div>
                  <Progress value={66} className="w-full" />
                  <div className="text-xs text-muted-foreground text-center">
                    Processing cultural sites, eco-scores, and local experiences
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Itinerary */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your AI-Generated Itinerary</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />2 Days
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ₹6,300 Total
                  </span>
                  <span className={`flex items-center ${getEcoScoreColor(88)}`}>
                    <Leaf className="h-4 w-4 mr-1" />
                    88% Eco-Score
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="timeline">Timeline View</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="budget">Budget Breakdown</TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="space-y-6">
                {mockItinerary.map((day) => (
                  <Card key={day.day} className="overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <Badge variant="outline" className="mr-3">
                            Day {day.day}
                          </Badge>
                          {day.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />₹{day.totalCost}
                          </span>
                          <span className={`flex items-center ${getEcoScoreColor(day.ecoScore)}`}>
                            <Leaf className="h-4 w-4 mr-1" />
                            {day.ecoScore}%
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      {day.activities.map((activity, index) => (
                        <div key={index} className="p-6 border-b last:border-b-0">
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <Badge variant="outline" className="text-xs px-2 py-1">
                                {activity.time}
                              </Badge>
                              {index < day.activities.length - 1 && <div className="w-px h-16 bg-border mt-4" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {getActivityIcon(activity.type)}
                                  <h4 className="font-semibold">{activity.title}</h4>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {activity.duration}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {activity.location}
                              </p>
                              <p className="text-sm mb-3">{activity.description}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {activity.highlights.map((highlight, highlightIndex) => (
                                  <Badge key={highlightIndex} variant="secondary" className="text-xs">
                                    {highlight}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center">
                                  <DollarSign className="h-3 w-3 mr-1" />₹{activity.cost}
                                </span>
                                <span className={`flex items-center ${getEcoScoreColor(activity.ecoScore)}`}>
                                  <Leaf className="h-3 w-3 mr-1" />
                                  {activity.ecoScore}% eco-score
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="map">
                <Card>
                  <CardContent className="p-8">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="h-16 w-16 mx-auto mb-4" />
                        <p>Interactive Map with Route Planning</p>
                        <p className="text-sm">{"[OpenStreetMap + Leaflet.js Integration]"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="budget">
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Accommodation</span>
                        <span className="font-semibold">₹2,500</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Food & Dining</span>
                        <span className="font-semibold">₹800</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Transportation</span>
                        <span className="font-semibold">₹800</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Activities & Experiences</span>
                        <span className="font-semibold">₹1,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Miscellaneous</span>
                        <span className="font-semibold">₹1,200</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span>₹6,300</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Chatbot Sidebar */}
          <div className="lg:w-80">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                  AI Travel Assistant
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Ask questions or request modifications to your itinerary
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-64 overflow-y-auto space-y-3 p-3 bg-muted/30 rounded-lg">
                  <div className="text-sm bg-primary/10 text-primary p-3 rounded-lg">
                    <strong>AI Assistant:</strong> Your personalized itinerary is ready! I've focused on cultural
                    immersion and eco-friendly options as requested. How can I help you customize it further?
                  </div>
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`text-sm p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-secondary text-secondary-foreground ml-4"
                          : "bg-primary/10 text-primary mr-4"
                      }`}
                    >
                      <strong>{msg.role === "user" ? "You:" : "AI Assistant:"}</strong> {msg.message}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about your itinerary..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                  />
                  <Button size="sm" onClick={handleChatSubmit}>
                    Send
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">Available in: English, Hindi, Marathi, Santali</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
