import { Card, CardContent } from "../../components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyNav } from "@/components/company-nav"
import { Leaf, TrendingUp, Calendar, DollarSign, Download, RotateCcw, Eye } from "lucide-react"

export default function PortfolioPage() {
  const ownedCredits = [
    {
      id: "HOLD-001",
      project: "Mangrove Restoration - Sundarbans",
      ngo: "Coastal Conservation Alliance",
      location: "Bangladesh",
      ecosystem: "Mangrove",
      credits: 500,
      purchasePrice: "$25.00",
      currentValue: "$27.50",
      purchaseDate: "2024-01-15",
      status: "active",
      vintage: "2024",
    },
    {
      id: "HOLD-002",
      project: "Kelp Forest Conservation",
      ngo: "Ocean Conservation Trust",
      location: "California, USA",
      ecosystem: "Kelp Forest",
      credits: 300,
      purchasePrice: "$22.50",
      currentValue: "$24.00",
      purchaseDate: "2024-01-12",
      status: "active",
      vintage: "2024",
    },
    {
      id: "HOLD-003",
      project: "Seagrass Restoration - Red Sea",
      ngo: "Blue Future Foundation",
      location: "Egypt",
      ecosystem: "Seagrass",
      credits: 200,
      purchasePrice: "$28.00",
      currentValue: "$30.00",
      purchaseDate: "2024-01-10",
      status: "active",
      vintage: "2024",
    },
  ]

  const retiredCredits = [
    {
      id: "RET-001",
      project: "Salt Marsh Conservation",
      ngo: "Wetland Foundation",
      location: "Netherlands",
      ecosystem: "Salt Marsh",
      credits: 150,
      retirementDate: "2023-12-20",
      reason: "Annual Carbon Neutrality Goal",
      certificate: "CERT-2023-001",
    },
    {
      id: "RET-002",
      project: "Mangrove Restoration - Philippines",
      ngo: "Coastal Conservation Alliance",
      location: "Philippines",
      ecosystem: "Mangrove",
      credits: 250,
      retirementDate: "2023-11-15",
      reason: "Product Carbon Footprint Offset",
      certificate: "CERT-2023-002",
    },
  ]

  const portfolioSummary = {
    totalOwned: 1000,
    totalRetired: 400,
    totalValue: "$81,500",
    totalInvestment: "$75,000",
    unrealizedGain: "$6,500",
    gainPercentage: "+8.7%",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <CompanyNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Carbon Credit Portfolio</h1>
          <p className="text-gray-600">Manage your carbon credit holdings and track environmental impact</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Credits Owned</p>
                  <p className="text-2xl font-bold text-gray-900">{portfolioSummary.totalOwned.toLocaleString()}</p>
                </div>
                <Leaf className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Portfolio Value</p>
                  <p className="text-2xl font-bold text-gray-900">{portfolioSummary.totalValue}</p>
                </div>
                <DollarSign className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unrealized Gain</p>
                  <p className="text-2xl font-bold text-emerald-600">{portfolioSummary.unrealizedGain}</p>
                  <p className="text-sm text-emerald-600">{portfolioSummary.gainPercentage}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="owned" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="owned">Owned Credits ({portfolioSummary.totalOwned})</TabsTrigger>
            <TabsTrigger value="retired">Retired Credits ({portfolioSummary.totalRetired})</TabsTrigger>
          </TabsList>

          <TabsContent value="owned" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Active Holdings</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retire Credits
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {ownedCredits.map((holding) => (
                <Card key={holding.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{holding.project}</h3>
                        <p className="text-sm text-gray-600">
                          {holding.ngo} • {holding.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{holding.ecosystem}</Badge>
                        <Badge variant="secondary">{holding.vintage}</Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-600">Credits</p>
                        <p className="text-lg font-bold text-gray-900">{holding.credits.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Purchase Price</p>
                        <p className="text-gray-900">{holding.purchasePrice}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Current Value</p>
                        <p className="text-emerald-600 font-semibold">{holding.currentValue}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Purchase Date</p>
                        <p className="text-gray-900 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {holding.purchaseDate}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Total Value</p>
                        <p className="text-lg font-bold text-gray-900">
                          $
                          {(
                            holding.credits * Number.parseFloat(holding.currentValue.replace("$", ""))
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                      <Button variant="outline" size="sm">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Retire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="retired" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Retired Credits</h2>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Certificates
              </Button>
            </div>

            <div className="grid gap-4">
              {retiredCredits.map((retirement) => (
                <Card key={retirement.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{retirement.project}</h3>
                        <p className="text-sm text-gray-600">
                          {retirement.ngo} • {retirement.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{retirement.ecosystem}</Badge>
                        <Badge className="bg-red-100 text-red-800">Retired</Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-600">Credits Retired</p>
                        <p className="text-lg font-bold text-gray-900">{retirement.credits.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Retirement Date</p>
                        <p className="text-gray-900 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {retirement.retirementDate}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Reason</p>
                        <p className="text-gray-900">{retirement.reason}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Certificate</p>
                        <p className="text-emerald-600 font-mono text-xs">{retirement.certificate}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Certificate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
