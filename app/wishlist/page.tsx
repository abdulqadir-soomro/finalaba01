"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WishlistItem {
  id: number
  name: string
  price: number | string
  image: string
  collection?: string
  category?: string
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function WishlistPage() {
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load wishlist from localStorage
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      try {
        setWishlistItems(JSON.parse(storedWishlist))
      } catch (e) {
        console.error("Error parsing wishlist data:", e)
      }
    }
    setIsLoading(false)
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
    }
  }, [wishlistItems, isLoading])

  const removeItem = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your wishlist?")) {
      setWishlistItems([])
    }
  }

  const addToCart = (item: WishlistItem) => {
    // Get current cart
    const storedCart = localStorage.getItem("cart")
    let cart: CartItem[] = []

    if (storedCart) {
      try {
        cart = JSON.parse(storedCart)
      } catch (e) {
        console.error("Error parsing cart data:", e)
      }
    }

    // Check if item already in cart
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id)

    if (existingItemIndex >= 0) {
      // Increase quantity if already in cart
      cart[existingItemIndex].quantity += 1
    } else {
      // Add new item to cart
      // Convert price from string to number if needed
      const priceValue = typeof item.price === "string" ? Number.parseInt(item.price.replace(/[^\d]/g, "")) : item.price

      cart.push({
        id: item.id,
        name: item.name,
        price: priceValue,
        quantity: 1,
        image: item.image,
      })
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart))

    // Optionally remove from wishlist
    removeItem(item.id)

    // Notify user
    alert(`${item.name} has been added to your cart!`)
  }

  if (isLoading) {
    return (
      <div className="container flex min-h-[400px] items-center justify-center px-4 py-10 md:px-6 md:py-16">
        <p>Loading your wishlist...</p>
      </div>
    )
  }

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="mt-2 text-muted-foreground">
          {wishlistItems.length > 0
            ? `You have ${wishlistItems.length} item${wishlistItems.length > 1 ? "s" : ""} in your wishlist`
            : "Your wishlist is empty"}
        </p>
      </div>

      {wishlistItems.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group relative rounded-xl border p-2">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 text-red-500 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove from wishlist</span>
                  </button>
                </div>

                <div className="p-3">
                  <Link href={`/product/${item.id}`}>
                    <h3 className="font-medium transition-colors hover:text-primary">{item.name}</h3>
                  </Link>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {item.category && <span>{item.category}</span>}
                  </div>
                  <div className="mt-2 font-medium">{item.price}</div>

                  <Button className="mt-3 w-full gap-2 rounded-xl" size="sm" onClick={() => addToCart(item)}>
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => router.push("/collection")}>
              Continue Shopping
            </Button>
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              Clear Wishlist
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border py-16">
          <Heart className="h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-medium">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">Save your favorite items to your wishlist.</p>
          <Button className="mt-6 rounded-xl" onClick={() => router.push("/collection")}>
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  )
}
