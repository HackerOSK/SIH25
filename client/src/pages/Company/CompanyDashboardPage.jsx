import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { CompanyNav } from "../../components/company-nav"
import { TrendingUp, ShoppingCart, Leaf, DollarSign, ArrowUpRight, Calendar, Building2, FileText } from "lucide-react"

export default function CompanyDashboardPage() {
  const portfolioStats = [
    { label: "Total Credits Owned", value: "2,450", change: "+180 this month", icon: Leaf },
    { label: "Credits Retired", value: "1,200", change: "+50 this month", icon: TrendingUp },
    { label: "Portfolio Value", value: "$61,250", change: "+$4,500 this month", icon: DollarSign },
    { label: "Active Projects", value: "8", change: "+2 this month", icon: Building2 },
  ]

  const recentPurchases = [
    {
      id: "TXN-001",
      project: "Mangrove Restoration - Sundarbans",
      credits: 500,
      price: "$25.00",
      total: "$12,500",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: "TXN-002",
      project: "Kelp Forest Conservation",
      credits: 300,
      price: "$22.50",
      total: "$6,750",
      date: "2024-01-12",
      status: "completed",
    },
    {
      id: "TXN-003",
      project: "Seagrass Restoration - Red Sea",
      credits: 200,
      price: "$28.00",
      total: "$5,600",
      date: "2024-01-10",
      status: "pending",
    },
  ]

  const impactMetrics = [
    {
      label: "CO2 Offset",
      value: "2,450 tons",
      description: "Equivalent to removing 532 cars from the road for a year",
    },
    {
      label: "Ocean Area Protected",
      value: "1,200 hectares",
      description: "Supporting marine biodiversity and coastal communities",
    },
    {
      label: "Communities Supported",
      value: "15",
      description: "Local communities benefiting from blue carbon projects",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <CompanyNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Dashboard</h1>
          <p className="text-gray-600">Track your carbon credit portfolio and environmental impact</p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {portfolioStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-8 h-8 text-emerald-600" />
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-xs text-emerald-600">{stat.change}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Purchases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Recent Purchases
              </CardTitle>
              <CardDescription>Your latest carbon credit transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPurchases.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{purchase.project}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{purchase.credits} credits</span>
                        <span>@ {purchase.price}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {purchase.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{purchase.total}</p>
                      <Badge variant={purchase.status === "completed" ? "secondary" : "outline"}>
                        {purchase.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Transactions
              </Button>
            </CardContent>
          </Card>

          {/* Environmental Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Environmental Impact
              </CardTitle>
              <CardDescription>Your contribution to ocean conservation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {impactMetrics.map((metric, index) => (
                  <div key={index} className="p-4 bg-emerald-50 rounded-lg">
                    <h4 className="font-semibold text-emerald-900 mb-1">{metric.value}</h4>
                    <p className="text-sm font-medium text-emerald-700 mb-2">{metric.label}</p>
                    <p className="text-xs text-emerald-600">{metric.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your carbon credit portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Browse Marketplace
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Retire Credits
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
