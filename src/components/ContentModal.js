// src/components/ContentModal.js
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ContentModal({ isOpen, onClose, post }) {
  if (!post) return null;

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
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <Image
                src={post.image || '/placeholder-image.jpg'}
                alt={post.title}
                layout="fill"
                objectFit="cover"
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

            {/* Show original image if GIF is displayed */}
            {post.gif && post.image && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Project Image:</h3>
                <div className="relative h-40 w-full rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={`${post.title} image`}
                    layout="fill"
                    objectFit="cover"
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
    </Dialog>
  );
}
