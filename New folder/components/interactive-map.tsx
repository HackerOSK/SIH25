"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import dynamic from 'next/dynamic'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  MapPin,
  Search,
  Star,
  Clock,
  DollarSign,
  Camera,
  Mountain,
  TreePine,
  Utensils,
  Home,
  Car,
  Train,
  Eye,
  Play,
  Route,
  Leaf,
  Heart,
  Share,
  Globe,
  Navigation2
} from "lucide-react"

// Dynamically import react-leaflet components with no SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

interface MapLocation {
  id: string
  name: string
  type: "waterfall" | "temple" | "cultural" | "market" | "village" | "eco-spot" | "food" | "accommodation"
  coordinates: [number, number]
  description: string
  rating: number
  cost: number
  timings: string
  reviews: number
  ecoScore: number
  highlights: string[]
  images: string[]
  arVrAvailable: boolean
  distance?: string
  estimatedTime?: string
  address: string
  bestTimeToVisit: string
  category: string
  activities: string[]
  nearbyAttractions: Array<{
    name: string
    distance: string
  }>
  facilities: string[]
  accessibility: string
  parkingAvailable: boolean
  googleMapsUrl: string
  contactInfo?: {
    phone?: string
    email?: string
    website?: string
  }
}

// Define category-specific icons
const createCategoryIcon = (color: string) => {
  return L.Icon.extend({
    options: {
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    }
  });
};

const categoryIcons = {
  waterfall: new (createCategoryIcon('blue'))(),
  temple: new (createCategoryIcon('red'))(),
  cultural: new (createCategoryIcon('purple'))(),
  market: new (createCategoryIcon('orange'))(),
  village: new (createCategoryIcon('green'))(),
  'eco-spot': new (createCategoryIcon('darkgreen'))(),
  food: new (createCategoryIcon('yellow'))(),
  accommodation: new (createCategoryIcon('violet'))()
};

const mockLocations: MapLocation[] = [
  {
    id: "1",
    name: "Hundru Falls",
    type: "waterfall",
    coordinates: [23.4241, 85.5916],
    description: "Spectacular 98-meter waterfall with 360° VR experience points and tribal legends. One of Jharkhand's most iconic waterfalls, featuring multiple cascading levels and surrounded by lush forest.",
    rating: 4.8,
    cost: 50,
    timings: "6:00 AM - 6:00 PM",
    reviews: 1247,
    ecoScore: 95,
    highlights: ["VR Experience", "Photography", "Trekking", "Natural Beauty", "Bird Watching"],
    images: ["/hundru-falls-waterfall.jpg"],
    arVrAvailable: true,
    distance: "45 km from Ranchi",
    estimatedTime: "1.5 hours",
    address: "Hundru Falls Rd, Ranchi District, Jharkhand 835219",
    bestTimeToVisit: "July to February (Monsoon and Post-monsoon)",
    category: "Nature & Adventure",
    activities: [
      "Waterfall viewing",
      "Nature photography",
      "Trekking",
      "Bird watching",
      "Picnicking",
      "VR nature experience"
    ],
    nearbyAttractions: [
      {
        name: "Jonha Falls",
        distance: "15 km"
      },
      {
        name: "Sita Falls",
        distance: "12 km"
      }
    ],
    facilities: [
      "Parking",
      "Viewpoints",
      "Restrooms",
      "Food stalls",
      "Souvenir shops",
      "First aid"
    ],
    accessibility: "Accessible by road, moderate hiking required for best views",
    parkingAvailable: true,
    googleMapsUrl: "https://goo.gl/maps/exampleHundruFalls",
    contactInfo: {
      phone: "+91 1234567890",
      website: "https://jharkhandtourism.gov.in/hundru-falls"
    }
  },
  {
    id: "2",
    name: "Jagannath Temple",
    type: "temple",
    coordinates: [23.3441, 85.3096],
    description: "Historic temple complex with architectural significance and spiritual importance",
    rating: 4.6,
    cost: 0,
    timings: "5:00 AM - 9:00 PM",
    reviews: 892,
    ecoScore: 90,
    highlights: ["Architecture", "Spiritual", "History", "Cultural"],
    images: ["/jagannath-temple-ranchi.jpg"],
    arVrAvailable: false,
    distance: "5 km from Ranchi",
    estimatedTime: "20 minutes",
    address: "Jagannath Temple Complex, Ranchi, Jharkhand",
    bestTimeToVisit: "October to March",
    category: "Religious & Cultural",
    activities: [
      "Temple visit",
      "Prayers",
      "Cultural events"
    ],
    nearbyAttractions: [],
    facilities: [
      "Parking",
      "Restrooms"
    ],
    accessibility: "Easily accessible by road",
    parkingAvailable: true,
    googleMapsUrl: "https://goo.gl/maps/exampleJagannathTemple"
  },
  {
    id: "3",
    name: "Tribal Cultural Village",
    type: "village",
    coordinates: [23.2847, 85.2785],
    description: "Authentic Santali village experience with traditional crafts and homestays",
    rating: 4.9,
    cost: 200,
    timings: "8:00 AM - 6:00 PM",
    reviews: 456,
    ecoScore: 98,
    highlights: ["Homestay", "Crafts", "Cultural Immersion", "Traditional Food"],
    images: ["/tribal-village-jharkhand.jpg"],
    arVrAvailable: true,
    distance: "25 km from Ranchi",
    estimatedTime: "45 minutes",
    address: "Tribal Cultural Village, Near Ranchi",
    bestTimeToVisit: "October to March",
    category: "Cultural",
    activities: [
      "Cultural tours",
      "Craft workshops",
      "Traditional dance",
      "Cooking classes"
    ],
    nearbyAttractions: [],
    facilities: [
      "Homestay",
      "Dining",
      "Cultural center"
    ],
    accessibility: "Accessible by road",
    parkingAvailable: true,
    googleMapsUrl: "https://goo.gl/maps/exampleTribalVillage"
  }
];

export function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredLocations, setFilteredLocations] = useState(mockLocations);
  const [isClient, setIsClient] = useState(false);

  // Initialize map when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Fix Leaflet default icon path issues
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    const filtered = mockLocations.filter(location => {
      if (searchQuery) {
        return location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               location.description.toLowerCase().includes(searchQuery.toLowerCase());
      }
      if (activeTab !== "all") {
        return location.type === activeTab;
      }
      return true;
    });
    setFilteredLocations(filtered);
  }, [searchQuery, activeTab]);

  if (!isClient) {
    return (
      <div className="h-[800px] flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left sidebar with filters and search */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Explore Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 gap-2">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="waterfall">Natural</TabsTrigger>
                    <TabsTrigger value="cultural">Cultural</TabsTrigger>
                    <TabsTrigger value="accommodation">Stay</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Location list */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredLocations.map((location) => (
              <Card
                key={location.id}
                className={`cursor-pointer transition-colors ${
                  selectedLocation?.id === location.id ? 'border-primary' : ''
                }`}
                onClick={() => setSelectedLocation(location)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{location.name}</h3>
                      <p className="text-sm text-muted-foreground">{location.type}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">
                          <Star className="h-3 w-3 mr-1" />
                          {location.rating}
                        </Badge>
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          {location.estimatedTime}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main map area */}
        <div className="col-span-2">
          <div className="h-[800px] rounded-lg overflow-hidden border">
            <MapContainer
              center={[23.3441, 85.3096]}
              zoom={11}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredLocations.map((location) => (
                <Marker
                  key={location.id}
                  position={location.coordinates}
                  icon={categoryIcons[location.type]}
                  eventHandlers={{
                    click: () => setSelectedLocation(location),
                  }}
                >
                  <Popup maxWidth={400}>
                    <div className="p-4 max-w-md space-y-4">
                      {/* Header with Image */}
                      <div className="relative h-48 w-full rounded-lg overflow-hidden">
                        <img
                          src={location.images[0]}
                          alt={location.name}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-primary">
                            {location.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Title and Basic Info */}
                      <div>
                        <h3 className="text-xl font-bold">{location.name}</h3>
                        <p className="text-sm text-muted-foreground">{location.description}</p>
                      </div>

                      {/* Ratings and Quick Info */}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          <Star className="h-3 w-3 mr-1" />
                          {location.rating} ({location.reviews} reviews)
                        </Badge>
                        <Badge variant="secondary">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {location.cost} INR
                        </Badge>
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          {location.timings}
                        </Badge>
                        <Badge variant="secondary">
                          <Leaf className="h-3 w-3 mr-1" />
                          Eco Score: {location.ecoScore}
                        </Badge>
                      </div>

                      {/* Location and Directions */}
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Address:</strong> {location.address}</p>
                        <p className="text-sm"><strong>Distance:</strong> {location.distance}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => window.open(location.googleMapsUrl, '_blank')}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>

                      {/* Activities and Facilities */}
                      <div className="space-y-2">
                        <h4 className="font-semibold">Activities</h4>
                        <div className="flex flex-wrap gap-1">
                          {location.activities.map((activity, index) => (
                            <Badge key={index} variant="outline">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Nearby Attractions */}
                      {location.nearbyAttractions.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold">Nearby Attractions</h4>
                          <div className="space-y-1">
                            {location.nearbyAttractions.map((attraction, index) => (
                              <p key={index} className="text-sm">
                                • {attraction.name} ({attraction.distance})
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Additional Info */}
                      <div className="space-y-1 text-sm">
                        <p><strong>Best Time to Visit:</strong> {location.bestTimeToVisit}</p>
                        <p><strong>Accessibility:</strong> {location.accessibility}</p>
                        <p><strong>Parking:</strong> {location.parkingAvailable ? 'Available' : 'Not available'}</p>
                      </div>

                      {/* Contact Info */}
                      {location.contactInfo && (
                        <div className="space-y-1 text-sm">
                          {location.contactInfo.phone && (
                            <p><strong>Phone:</strong> {location.contactInfo.phone}</p>
                          )}
                          {location.contactInfo.website && (
                            <Button
                              variant="link"
                              className="p-0 h-auto text-primary"
                              onClick={() => window.open(location.contactInfo?.website, '_blank')}
                            >
                              Visit Website
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}