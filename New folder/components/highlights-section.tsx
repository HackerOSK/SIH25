import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Calendar, Leaf, ArrowRight, Play, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function HighlightsSection() {
  const destinations = [
    {
      title: "Heritage Jharkhand",
      description: "Explore the breathtaking and intricate architectural marvels along with the iconic and historically significant landmarks that vividly reflect Jharkhand's rich, diverse, and glorious past spanning centuries.",
      image: "i4.png",
    },
    {
      title: "Eco Tourism",
      description: "Immerse yourself in the lush, dense green forests, picturesque hill stations, and the diverse, thriving wildlife that together create the captivating natural landscape of Jharkhand.",
      image: "i5.png",
    },
    {
      title: "Religious Tourism",
      description: "Journey through sacred and revered destinations steeped in deep devotion, ancient traditions, and rich cultural heritage across the vibrant state of Jharkhand.",
      image: "i1.webp",
    },
    {
      title: "Tribal Tourism",
      description: "Discover the vibrant and diverse tribal communities of Jharkhand, renowned for their rich cultural expressions and centuries-old traditions.",
      image: "i2.webp",
    },
    {
      title: "Water Bodies",
      description: "Jharkhand is home to serene lakes, dams, and reservoirs that offer stunning natural views and peaceful getaways.",
      image: "i3.png",
    },
  ]

  const highlights = [
    {
      title: "Digital Soul of Jharkhand",
      description:
        "AI-powered storyteller narrating tribal legends, cultural significance, and historical tales in multiple Indian languages with immersive audio experiences.",
      icon: <Sparkles className="h-6 w-6" />,
      badge: "AI Storyteller",
      color: "bg-primary/10 text-primary",
      features: ["Multi-language TTS", "Cultural Stories", "Historical Context"],
    },
    {
      title: "Upcoming Festivals",
      description:
        "Experience 8 major tribal festivals including Sarhul, Karma, Sohrai, and Tusu with interactive calendar, AR filters, and cultural immersion.",
      icon: <Calendar className="h-6 w-6" />,
      badge: "Live Events",
      color: "bg-accent/10 text-accent",
      features: ["Festival Calendar", "AR Filters", "Cultural Immersion"],
    },
    {
      title: "Eco-Trails & Green Impact",
      description:
        "Discover sustainable tourism paths with eco-score tracking, green badges, and eco-friendly transport suggestions for responsible travel.",
      icon: <Leaf className="h-6 w-6" />,
      badge: "Eco-Tourism",
      color: "bg-secondary/10 text-secondary",
      features: ["Eco-Score Tracking", "Green Badges", "Sustainable Paths"],
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Unique Experiences
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Discover Jharkhand Like Never Before</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Immerse yourself in authentic cultural experiences powered by cutting-edge technology and deep respect for
            tribal heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {highlights.map((highlight, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${highlight.color}`}>{highlight.icon}</div>
                  <Badge variant="outline">{highlight.badge}</Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{highlight.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{highlight.description}</p>
                <div className="flex flex-wrap gap-2">
                  {highlight.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Explore More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
              <div className="text-center">
                <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/placeholder.jpg"
        >
          <source src="Jharkhand_AR_VR_Demo_Video_Creation.mp4" type="video/mp4" />
        </video> 
              </div>
              <Badge className="absolute top-4 right-4">
                <Star className="h-3 w-3 mr-1" />
                AR/VR
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Immersive Cultural Experiences</h3>
              <p className="text-muted-foreground mb-4">
                Step into tribal art galleries with AR murals, experience 360° waterfall views, and witness traditional
                dance performances through VR technology.
              </p>
              <Button variant="outline" className="w-full bg-transparent">
                Start Virtual Tour
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center relative">
              <div className="text-center">
                <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/placeholder.jpg"
        >
          <source src="Jharkhand_Eco_Tourism_Demo_Video.mp4" type="video/mp4" />
        </video>
              </div>
              <Badge className="absolute top-4 right-4" variant="secondary">
                Eco-Friendly
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Sustainable Tourism Paths</h3>
              <p className="text-muted-foreground mb-4">
                Explore curated eco-trails with real-time impact tracking, earn green badges, and contribute to local
                tribal communities through responsible tourism.
              </p>
              <Button variant="outline" className="w-full bg-transparent">
                View Eco-Routes
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Destinations Section */}
      <div className="mt-24">
        <h2 className="text-4xl font-serif font-bold text-center mb-12 italic tracking-wide text-gray-800">
          Destinations to Explore
        </h2>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {destinations.map((destination, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center text-center px-4">
                  <div className="relative w-4/5 mx-auto mb-6 overflow-hidden rounded-lg">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                      style={{ aspectRatio: "16/9" }}
                    />
                  </div>
                  <div className="max-w-2xl mx-auto mb-14">
                    <h3 className="text-2xl font-bold mb-4">{destination.title}</h3>
                    <p className="text-muted-foreground mb-6">{destination.description}</p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Discover Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
        
        <div className="flex justify-center gap-2 mt-4">
          {destinations.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-2 h-2 rounded-full p-0 bg-primary/20 hover:bg-primary/30"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Cultural Experiences Section */}
      <div className="mt-32 bg-muted/30 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-16 italic tracking-wide text-gray-800">
            Immersive Cultural Experiences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/sohrai-art-gallery.jpg"
                  alt="Traditional Art Workshop"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl text-white font-bold drop-shadow-lg">Traditional Art Workshops</h3>
                </div>
              </div>
              <CardContent className="mt-4">
                <p className="text-muted-foreground">Learn authentic Sohrai and Kohvar art forms directly from tribal artisans.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/tribal-village-jharkhand.jpg"
                  alt="Village Homestays"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl text-white font-bold drop-shadow-lg">Village Homestays</h3>
                </div>
              </div>
              <CardContent className="mt-4">
                <p className="text-muted-foreground">Experience daily tribal life and traditions with local community homestays.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/karma-festival.jpg"
                  alt="Festival Celebrations"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl text-white font-bold drop-shadow-lg">Festival Celebrations</h3>
                </div>
              </div>
              <CardContent className="mt-4">
                <p className="text-muted-foreground">Participate in vibrant tribal festivals and traditional ceremonies.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Eco-Adventure Section */}
      <div className="mt-32">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-16 italic tracking-wide text-gray-800">
            Eco-Adventure Experiences
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src="/hundru-falls-waterfall.jpg"
                alt="Waterfall Trails"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Waterfall Trails</h3>
                  <p className="text-white/90 mb-4">Experience the majestic waterfalls of Jharkhand with guided eco-trails.</p>
                  <Button variant="secondary" className="bg-white/10 backdrop-blur-sm hover:bg-white/20">
                    Explore Trails
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src="/eco-lodge-jharkhand.jpg"
                alt="Eco Lodges"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Eco Lodges</h3>
                  <p className="text-white/90 mb-4">Stay in sustainable eco-lodges surrounded by nature and wildlife.</p>
                  <Button variant="secondary" className="bg-white/10 backdrop-blur-sm hover:bg-white/20">
                    Book Stay
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artisan Marketplace Preview */}
      <div className="mt-32 bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-6 italic tracking-wide text-gray-800">
            Artisan Marketplace
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Support local artisans and take home authentic tribal crafts
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Tribal Jewelry", image: "/tribal-jewelry.jpg" },
              { title: "Dokra Figurines", image: "/dokra-figurines.jpg" },
              { title: "Tribal Textiles", image: "/tribal-textiles.jpg" },
              { title: "Bamboo Craft", image: "/bamboo-craft-set.jpg" },
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-center">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Visit Marketplace
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
