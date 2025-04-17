"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Search, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductOptionsModal } from "@/components/product-options-modal"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: string
  image: string
  collection: string
  description: string
  category: string
  featured?: boolean
}

interface ProductCardProps {
  product: Product
  showOptionsButton?: boolean
}

export function ProductCard({ product, showOptionsButton = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showOptionsModal, setShowOptionsModal] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleAddToWishlist = () => {
    const storedWishlist = localStorage.getItem("wishlist")
    let wishlist: Product[] = []

    if (storedWishlist) {
      try {
        wishlist = JSON.parse(storedWishlist)
      } catch (e) {
        console.error("Error parsing wishlist data:", e)
      }
    }

    if (!wishlist.some((item) => item.id === product.id)) {
      wishlist.push(product)
      localStorage.setItem("wishlist", JSON.stringify(wishlist))

      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    } else {
      toast({
        title: "Already in Wishlist",
        description: `${product.name} is already in your wishlist.`,
      })
    }
  }

  const handleQuickView = () => {
    router.push(`/product/${product.id}`)
  }

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded)
  }

  return (
    <>
      <Card className="overflow-hidden border-none bg-transparent transition-all duration-300 hover:shadow-lg">
        <div
          className="relative aspect-[2/3] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div
            className={`absolute inset-0 flex items-center justify-center gap-2 bg-black/10 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full bg-white/80 text-foreground shadow-sm backdrop-blur-sm hover:bg-white"
              onClick={handleQuickView}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Quick view</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full bg-white/80 text-foreground shadow-sm backdrop-blur-sm hover:bg-white"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          {product.featured && (
            <Badge className="absolute left-3 top-3" variant="secondary">
              Bestseller
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-center text-lg font-medium transition-colors hover:text-primary">
              {product.name}
            </h3>
          </Link>

          <div className="mt-1 text-center text-sm text-muted-foreground">
            {product.category}
          </div>

          <div className="mt-2 text-center font-medium">{product.price}</div>

          {/* Styled Description */}
          {product.description && product.description.trim().length > 0 && (
            <div className="mt-2 text-center text-sm text-muted-foreground italic leading-snug">
              <div className={isDescriptionExpanded ? '' : 'line-clamp-3'}>
                {product.description}
              </div>

              <button
                onClick={toggleDescription}
                className="text-primary mt-2"
              >
                {isDescriptionExpanded ? 'Read less' : 'Read more'}
              </button>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2 p-2">
          <div className="text-center text-xs text-muted-foreground">{product.collection}</div>
          {showOptionsButton ? (
            <Button variant="outline" className="w-full rounded-xl" onClick={() => setShowOptionsModal(true)}>
              SELECT OPTIONS
            </Button>
          ) : (
            <Button variant="outline" className="w-full rounded-xl" onClick={() => setShowOptionsModal(true)}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              ADD TO CART
            </Button>
          )}
        </CardFooter>
      </Card>

      {showOptionsModal && (
        <ProductOptionsModal
          product={product}
          isOpen={showOptionsModal}
          onClose={() => setShowOptionsModal(false)}
        />
      )}
    </>
  )
}
