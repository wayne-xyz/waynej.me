// src/components/ContentModal.js
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function ContentModal({ isOpen, onClose, post }) {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{post.title}</DialogTitle>
          <DialogDescription>{new Date(post.date).toLocaleDateString()}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>{post.description}</p>
        </div>
        {post.urls && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Related Links:</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(post.urls).map(([key, url]) => (
                <Button key={key} variant="outline" asChild>
                  <a href={url} target="_blank" rel="noopener noreferrer">{key}</a>
                </Button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

