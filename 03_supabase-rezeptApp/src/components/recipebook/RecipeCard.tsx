import { Star, Clock, ChefHat } from 'lucide-react'

import { Badge } from '../ui/badge'
import { Card, CardContent, CardFooter } from '../ui/card' // <-- Footer import
import { ImageWithFallback } from '../figma/ImageWithFallback'

interface RecipeCardProps {
  id: string
  title: string
  image: string
  rating: number
  time: string
  difficulty: string
  category: string
  onClick?: () => void
  actions?: React.ReactNode
}

export function RecipeCard({
  title,
  image,
  rating,
  time,
  difficulty,
  category,
  onClick,
  actions,
}: RecipeCardProps) {
  return (
    <Card
      className="overflow-hidden border-border/50 bg-card text-card-foreground
                 hover:shadow-lg hover:-translate-y-[2px] transition-all duration-200
                 focus-within:ring-2 focus-within:ring-ring/50 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        <Badge className="absolute top-2 right-2 bg-white/90 text-foreground border-0 backdrop-blur-sm">
          {category}
        </Badge>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <CardContent className="p-4">
        <h3 className="font-handwritten text-xl mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span>{Number.isFinite(rating) ? rating.toFixed(1) : '–'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{time || '–'}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            <span>{difficulty || '–'}</span>
          </div>
        </div>
      </CardContent>

      {actions ? (
        <CardFooter className="px-4 pb-4 pt-0">
          <div className="flex gap-2 w-full">{actions}</div>
        </CardFooter>
      ) : null}
    </Card>
  )
}
