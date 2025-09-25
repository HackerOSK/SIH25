"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, MapPin, Clock, Users, Utensils, Leaf, Star, ChefHat } from "lucide-react"

const cuisineData = {
  traditional: [
    {
      id: 1,
      name: "Dhuska",
      description: "Deep-fried rice and lentil pancakes, crispy outside and soft inside",
      image: "/dhuska-jharkhand.jpg",
      ingredients: ["Rice", "Black gram dal", "Ginger", "Green chilies", "Oil"],
      cookingTime: "45 mins",
      difficulty: "Medium",
      region: "Ranchi",
      story: "A beloved breakfast dish that originated in tribal kitchens, traditionally cooked on wood fires",
      nutritionalInfo: { calories: 180, protein: "8g", carbs: "25g", fat: "6g" },
      ecoScore: 85,
      availability: "Year-round",
    },
    {
      id: 2,
      name: "Pittha",
      description: "Steamed rice dumplings filled with jaggery and coconut",
      image: "/pittha-jharkhand.jpg",
      ingredients: ["Rice flour", "Jaggery", "Coconut", "Cardamom", "Ghee"],
      cookingTime: "30 mins",
      difficulty: "Easy",
      region: "Dhanbad",
      story: "Festival special sweet prepared during Chhath Puja and other celebrations",
      nutritionalInfo: { calories: 220, protein: "4g", carbs: "45g", fat: "4g" },
      ecoScore: 90,
      availability: "Festival seasons",
    },
    {
      id: 3,
      name: "Rugra",
      description: "Wild mushroom curry cooked with traditional spices",
      image: "/rugra-mushroom.jpg",
      ingredients: ["Wild mushrooms", "Onions", "Turmeric", "Red chilies", "Mustard oil"],
      cookingTime: "25 mins",
      difficulty: "Easy",
      region: "Tribal areas",
      story: "Foraged from forests during monsoon, this dish connects tribes to their natural environment",
      nutritionalInfo: { calories: 120, protein: "12g", carbs: "8g", fat: "5g" },
      ecoScore: 95,
      availability: "Monsoon season",
    },
    {
      id: 4,
      name: "Chilka Roti",
      description: "Thin rice flour flatbread cooked on clay griddles",
      image: "/chilka-roti.jpg",
      ingredients: ["Rice flour", "Water", "Salt", "Ghee"],
      cookingTime: "20 mins",
      difficulty: "Medium",
      region: "Santhal Pargana",
      story: "Ancient tribal bread technique passed down through generations",
      nutritionalInfo: { calories: 150, protein: "3g", carbs: "30g", fat: "2g" },
      ecoScore: 88,
      availability: "Year-round",
    },
    {
      id: 5,
      name: "Handia",
      description: "Traditional fermented rice beer with medicinal herbs",
      image: "/handia-rice-beer.jpg",
      ingredients: ["Rice", "Ranu tablets", "Water", "Traditional herbs"],
      cookingTime: "3-7 days",
      difficulty: "Hard",
      region: "All tribal areas",
      story: "Sacred drink used in rituals and celebrations, believed to have healing properties",
      nutritionalInfo: { calories: 80, protein: "1g", carbs: "15g", fat: "0g" },
      ecoScore: 92,
      availability: "Year-round",
    },
    {
      id: 6,
      name: "Bamboo Shoot Curry",
      description: "Fresh bamboo shoots cooked in mustard oil with spices",
      image: "/bamboo-shoot-curry.jpg",
      ingredients: ["Bamboo shoots", "Mustard oil", "Turmeric", "Green chilies", "Garlic"],
      cookingTime: "35 mins",
      difficulty: "Medium",
      region: "Forest areas",
      story: "Sustainable forest ingredient that showcases tribal knowledge of edible plants",
      nutritionalInfo: { calories: 95, protein: "6g", carbs: "12g", fat: "3g" },
      ecoScore: 98,
      availability: "Monsoon season",
    },
  ],
  experiences: [
    {
      id: 1,
      name: "Tribal Cooking Workshop",
      location: "Ranchi Cultural Center",
      duration: "4 hours",
      price: "₹1,500",
      rating: 4.8,
      participants: "Max 12",
      includes: ["Hands-on cooking", "Traditional utensils", "Recipe booklet", "Lunch"],
      highlights: ["Learn clay pot cooking", "Forage ingredients", "Traditional fire methods"],
    },
    {
      id: 2,
      name: "Forest to Table Experience",
      location: "Betla National Park",
      duration: "Full day",
      price: "₹2,800",
      rating: 4.9,
      participants: "Max 8",
      includes: ["Guided foraging", "Outdoor cooking", "Nature walk", "All meals"],
      highlights: ["Wild ingredient identification", "Sustainable harvesting", "Tribal guide stories"],
    },
    {
      id: 3,
      name: "Festival Food Journey",
      location: "Multiple villages",
      duration: "2 days",
      price: "₹4,200",
      rating: 4.7,
      participants: "Max 15",
      includes: ["Village homestay", "Festival participation", "Cooking sessions", "Cultural performances"],
      highlights: ["Authentic festival foods", "Community cooking", "Traditional recipes"],
    },
  ],
  restaurants: [
    {
      id: 1,
      name: "Tribal Flavors",
      location: "Main Road, Ranchi",
      cuisine: "Traditional Jharkhand",
      rating: 4.6,
      priceRange: "₹₹",
      specialties: ["Dhuska", "Rugra curry", "Handia"],
      ambiance: "Traditional tribal decor",
      ecoFriendly: true,
    },
    {
      id: 2,
      name: "Forest Kitchen",
      location: "Jamshedpur",
      cuisine: "Tribal Fusion",
      rating: 4.4,
      priceRange: "₹₹₹",
      specialties: ["Bamboo shoot delicacies", "Wild mushroom varieties"],
      ambiance: "Modern with tribal art",
      ecoFriendly: true,
    },
  ],
}

export default function FoodCuisine() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("traditional")
  const [selectedDish, setSelectedDish] = useState(null)

  const filteredDishes = cuisineData.traditional.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-primary/90 to-secondary/90 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-balance">Taste of Jharkhand</h1>
          <p className="text-xl text-balance">
            Discover the rich culinary heritage of tribal communities through authentic flavors and sustainable
            practices
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search dishes, ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="traditional">Traditional Dishes</TabsTrigger>
            <TabsTrigger value="experiences">Culinary Experiences</TabsTrigger>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          </TabsList>

          <TabsContent value="traditional">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => (
                <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={dish.image || "/placeholder.svg"}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/90">
                        <Leaf className="h-3 w-3 mr-1" />
                        {dish.ecoScore}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{dish.name}</CardTitle>
                      <Badge variant="outline">{dish.region}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{dish.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {dish.cookingTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="h-4 w-4" />
                        {dish.difficulty}
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full bg-transparent">
                          View Recipe & Story
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{dish.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <img
                            src={dish.image || "/placeholder.svg"}
                            alt={dish.name}
                            className="w-full h-64 object-cover rounded-lg"
                          />

                          <div>
                            <h4 className="font-semibold mb-2">Cultural Story</h4>
                            <p className="text-muted-foreground">{dish.story}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Ingredients</h4>
                              <ul className="text-sm space-y-1">
                                {dish.ingredients.map((ingredient, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                    {ingredient}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Nutrition (per serving)</h4>
                              <div className="text-sm space-y-1">
                                <div>Calories: {dish.nutritionalInfo.calories}</div>
                                <div>Protein: {dish.nutritionalInfo.protein}</div>
                                <div>Carbs: {dish.nutritionalInfo.carbs}</div>
                                <div>Fat: {dish.nutritionalInfo.fat}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2">
                              <Leaf className="h-4 w-4 text-green-600" />
                              <span className="text-sm">Eco Score: {dish.ecoScore}/100</span>
                            </div>
                            <Badge variant="secondary">{dish.availability}</Badge>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experiences">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cuisineData.experiences.map((experience) => (
                <Card key={experience.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {experience.name}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{experience.rating}</span>
                      </div>
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {experience.location}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {experience.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {experience.participants}
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-primary">{experience.price}</div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Includes</h4>
                      <ul className="text-sm space-y-1">
                        {experience.includes.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Highlights</h4>
                      <div className="flex flex-wrap gap-1">
                        {experience.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full">Book Experience</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="restaurants">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cuisineData.restaurants.map((restaurant) => (
                <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {restaurant.name}
                          {restaurant.ecoFriendly && <Leaf className="h-4 w-4 text-green-600" />}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          {restaurant.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{restaurant.rating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{restaurant.priceRange}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Badge variant="outline">{restaurant.cuisine}</Badge>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-1">
                        {restaurant.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-1">Ambiance</h4>
                      <p className="text-sm text-muted-foreground">{restaurant.ambiance}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <MapPin className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                      <Button className="flex-1">
                        <Utensils className="h-4 w-4 mr-2" />
                        Reserve Table
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
