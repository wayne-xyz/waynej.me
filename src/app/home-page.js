"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Youtube, Moon, Sun, Mail } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for content cards
const contentCards = [
  { id: 1, type: "blog", title: "My Latest Blog Post", date: "2023-06-01" },
  { id: 2, type: "project", title: "Awesome Project", date: "2023-05-15" },
  { id: 3, type: "publication", title: "Research Paper", date: "2023-04-20" },
  { id: 4, type: "event", title: "Speaking at Tech Conference", date: "2023-07-10" },
  { id: 5, type: "video", title: "New Tutorial: React Hooks", date: "2023-06-05" },
  // Add more content items as needed
]

const HomePage = () => {
  const [selectedTypes, setSelectedTypes] = useState([])
  const { setTheme, theme } = useTheme()

  const filteredContent = selectedTypes.length > 0
    ? contentCards.filter(card => selectedTypes.includes(card.type))
    : contentCards

  const sortedContent = filteredContent.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="flex flex-col items-center space-y-4 text-center">
        <Avatar className="w-32 h-32">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Your Name" />
          <AvatarFallback>YN</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">Your Name</h1>
        <p className="text-xl text-muted-foreground max-w-lg">
          A brief description about yourself, your expertise, and what you do.
        </p>
        <div className="flex space-x-4">
          <Link href="https://github.com/yourusername">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/yourusername">
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="https://youtube.com/@yourchannel">
            <Button variant="ghost" size="icon">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Button>
          </Link>
          <Link href="https://medium.com/@yourusername">
            <Button variant="ghost" size="icon">
              <svg
                viewBox="0 0 1043.63 592.71"
                className="h-5 w-5"
                fill="currentColor"
              >
                <g data-name="Layer 2">
                  <g data-name="Layer 1">
                    <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
                  </g>
                </g>
              </svg>
              <span className="sr-only">Medium</span>
            </Button>
          </Link>
          <Link href="mailto:your.email@example.com">
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex justify-between items-center">
        <div className="space-x-2">
          {["blog", "project", "publication", "event", "video"].map(type => (
            <Badge
              key={type}
              variant={selectedTypes.includes(type) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleType(type)}
            >
              {type}
            </Badge>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedContent.map(card => (
          <Card key={card.id}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{new Date(card.date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Brief description or excerpt of the content goes here.</p>
            </CardContent>
            <CardFooter>
              <Badge>{card.type}</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default HomePage
