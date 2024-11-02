import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ContentCard({ post, onClick }) {
  return (
    <Card 
      className="overflow-hidden relative w-80 h-64 cursor-pointer transition-transform hover:scale-105"
      onClick={() => onClick(post.id)}
    >
      <Image
        src={post.image || '/placeholder-image.jpg'}
        alt={post.title}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="relative z-10 flex flex-col h-full justify-end p-4">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-white">{post.title}</CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-between items-center p-0">
          <Badge className="bg-white/20 text-white">{post.type}</Badge>
          <span className="text-xs text-white/80">
            {new Date(post.date).toLocaleDateString()}
          </span>
        </CardFooter>
      </div>
    </Card>
  )
}
