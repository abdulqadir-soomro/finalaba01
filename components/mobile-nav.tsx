"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function MobileNav() {
  const pathname = usePathname()
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      setIsLoggedIn(!!data.session)
    }

    checkAuth()

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Update cart and wishlist counts
  useEffect(() => {
    const updateCounts = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]")
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
        setCartCount(cart.length)
        setWishlistCount(wishlist.length)
      } catch (e) {
        console.error("Error parsing data:", e)
      }
    }

    // Initial update
    updateCounts()

    // Update counts when storage changes
    window.addEventListener("storage", updateCounts)

    // Custom event for cart/wishlist updates
    window.addEventListener("cartUpdated", updateCounts)
    window.addEventListener("wishlistUpdated", updateCounts)

    return () => {
      window.removeEventListener("storage", updateCounts)
      window.removeEventListener("cartUpdated", updateCounts)
      window.removeEventListener("wishlistUpdated", updateCounts)
    }
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="grid grid-cols-5">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-2 ${
            pathname === "/" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="mt-1 text-[10px]">Home</span>
        </Link>
        <Link
          href="/collection"
          className={`flex flex-col items-center justify-center py-2 ${
            pathname.includes("/collection") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Search className="h-5 w-5" />
          <span className="mt-1 text-[10px]">Shop</span>
        </Link>
        <Link
          href="/cart"
          className={`flex flex-col items-center justify-center py-2 ${
            pathname === "/cart" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {cartCount}
              </span>
            )}
          </div>
          <span className="mt-1 text-[10px]">Cart</span>
        </Link>
        <Link
          href="/wishlist"
          className={`flex flex-col items-center justify-center py-2 ${
            pathname === "/wishlist" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div className="relative">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="mt-1 text-[10px]">Wishlist</span>
        </Link>
        <Link
          href={isLoggedIn ? "/account" : "/login"}
          className={`flex flex-col items-center justify-center py-2 ${
            pathname === "/login" || pathname === "/account" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <User className="h-5 w-5" />
          <span className="mt-1 text-[10px]">Account</span>
        </Link>
      </div>
    </div>
  )
}
