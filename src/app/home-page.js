"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Youtube, Moon, Sun, Mail } from "lucide-react"
import { useTheme } from "next-themes"
import { useProfile } from "@/hooks/useProfile"
import { useContent } from "@/hooks/useContent"
import { devLog } from '@/utils/devLogger';

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ContentCard } from "@/components/ContentCard"
import { ContentModal } from "@/components/ContentModal"
import { loadPostDetails } from "@/utils/postLoader"

const HomePage = () => {
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setTheme, theme } = useTheme()
  const { profile, isLoading: profileLoading, error: profileError } = useProfile()
  const { content, isLoading: contentLoading, error: contentError } = useContent()
  const router = useRouter()

  devLog('HomePage: profile', profile);
  devLog('HomePage: content', content);

  if (profileLoading || contentLoading) {
    devLog('HomePage: Still loading');
    return <div>Loading...</div>
  }
  if (profileError || contentError) {
    devLog('HomePage: Error', profileError || contentError);
    return <div>Error: {profileError || contentError}</div>
  }
  if (!profile || !content || !Array.isArray(content.posts)) {
    devLog('HomePage: No data or invalid data format');
    return <div>No data found or invalid data format</div>
  }

  const filteredContent = selectedTypes.length > 0
    ? content.posts.filter(post => selectedTypes.includes(post.type))
    : content.posts

  const sortedContent = [...filteredContent].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const uniqueTypes = Array.from(new Set(content.posts.map(post => post.type)))

  const handlePostClick = async (id) => {
    devLog('Clicked post with id:', id);
    try {
      const postDetails = await loadPostDetails(id);
      devLog('Loaded post details:', postDetails);
      setSelectedPost(postDetails);
      setIsModalOpen(true);
      // Update the URL without triggering a navigation
      window.history.pushState({}, '', `/post/${id}`);
    } catch (error) {
      devLog('Error loading post details:', error);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    // Revert the URL to the home page
    window.history.pushState({}, '', '/');
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="flex flex-col items-center space-y-4 text-center">
        <Avatar className="w-32 h-32">
          <AvatarImage src={profile.avatar} alt={profile.Name} />
          <AvatarFallback>{profile.Name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">{profile.Name}</h1>
        <p className="text-xl text-muted-foreground max-w-4xl">
          {profile.Description}
        </p>
        <div className="flex space-x-4">
          {profile.Github && (
            <Link href={profile.Github}>
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
          )}
          {profile.LinkedIn && (
            <Link href={profile.LinkedIn}>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          )}
          {profile.Youtube && (
            <Link href={profile.Youtube}>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </Link>
          )}
          {profile.Medium && (
            <Link href={profile.Medium}>
              <Button variant="ghost" size="icon">
                <svg viewBox="0 0 1043.63 592.71" className="h-5 w-5" fill="currentColor">
                  <g data-name="Layer 2">
                    <g data-name="Layer 1">
                      <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
                    </g>
                  </g>
                </svg>
                <span className="sr-only">Medium</span>
              </Button>
            </Link>
          )}
          {profile.Email && (
            <Link href={`mailto:${profile.Email}`}>
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          )}
        </div>
      </header>

      <div className="flex justify-between items-center">
        <div className="space-x-2">
          {uniqueTypes.map(type => (
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
        {sortedContent.map(post => (
          <ContentCard key={post.id} post={post} onClick={handlePostClick} />
        ))}
      </div>

      <ContentModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          router.push('/', undefined, { shallow: true });
        }} 
        post={selectedPost} 
      />
    </div>
  )
}

export default HomePage
