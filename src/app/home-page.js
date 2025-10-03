"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Youtube, Mail, BookOpen } from "lucide-react"

import { useProfile } from "@/hooks/useProfile"
import { useContent } from "@/hooks/useContent"
import { devLog } from '@/utils/devLogger';

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ContentCard } from "@/components/ContentCard"
import { ProductCard } from "@/components/ProductCard"
import { ContentModal } from "@/components/ContentModal"
import { ProfileNavigation } from "@/components/ProfileNavigation"
import { loadPostDetails } from "@/utils/postLoader"

const HomePage = () => {
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [savedScrollPosition, setSavedScrollPosition] = useState(0)

  const { profile, isLoading: profileLoading, error: profileError } = useProfile()
  const { content, isLoading: contentLoading, error: contentError } = useContent()
  const router = useRouter()

  devLog('HomePage: profile', profile);
  devLog('HomePage: content', content);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/' && isModalOpen) {
        // User pressed back button while modal was open
        setIsModalOpen(false);
        setSelectedPost(null);
        
        // Restore scroll position
        setTimeout(() => {
          window.scrollTo({
            top: savedScrollPosition,
            behavior: 'auto'
          });
        }, 50);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isModalOpen, savedScrollPosition]);

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

  // Separate products from other content
  const productPosts = content.posts.filter(post => post.type === 'Product')
  const otherPosts = content.posts.filter(post => post.type !== 'Product')
  
  // Filter other content (not products) based on selected types
  const filteredOtherContent = selectedTypes.length > 0
    ? otherPosts.filter(post => selectedTypes.includes(post.type))
    : otherPosts

  // Sort both sections by date
  const sortedProducts = [...productPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const sortedOtherContent = [...filteredOtherContent].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const toggleType = (type) => {
    // Don't allow Product type to be toggled with others since it has its own section
    if (type === 'Product') return;
    
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  // Get unique types excluding 'Product' since it has its own section
  const uniqueTypes = Array.from(new Set(otherPosts.map(post => post.type)))

  const handlePostClick = async (id) => {
    devLog('Clicked post with id:', id);
    try {
      // Save current scroll position before opening modal
      setSavedScrollPosition(window.scrollY);
      
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
    
    // Restore scroll position after a short delay to ensure modal is closed
    setTimeout(() => {
      window.scrollTo({
        top: savedScrollPosition,
        behavior: 'auto' // Use 'auto' for instant scroll without animation
      });
    }, 50);
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <ProfileNavigation profile={profile} />
      <header className="flex flex-col items-center space-y-4 text-center">
        <Avatar className="w-32 h-32 shadow-lg border-4 border-white dark:border-gray-800">
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
          {profile.Blog && (
            <Link href={profile.Blog}>
              <Button variant="ghost" size="icon">
                <BookOpen className="h-5 w-5" />
                <span className="sr-only">Blog</span>
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

      {/* Products Section */}
      {sortedProducts.length > 0 && (
        <div className="mx-auto" style={{ width: '70%' }}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Products</h2>
            </div>
            <div className="space-y-6">
              {sortedProducts.map(post => (
                <ProductCard key={post.id} post={post} onClick={handlePostClick} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other Content Section */}
      <div className="mx-auto" style={{ width: '70%' }}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold">Content</h2>
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
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sortedOtherContent.map(post => (
              <ContentCard key={post.id} post={post} onClick={handlePostClick} />
            ))}
          </div>
        </div>
      </div>

      <ContentModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        post={selectedPost} 
      />
    </div>
  )
}

export default HomePage
