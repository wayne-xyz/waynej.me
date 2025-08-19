import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Download, Play, Store, X, Github } from "lucide-react"

export function ProductCard({ post, onClick }) {
  const [showVideo, setShowVideo] = useState(false)
  
  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  const youtubeId = getYouTubeId(post.urls?.Youtube)

  return (
    <Card className="overflow-hidden w-full cursor-pointer transition-shadow hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Image Section */}
        <div className="relative h-64 sm:h-72 lg:h-auto lg:w-3/5 xl:w-[61.8%]">
          <Image
            src={post.image || '/placeholder-image.jpg'}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="lg:rounded-l-lg"
          />
        </div>
        
        {/* Content Section */}
        <div className="p-4 sm:p-6 flex flex-col justify-between lg:w-2/5 xl:w-[38.2%] min-h-[300px] lg:min-h-[400px]">
          <div>
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <Badge className="bg-blue-500 text-white font-semibold px-3 py-1">
                  {post.type}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold mb-3 leading-tight">{post.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="p-0">
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm sm:text-base">
                {post.description}
              </p>
            </CardContent>
          </div>
          
          {/* Links section */}
          <div className="flex flex-wrap gap-2 mt-4">
            {post.urls?.Website && (
              <Link href={post.urls.Website} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  Website
                </Button>
              </Link>
            )}
            
            {post.urls?.Github && (
              <Link href={post.urls.Github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                  GitHub
                </Button>
              </Link>
            )}
            
            {post.urls?.AppStore && (
              <Link href="https://apps.apple.com/us/app/livcap/id6748108138?mt=12" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <Store className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Available on Mac App Store</span>
                  <span className="sm:hidden">Mac App Store</span>
                </Button>
              </Link>
            )}
            
            {post.urls?.Download && (
              <Link href={post.urls.Download} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  Download
                </Button>
              </Link>
            )}
            
            {post.urls?.Youtube && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowVideo(true)
                }}
              >
                <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Video Demo</span>
                <span className="sm:hidden">Demo</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Video Overlay Modal */}
      {showVideo && youtubeId && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div 
            className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Video container */}
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Video info */}
            <div className="p-4 border-t">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">Video Demo</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
} 