// src/components/ContentModal.js
import { useEffect, useMemo, useState } from 'react';
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

// Determine if a URL is a YouTube URL
function isYouTubeUrl(url) {
  return /^(https?:)?\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url);
}

// Determine if a string looks like a direct video file (e.g., .mp4)
function isDirectVideoFile(url) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url) || (!isYouTubeUrl(url) && !/^https?:\/\//i.test(url));
}

// Resolve a video src to an absolute path suitable for the browser
// - If it is an http(s) URL, return as is
// - If it is a relative file name (e.g., in public/), prefix with '/'
// - Encode spaces and non-ascii using encodeURI
function resolveVideoSrc(url) {
  if (/^https?:\/\//i.test(url)) return url;
  const withLeadingSlash = url.startsWith('/') ? url : `/${url}`;
  return encodeURI(withLeadingSlash);
}

// HTML5 Video Modal Component
function Html5VideoModal({ isOpen, onClose, videoUrl, title }) {
  const src = useMemo(() => resolveVideoSrc(videoUrl), [videoUrl]);
  if (!videoUrl) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6">
          <div className="relative w-full h-0 pb-[56.25%]">{/* 16:9 aspect ratio */}
            <video
              src={src}
              controls
              autoPlay
              className="absolute top-0 left-0 w-full h-full rounded-lg bg-black"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Video thumbnail button that supports both YouTube and direct video files
function VideoThumbnailButton({ videoUrl, title, onClick }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    // Handle YouTube thumbnail directly
    if (isYouTubeUrl(videoUrl)) {
      setThumbnailUrl(getYouTubeThumbnail(videoUrl));
      return;
    }

    // Generate a thumbnail from the first frame for local/remote video files
    if (isDirectVideoFile(videoUrl)) {
      const src = resolveVideoSrc(videoUrl);
      const videoEl = document.createElement('video');
      videoEl.src = src;
      videoEl.crossOrigin = 'anonymous';
      videoEl.muted = true;
      videoEl.playsInline = true;

      const handleLoaded = () => {
        // Seek a bit into the video for a meaningful frame
        try {
          videoEl.currentTime = Math.min(1, (videoEl.duration || 1) / 2);
        } catch (e) {
          // Some browsers might throw if duration isn't ready; fallback later
        }
      };

      const handleSeeked = () => {
        const width = videoEl.videoWidth || 640;
        const height = videoEl.videoHeight || 360;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoEl, 0, 0, width, height);
          try {
            const dataUrl = canvas.toDataURL('image/jpeg');
            setThumbnailUrl(dataUrl);
          } catch (e) {
            setThumbnailUrl(null);
          }
        }
        cleanup();
      };

      const handleError = () => {
        setThumbnailUrl(null);
        cleanup();
      };

      const cleanup = () => {
        videoEl.removeEventListener('loadeddata', handleLoaded);
        videoEl.removeEventListener('loadedmetadata', handleLoaded);
        videoEl.removeEventListener('seeked', handleSeeked);
        videoEl.removeEventListener('error', handleError);
      };

      videoEl.addEventListener('loadeddata', handleLoaded);
      videoEl.addEventListener('loadedmetadata', handleLoaded);
      videoEl.addEventListener('seeked', handleSeeked);
      videoEl.addEventListener('error', handleError);

      // Trigger loading
      videoEl.load();

      return () => {
        cleanup();
      };
    }

    setThumbnailUrl(null);
  }, [videoUrl]);

  return (
    <button
      onClick={onClick}
      className="block relative h-40 w-full rounded-lg overflow-hidden group cursor-pointer"
    >
      {thumbnailUrl ? (
        // Use next/image when possible; data URLs are supported
        <Image
          src={thumbnailUrl}
          alt={title}
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
  );
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
  const [selectedVideoIsYouTube, setSelectedVideoIsYouTube] = useState(false);

  if (!post) return null;

  const handleVideoClick = (videoUrl, title) => {
    setSelectedVideoUrl(videoUrl);
    setSelectedVideoTitle(title);
    setSelectedVideoIsYouTube(isYouTubeUrl(videoUrl));
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

                {/* Display videos with thumbnails */
                }
                {post.project_source.videos && post.project_source.videos.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-md font-medium mb-2">Videos:</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {post.project_source.videos.map((videoUrl, index) => (
                        <div key={index} className="relative">
                          <VideoThumbnailButton
                            videoUrl={videoUrl}
                            title={`${post.title} video ${index + 1}`}
                            onClick={() => handleVideoClick(videoUrl, `${post.title} - Video ${index + 1}`)}
                          />
                        </div>
                      ))}
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
      
      {/* Video Modal: YouTube or HTML5 based on URL */}
      {selectedVideoIsYouTube ? (
        <YouTubeModal
          isOpen={videoModalOpen}
          onClose={handleVideoModalClose}
          videoUrl={selectedVideoUrl}
          title={selectedVideoTitle}
        />
      ) : (
        <Html5VideoModal
          isOpen={videoModalOpen}
          onClose={handleVideoModalClose}
          videoUrl={selectedVideoUrl}
          title={selectedVideoTitle}
        />
      )}
    </Dialog>
  );
}
