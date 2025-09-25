"use client"



import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Building2, ShoppingCart, TrendingUp, FileText, Settings, LogOut, Bell, User } from "lucide-react"

export function CompanyNav() {
  // const pathname = usePathname()
  const isActive = true;

  const navItems = [
    { href: "/company/dashboard", label: "Dashboard", icon: TrendingUp },
    { href: "/company/marketplace", label: "Marketplace", icon: ShoppingCart },
    { href: "/company/portfolio", label: "Portfolio", icon: FileText },
    { href: "/company/settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="/company/dashboard" className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">Blue Carbon Registry</span>
            </a>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon
                // const isActive = pathname === item.href
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </a>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500">3</Badge>
            </Button>

            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">EcoTech Corp</span>
            </div>

            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
