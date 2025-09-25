"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            
              <Image src="jharkhandLogo.png" alt="logo" width={120} height={28}/>
           
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">Jharkhand</span>
              <span className="text-xs text-muted-foreground leading-none">Tourism</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/map" className="text-sm font-medium hover:text-primary transition-colors">
              Explore Map
            </Link>
            <Link href="/festivals" className="text-sm font-medium hover:text-primary transition-colors">
              Festivals
            </Link>
            <Link href="/food" className="text-sm font-medium hover:text-primary transition-colors">
              Cuisine
            </Link>
            <Link href="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
              Marketplace
            </Link>
            <a href="#experiences" className="text-sm font-medium hover:text-primary transition-colors">
              Experiences
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              <Link href="/profile">Profile</Link>
            </Button>
            <Link href="http://localhost:8080/plan-trip"
            >
              <Button size="sm" className="cursor-pointer">Plan Trip</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/map" className="text-sm font-medium hover:text-primary transition-colors">
                Explore Map
              </Link>
              <Link href="/festivals" className="text-sm font-medium hover:text-primary transition-colors">
                Festivals
              </Link>
              <Link href="/food" className="text-sm font-medium hover:text-primary transition-colors">
                Cuisine
              </Link>
              <Link href="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
                Marketplace
              </Link>
              <a href="#experiences" className="text-sm font-medium hover:text-primary transition-colors">
                Experiences
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="ghost" size="sm" className="justify-start">
                  <User className="h-4 w-4 mr-2" />
                  <Link href="/profile">Profile</Link>
                </Button>
                <Link href="/itinerary">
                  <Button size="sm">Plan Trip</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
