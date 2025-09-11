// src/components/ContentModal.js
import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Function to extract YouTube video ID from URL
function getYouTubeVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Function to get YouTube thumbnail URL
function getYouTubeThumbnail(url) {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
}

// Function to get YouTube embed URL
function getYouTubeEmbedUrl(url) {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
}

// YouTube Video Modal Component
function YouTubeModal({ isOpen, onClose, videoUrl, title }) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  
  if (!embedUrl) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6">
          <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 aspect ratio */}
            <iframe
              src={embedUrl}
              title={title}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ContentModal({ isOpen, onClose, post }) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [selectedVideoTitle, setSelectedVideoTitle] = useState('');

  if (!post) return null;

  const handleVideoClick = (videoUrl, title) => {
    setSelectedVideoUrl(videoUrl);
    setSelectedVideoTitle(title);
    setVideoModalOpen(true);
  };

  const handleVideoModalClose = () => {
    setVideoModalOpen(false);
    setSelectedVideoUrl('');
    setSelectedVideoTitle('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1280px] max-h-[90vh] p-0 overflow-y-auto">
        <div className="flex flex-col sm:flex-row">
          {/* Left side - Image/GIF */}
          <div className="sm:w-2/3 relative h-[300px] sm:h-[60vh]">
            {post.gif ? (
              <div className="h-full w-full">
                <img
                  src={post.gif}
                  alt={`${post.title} demo`}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <Image
                src={post.image || '/placeholder-image.jpg'}
                alt={post.title}
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>

          {/* Right side - Content */}
          <div className="sm:w-1/3 p-6 overflow-y-auto">
            <DialogHeader className="sticky top-0 bg-background z-10 pb-4">
              <DialogTitle className="text-2xl font-bold">{post.title}</DialogTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </DialogHeader>

            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">{post.description}</p>
            </div>

            {/* Project Source Content */}
            {post.project_source && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Project Media:</h3>
                
                {/* Display images */}
                {post.project_source.images && post.project_source.images.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-md font-medium mb-2">Images:</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {post.project_source.images.map((imageSrc, index) => (
                        <div key={index} className="relative h-40 w-full rounded-lg overflow-hidden">
                          <Image
                            src={imageSrc}
                            alt={`${post.title} image ${index + 1}`}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Display videos with thumbnails */}
                {post.project_source.videos && post.project_source.videos.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-md font-medium mb-2">Videos:</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {post.project_source.videos.map((videoUrl, index) => {
                        const thumbnailUrl = getYouTubeThumbnail(videoUrl);
                        return (
                          <div key={index} className="relative">
                            <button
                              onClick={() => handleVideoClick(videoUrl, `${post.title} - Video ${index + 1}`)}
                              className="block relative h-40 w-full rounded-lg overflow-hidden group cursor-pointer"
                            >
                              {thumbnailUrl ? (
                                <Image
                                  src={thumbnailUrl}
                                  alt={`${post.title} video ${index + 1}`}
                                  layout="fill"
                                  objectFit="contain"
                                  className="rounded-lg group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
                                  <span className="text-gray-500">Video Preview</span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                                  <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                                  </svg>
                                </div>
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Show original image if GIF is displayed */}
            {post.gif && post.image && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Project Image:</h3>
                <div className="relative h-40 w-full rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={`${post.title} image`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}

            {post.urls && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Related Links:</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(post.urls).map(([key, url]) => (
                    <Button key={key} variant="outline" asChild className="text-sm">
                      <a href={url} target="_blank" rel="noopener noreferrer">{key}</a>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
      
      {/* YouTube Video Modal */}
      <YouTubeModal
        isOpen={videoModalOpen}
        onClose={handleVideoModalClose}
        videoUrl={selectedVideoUrl}
        title={selectedVideoTitle}
      />
    </Dialog>
  );
}
