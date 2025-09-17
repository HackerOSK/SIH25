import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Leaf, Shield, Building, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"



export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState("ngo") // Default to NGO>
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  })
  const [showOTP, setShowOTP] = useState(false)
//   const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    // Simulate login process
    if (userType === "admin" && !showOTP) {
      setShowOTP(true)
      return
    }

    // Redirect based on user type
    const redirectPaths = {
      ngo: "/ngo/dashboard",
      admin: "/admin/dashboard",
      company: "/company/dashboard",
    }

    // navigate(redirectPaths[userType])
  }

  const userTypeConfig = {
    ngo: {
      icon: Leaf,
      title: "NGO Login",
      description: "Access your project dashboard and MRV uploads",
      color: "text-primary",
    },
    admin: {
      icon: Shield,
      title: "NCCR Admin Login",
      description: "Manage project approvals and credit allocation",
      color: "text-blue-600",
    },
    company: {
      icon: Building,
      title: "Company Login",
      description: "Browse marketplace and manage carbon credits",
      color: "text-purple-600",
    },
  }

  const config = userTypeConfig[userType]
  const IconComponent = config.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-emerald-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </a>
          </Button>
        </div>

        <Card className="border-2">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center`}>
                <IconComponent className={`h-8 w-8 ${config.color}`} />
              </div>
            </div>
            <CardTitle className="text-2xl">{config.title}</CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* User Type Selector */}
            <div className="mb-6">
              <Label htmlFor="userType" className="text-sm font-medium">
                Login as
              </Label>
              <Select value={userType} onValueChange={(value) => setUserType(value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ngo">
                    <div className="flex items-center space-x-2">
                      <Leaf className="h-4 w-4 text-primary" />
                      <span>NGO / Local Community</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span>NCCR Admin</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="company">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-purple-600" />
                      <span>Company</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Two-Factor Authentication for Admin */}
              {userType === "admin" && showOTP && (
                <div className="space-y-2">
                  <Label htmlFor="otp">Two-Factor Authentication</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    maxLength={6}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Check your authenticator app for the OTP code</p>
                </div>
              )}

              <Button type="submit" className="w-full">
                {userType === "admin" && !showOTP ? "Continue" : "Sign In"}
              </Button>
            </form>

            {/* Registration Links */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Don't have an account?</p>
              {userType === "ngo" && (
                <a href="/ngo/register">
                  <Button variant="outline" className="w-full bg-transparent">
                    Register as NGO
                  </Button>
                </a>
              )}
              {userType === "company" && (
                <a href="/company/register">
                  <Button variant="outline" className="w-full bg-transparent">
                    Register as Company
                  </Button>
                </a>
              )}
              {userType === "admin" && (
                <p className="text-sm text-muted-foreground">Admin accounts are created by system administrators</p>
              )}
            </div>

            <div className="mt-4 text-center">
              <a 
                href="/auth/forgot-password" 
                className="text-sm"
              >
                Forgot your password?
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
