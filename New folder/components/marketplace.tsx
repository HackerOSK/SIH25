"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Heart, ShoppingCart, MapPin, Truck, Shield, Leaf, Award, User } from "lucide-react"

const marketplaceData = {
  handicrafts: [
    {
      id: 1,
      name: "Sohrai Wall Art Canvas",
      description: "Hand-painted traditional Sohrai art on canvas by tribal women artisans",
      image: "/sohrai-wall-art.jpg",
      price: 2500,
      originalPrice: 3200,
      rating: 4.8,
      reviews: 124,
      artisan: "Kamala Devi",
      village: "Hazaribagh",
      category: "Wall Art",
      materials: ["Natural pigments", "Cotton canvas", "Bamboo frame"],
      dimensions: "24x18 inches",
      ecoScore: 95,
      certifications: ["Fair Trade", "Eco-Friendly"],
      inStock: true,
      fastDelivery: true,
      story:
        "This artwork represents the ancient Sohrai tradition where tribal women paint their homes during harvest festivals. Each piece tells a story of nature, fertility, and celebration.",
    },
    {
      id: 2,
      name: "Dokra Metal Figurine Set",
      description: "Traditional lost-wax casting technique figurines depicting tribal life",
      image: "/dokra-figurines.jpg",
      price: 1800,
      originalPrice: 2200,
      rating: 4.9,
      reviews: 89,
      artisan: "Raman Singh",
      village: "Khunti",
      category: "Sculptures",
      materials: ["Brass", "Bronze", "Natural wax"],
      dimensions: "6-8 inches height",
      ecoScore: 88,
      certifications: ["Handmade", "Traditional Craft"],
      inStock: true,
      fastDelivery: false,
      story:
        "Dokra art dates back 4000 years. These figurines capture the essence of tribal daily life, festivals, and spiritual beliefs using ancient metallurgy techniques.",
    },
    {
      id: 3,
      name: "Bamboo Craft Utility Set",
      description: "Eco-friendly bamboo baskets and containers for modern homes",
      image: "/bamboo-craft-set.jpg",
      price: 1200,
      originalPrice: 1500,
      rating: 4.6,
      reviews: 156,
      artisan: "Tribal Collective",
      village: "Ranchi",
      category: "Home Decor",
      materials: ["Sustainable bamboo", "Natural dyes", "Cotton rope"],
      dimensions: "Various sizes",
      ecoScore: 98,
      certifications: ["Sustainable", "Zero Waste"],
      inStock: true,
      fastDelivery: true,
      story:
        "Crafted from locally sourced bamboo, these pieces combine traditional weaving techniques with contemporary design for sustainable living.",
    },
    {
      id: 4,
      name: "Tribal Jewelry Collection",
      description: "Authentic silver jewelry with traditional motifs and natural stones",
      image: "/tribal-jewelry.jpg",
      price: 3500,
      originalPrice: 4200,
      rating: 4.7,
      reviews: 78,
      artisan: "Sunita Kumari",
      village: "Gumla",
      category: "Jewelry",
      materials: ["Sterling silver", "Natural stones", "Traditional beads"],
      dimensions: "Adjustable",
      ecoScore: 85,
      certifications: ["Authentic Silver", "Handcrafted"],
      inStock: true,
      fastDelivery: true,
      story:
        "Each piece reflects the spiritual beliefs and cultural identity of Jharkhand's tribal communities, passed down through generations.",
    },
    {
      id: 5,
      name: "Handwoven Tribal Textiles",
      description: "Traditional Tussar silk sarees with tribal motifs",
      image: "/tribal-textiles.jpg",
      price: 4500,
      originalPrice: 5500,
      rating: 4.9,
      reviews: 92,
      artisan: "Weaver Cooperative",
      village: "Dumka",
      category: "Textiles",
      materials: ["Tussar silk", "Natural dyes", "Cotton threads"],
      dimensions: "6 yards",
      ecoScore: 92,
      certifications: ["Handwoven", "Natural Dyes"],
      inStock: false,
      fastDelivery: false,
      story:
        "These textiles showcase the rich weaving traditions of Santhal and Oraon communities, featuring motifs inspired by nature and tribal folklore.",
    },
    {
      id: 6,
      name: "Terracotta Pottery Set",
      description: "Traditional clay pots and decorative items for authentic cooking",
      image: "/terracotta-pottery.jpg",
      price: 800,
      originalPrice: 1000,
      rating: 4.5,
      reviews: 134,
      artisan: "Pottery Guild",
      village: "Deoghar",
      category: "Kitchenware",
      materials: ["Natural clay", "Traditional glazes", "Wood ash"],
      dimensions: "Various sizes",
      ecoScore: 96,
      certifications: ["Food Safe", "Traditional Craft"],
      inStock: true,
      fastDelivery: true,
      story:
        "Made using age-old techniques, these pottery pieces enhance the flavor of traditional cooking while maintaining eco-friendly practices.",
    },
  ],
  experiences: [
    {
      id: 1,
      name: "Artisan Workshop Experience",
      description: "Learn traditional crafts directly from master artisans",
      image: "/artisan-workshop.jpg",
      price: 2500,
      duration: "Full day",
      location: "Hazaribagh",
      rating: 4.9,
      reviews: 45,
      includes: ["Hands-on training", "Materials", "Lunch", "Certificate"],
      maxParticipants: 8,
      languages: ["Hindi", "English", "Local dialects"],
    },
    {
      id: 2,
      name: "Village Craft Trail",
      description: "Multi-village tour showcasing different traditional crafts",
      image: "/village-craft-trail.jpg",
      price: 3800,
      duration: "2 days",
      location: "Multiple villages",
      rating: 4.8,
      reviews: 67,
      includes: ["Transportation", "Accommodation", "All meals", "Guide"],
      maxParticipants: 12,
      languages: ["Hindi", "English"],
    },
  ],
}

const categories = ["All", "Wall Art", "Sculptures", "Home Decor", "Jewelry", "Textiles", "Kitchenware"]
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating", "Newest"]

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Featured")
  const [selectedTab, setSelectedTab] = useState("products")
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])

  const filteredProducts = marketplaceData.handicrafts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const toggleWishlist = (productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-primary/90 to-secondary/90 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-balance">Tribal Marketplace</h1>
          <p className="text-xl text-balance">
            Authentic handicrafts and experiences directly from tribal artisans of Jharkhand
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products, artisans, villages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="products">Handicrafts & Products</TabsTrigger>
            <TabsTrigger value="experiences">Artisan Experiences</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      {product.fastDelivery && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Truck className="h-3 w-3 mr-1" />
                          Fast
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-white/90">
                        <Leaf className="h-3 w-3 mr-1" />
                        {product.ecoScore}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 left-2 bg-white/80 hover:bg-white"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {product.rating}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <Badge variant={product.inStock ? "secondary" : "destructive"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>

                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>By {product.artisan}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{product.village}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {product.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-64 object-cover rounded-lg"
                              />
                            </div>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Artisan Story</h4>
                                <p className="text-sm text-muted-foreground">{product.story}</p>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Materials</h4>
                                <div className="flex flex-wrap gap-1">
                                  {product.materials.map((material, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {material}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Specifications</h4>
                                <p className="text-sm">Dimensions: {product.dimensions}</p>
                                <p className="text-sm">Eco Score: {product.ecoScore}/100</p>
                              </div>

                              <div className="flex items-center gap-2 pt-4">
                                <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                                {product.originalPrice > product.price && (
                                  <span className="text-lg text-muted-foreground line-through">
                                    ₹{product.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button className="flex-1" disabled={!product.inStock} onClick={() => addToCart(product)}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experiences">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {marketplaceData.experiences.map((experience) => (
                <Card key={experience.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={experience.image || "/placeholder.svg"}
                      alt={experience.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{experience.name}</CardTitle>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{experience.rating}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{experience.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Duration:</span> {experience.duration}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {experience.location}
                      </div>
                      <div>
                        <span className="font-medium">Max Group:</span> {experience.maxParticipants}
                      </div>
                      <div>
                        <span className="font-medium">Languages:</span> {experience.languages.join(", ")}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Includes</h4>
                      <div className="flex flex-wrap gap-1">
                        {experience.includes.map((item, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-2xl font-bold text-primary">₹{experience.price}</div>
                      <Button>Book Experience</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Shield className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">Secure Payments</h3>
            <p className="text-sm text-muted-foreground">SSL encrypted transactions</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Award className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">Authentic Products</h3>
            <p className="text-sm text-muted-foreground">Verified artisan crafts</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Truck className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">3-7 days nationwide</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h3 className="font-semibold">Eco-Friendly</h3>
            <p className="text-sm text-muted-foreground">Sustainable practices</p>
          </div>
        </div>
      </div>
    </div>
  )
}
