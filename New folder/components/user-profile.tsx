"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Calendar,
  Star,
  Heart,
  Camera,
  Shield,
  Leaf,
  Award,
  Edit,
  Share2,
  MessageCircle,
  TrendingUp,
} from "lucide-react"

const userData = {
  profile: {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    avatar: "/user-avatar.jpg",
    joinDate: "March 2024",
    location: "Mumbai, Maharashtra",
    bio: "Passionate traveler exploring India's cultural heritage. Love sustainable tourism and supporting local communities.",
    stats: {
      tripsCompleted: 12,
      placesVisited: 28,
      reviewsWritten: 45,
      photosShared: 156,
      ecoScore: 85,
      culturalBadges: 8,
    },
    preferences: {
      travelStyle: ["Cultural", "Eco-friendly", "Adventure"],
      interests: ["Tribal Art", "Local Cuisine", "Handicrafts", "Festivals"],
      budget: "Mid-range",
      groupSize: "Small groups (2-6)",
      accommodation: "Eco-lodges",
      transport: "Public transport",
    },
  },
  trips: [
    {
      id: 1,
      destination: "Ranchi & Surroundings",
      dates: "Dec 15-20, 2024",
      status: "completed",
      rating: 5,
      highlights: ["Hundru Falls", "Jagannath Temple", "Tribal Museum"],
      photos: 24,
      review: "Amazing cultural immersion! The tribal art workshops were incredible.",
      ecoScore: 92,
    },
    {
      id: 2,
      destination: "Hazaribagh Wildlife Sanctuary",
      dates: "Nov 8-12, 2024",
      status: "completed",
      rating: 4,
      highlights: ["Wildlife Safari", "Canopy Walk", "Bird Watching"],
      photos: 18,
      review: "Great wildlife experience with responsible tourism practices.",
      ecoScore: 88,
    },
    {
      id: 3,
      destination: "Deoghar Temple Circuit",
      dates: "Jan 15-18, 2025",
      status: "upcoming",
      highlights: ["Baidyanath Temple", "Nandan Pahar", "Tapovan"],
      bookingRef: "JH2025001",
    },
  ],
  reviews: [
    {
      id: 1,
      place: "Sohrai Art Village Experience",
      rating: 5,
      date: "Dec 18, 2024",
      review:
        "Absolutely magical experience learning traditional Sohrai painting from local women artisans. The stories behind each motif were fascinating.",
      photos: ["sohrai-1.jpg", "sohrai-2.jpg"],
      helpful: 23,
      verified: true,
    },
    {
      id: 2,
      place: "Tribal Flavors Restaurant",
      rating: 4,
      date: "Dec 16, 2024",
      review:
        "Authentic tribal cuisine with great ambiance. The Dhuska was perfectly crispy and the Handia was a unique experience.",
      photos: ["food-1.jpg"],
      helpful: 18,
      verified: true,
    },
  ],
  achievements: [
    { name: "Cultural Explorer", description: "Visited 5+ cultural sites", icon: "🏛️", earned: true },
    { name: "Eco Warrior", description: "Maintained 80+ eco score", icon: "🌱", earned: true },
    { name: "Local Supporter", description: "Purchased from 10+ local artisans", icon: "🛍️", earned: true },
    { name: "Festival Enthusiast", description: "Attended 3+ festivals", icon: "🎭", earned: false },
    { name: "Adventure Seeker", description: "Completed 5+ adventure activities", icon: "🏔️", earned: false },
    { name: "Photo Storyteller", description: "Shared 100+ photos", icon: "📸", earned: true },
  ],
  socialActivity: [
    {
      type: "review",
      content: "Shared a review for Hundru Falls",
      timestamp: "2 hours ago",
      engagement: { likes: 12, comments: 3 },
    },
    {
      type: "photo",
      content: "Posted 5 photos from Ranchi trip",
      timestamp: "1 day ago",
      engagement: { likes: 28, comments: 7 },
    },
    {
      type: "achievement",
      content: "Earned 'Local Supporter' badge",
      timestamp: "3 days ago",
      engagement: { likes: 15, comments: 2 },
    },
  ],
}

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(userData.profile)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                  <AvatarFallback className="text-2xl">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 bg-transparent">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">{profileData.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profileData.location}</span>
                      <span>•</span>
                      <span>Joined {profileData.joinDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Profile
                    </Button>
                    <Button size="sm" onClick={() => setIsEditing(!isEditing)}>
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? "Save" : "Edit Profile"}
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{profileData.bio}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{profileData.stats.tripsCompleted}</div>
                    <div className="text-xs text-muted-foreground">Trips</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{profileData.stats.placesVisited}</div>
                    <div className="text-xs text-muted-foreground">Places</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{profileData.stats.reviewsWritten}</div>
                    <div className="text-xs text-muted-foreground">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{profileData.stats.photosShared}</div>
                    <div className="text-xs text-muted-foreground">Photos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{profileData.stats.ecoScore}</div>
                    <div className="text-xs text-muted-foreground">Eco Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{profileData.stats.culturalBadges}</div>
                    <div className="text-xs text-muted-foreground">Badges</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Travel Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Travel Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Travel Style</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profileData.preferences.travelStyle.map((style, index) => (
                        <Badge key={index} variant="secondary">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Interests</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profileData.preferences.interests.map((interest, index) => (
                        <Badge key={index} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <Label>Budget</Label>
                      <p className="text-muted-foreground">{profileData.preferences.budget}</p>
                    </div>
                    <div>
                      <Label>Group Size</Label>
                      <p className="text-muted-foreground">{profileData.preferences.groupSize}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.socialActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        <div className="flex-1">
                          <p className="text-sm">{activity.content}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <span>{activity.timestamp}</span>
                            <span>{activity.engagement.likes} likes</span>
                            <span>{activity.engagement.comments} comments</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Eco Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    Eco Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Overall Eco Score</Label>
                      <span className="text-2xl font-bold text-green-600">{profileData.stats.ecoScore}</span>
                    </div>
                    <Progress value={profileData.stats.ecoScore} className="h-2" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Carbon Footprint Saved</span>
                      <span className="font-medium">2.4 tons CO₂</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Local Communities Supported</span>
                      <span className="font-medium">15 villages</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sustainable Choices</span>
                      <span className="font-medium">89%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trips" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.trips.map((trip) => (
                <Card key={trip.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{trip.destination}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Calendar className="h-4 w-4" />
                          {trip.dates}
                        </div>
                      </div>
                      <Badge variant={trip.status === "completed" ? "secondary" : "default"}>{trip.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Highlights</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {trip.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {trip.status === "completed" && (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{trip.rating}/5</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{trip.photos} photos</span>
                            <div className="flex items-center gap-1">
                              <Leaf className="h-4 w-4 text-green-600" />
                              <span>{trip.ecoScore}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{trip.review}</p>
                      </>
                    )}

                    {trip.status === "upcoming" && (
                      <div className="text-sm text-muted-foreground">Booking Reference: {trip.bookingRef}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-6">
              {userData.reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{review.place}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{review.review}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{review.photos.length} photos</span>
                        <span>{review.helpful} found helpful</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.achievements.map((achievement, index) => (
                <Card key={index} className={`${achievement.earned ? "border-primary" : "opacity-60"}`}>
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="font-semibold mb-2">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    {achievement.earned ? (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <Award className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    ) : (
                      <Badge variant="outline">In Progress</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={profileData.name} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={profileData.email} />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={profileData.location} />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" value={profileData.bio} rows={3} />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy & Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Public Profile</Label>
                        <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Trip Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get updates about your bookings</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Receive travel deals and updates</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Social Features</Label>
                        <p className="text-sm text-muted-foreground">Allow others to see your activity</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
