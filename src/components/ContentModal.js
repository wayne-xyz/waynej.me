// src/components/ContentModal.js
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ContentModal({ isOpen, onClose, post }) {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1280px]   sm:h-[60vh] p-0 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Left side - Image */}
          <div className="sm:w-2/3 relative h-[300px] sm:h-auto">
            <Image
              src={post.image || '/placeholder-image.jpg'}
              alt={post.title}
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Right side - Content */}
          <div className="sm:w-1/3 p-6 overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{post.title}</DialogTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </DialogHeader>

            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">{post.description}</p>
            </div>

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
