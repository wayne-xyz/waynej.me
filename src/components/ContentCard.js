import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ContentCard({ post, onClick }) {
  return (
    <Card 
      className="overflow-hidden relative w-full h-48 sm:h-56 md:h-64 cursor-pointer group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20 hover:-translate-y-2"
      onClick={() => onClick(post.id)}
    >
      <Image
        src={post.image || '/placeholder-image.jpg'}
        alt={post.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-300" />
      <div className="relative z-10 flex flex-col h-full justify-end p-3 sm:p-4 transform transition-transform duration-300 group-hover:translate-y-0">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-white group-hover:text-blue-100 transition-colors duration-300 text-sm sm:text-base md:text-lg leading-tight line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-between items-center p-0 gap-2">
          <Badge className="bg-white/20 text-white group-hover:bg-blue-500/30 group-hover:text-blue-100 transition-all duration-300 group-hover:scale-105 text-xs flex-shrink-0">
            {post.type}
          </Badge>
          <span className="text-xs text-white/80 group-hover:text-blue-200/90 transition-colors duration-300 flex-shrink-0">
            {new Date(post.date).toLocaleDateString()}
          </span>
        </CardFooter>
      </div>
    </Card>
  )
}
