"use client"

import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Digital Jharkhand</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Discover the rich cultural heritage, natural wonders, and authentic tribal experiences of Jharkhand through
              our AI-powered travel platform.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="h-auto p-0">Home</Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0">Festivals</Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0">Cultural Map</Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0">Eco Tourism</Button>
              </li>
              <li>
                <Button variant="link" className="h-auto p-0">Tribal Art</Button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm text-muted-foreground">+91 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm text-muted-foreground">info@digitaljharkhand.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm text-muted-foreground">Ranchi, Jharkhand, India</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for updates on festivals, events, and cultural experiences.
            </p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" type="email" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 Digital Jharkhand. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="link" className="h-auto p-0">Privacy Policy</Button>
            <Button variant="link" className="h-auto p-0">Terms of Service</Button>
            <Button variant="link" className="h-auto p-0">Cookie Policy</Button>
          </div>
        </div>
      </div>
    </footer>
  )
}