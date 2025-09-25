import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { CompanyNav } from "../../components/company-nav"
import { Search, MapPin, Leaf, Star, ShoppingCart, Eye } from "lucide-react"

export default function MarketplacePage() {
  const availableProjects = [
    {
      id: "PROJ-001",
      name: "Mangrove Restoration - Sundarbans",
      ngo: "Coastal Conservation Alliance",
      location: "Bangladesh",
      ecosystem: "Mangrove",
      area: "500 hectares",
      creditsAvailable: 2500,
      pricePerCredit: 25.0,
      rating: 4.8,
      verified: true,
      image: "/mangrove-restoration.jpg",
      description: "Large-scale mangrove restoration project protecting coastal communities and marine biodiversity.",
      impactMetrics: {
        co2Sequestration: "2,500 tCO2/year",
        biodiversityScore: 9.2,
        communityBenefit: "High",
      },
    },
    {
      id: "PROJ-002",
      name: "Kelp Forest Conservation",
      ngo: "Ocean Conservation Trust",
      location: "California, USA",
      ecosystem: "Kelp Forest",
      area: "300 hectares",
      creditsAvailable: 1800,
      pricePerCredit: 22.5,
      rating: 4.6,
      verified: true,
      image: "/kelp-forest.jpg",
      description: "Protecting and restoring kelp forests to support marine ecosystems and carbon sequestration.",
      impactMetrics: {
        co2Sequestration: "1,800 tCO2/year",
        biodiversityScore: 8.7,
        communityBenefit: "Medium",
      },
    },
    {
      id: "PROJ-003",
      name: "Seagrass Restoration - Red Sea",
      ngo: "Blue Future Foundation",
      location: "Egypt",
      ecosystem: "Seagrass",
      area: "200 hectares",
      creditsAvailable: 800,
      pricePerCredit: 28.0,
      rating: 4.9,
      verified: true,
      image: "/seagrass-restoration.jpg",
      description: "Restoring critical seagrass meadows in the Red Sea to enhance marine biodiversity.",
      impactMetrics: {
        co2Sequestration: "800 tCO2/year",
        biodiversityScore: 9.5,
        communityBenefit: "High",
      },
    },
    {
      id: "PROJ-004",
      name: "Salt Marsh Conservation",
      ngo: "Wetland Foundation",
      location: "Netherlands",
      ecosystem: "Salt Marsh",
      area: "150 hectares",
      creditsAvailable: 600,
      pricePerCredit: 30.0,
      rating: 4.7,
      verified: true,
      image: "/salt-marsh.jpg",
      description: "Protecting and restoring salt marshes for coastal protection and carbon storage.",
      impactMetrics: {
        co2Sequestration: "600 tCO2/year",
        biodiversityScore: 8.9,
        communityBenefit: "Medium",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <CompanyNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Carbon Credit Marketplace</h1>
          <p className="text-gray-600">
            Discover and purchase verified blue carbon credits from ocean conservation projects
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search projects..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ecosystem Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ecosystems</SelectItem>
                  <SelectItem value="mangrove">Mangrove</SelectItem>
                  <SelectItem value="kelp">Kelp Forest</SelectItem>
                  <SelectItem value="seagrass">Seagrass</SelectItem>
                  <SelectItem value="saltmarsh">Salt Marsh</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="americas">Americas</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-25">$0 - $25</SelectItem>
                  <SelectItem value="25-50">$25 - $50</SelectItem>
                  <SelectItem value="50+">$50+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Project Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {availableProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-r from-emerald-400 to-blue-500 relative">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white text-emerald-700">
                    <Leaf className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">{project.rating}</span>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {project.ngo} • {project.location}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{project.ecosystem}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{project.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>Area: {project.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-gray-500" />
                    <span>{project.impactMetrics.co2Sequestration}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Available Credits</span>
                    <span className="text-lg font-bold text-gray-900">{project.creditsAvailable.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Price per Credit</span>
                    <span className="text-lg font-bold text-emerald-600">${project.pricePerCredit}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Purchase Credits
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Projects
          </Button>
        </div>
      </main>
    </div>
  )
}
