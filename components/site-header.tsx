"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, ShoppingBag, Heart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabase"

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      setIsLoggedIn(!!data.session)
      if (data.session) {
        setUser(data.session.user)
      }
    }

    checkAuth()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
      setUser(session?.user || null)
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

    updateCounts()
    window.addEventListener("storage", updateCounts)
    window.addEventListener("cartUpdated", updateCounts)
    window.addEventListener("wishlistUpdated", updateCounts)

    return () => {
      window.removeEventListener("storage", updateCounts)
      window.removeEventListener("cartUpdated", updateCounts)
      window.removeEventListener("wishlistUpdated", updateCounts)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo2.png" alt="SAHA Modest Wear Logo" className="h-10 w-auto" />
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              HOME
            </Link>

            {/* COLLECTION DROPDOWN */}
            <DropdownMenu>
  <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary">
    COLLECTION
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-44 mt-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border">
    <DropdownMenuItem asChild>
      <Link href="/collection">All Collection</Link>
    </DropdownMenuItem>
    <DropdownMenuItem asChild>
      <Link href="/collection/best-sellers">Best Sellers</Link>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


            <Link href="/customize" className="text-sm font-medium transition-colors hover:text-primary">
              CUSTOMIZE
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              CONTACT US
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form className="hidden lg:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-60 rounded-xl border-none bg-muted pl-8 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </form>
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          {isLoggedIn ? (
            <Link href="/account">
              <Button variant="outline" className="h-8 rounded-xl">
                <User className="mr-2 h-4 w-4" />
                Account
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="h-8 rounded-xl">
                Login
              </Button>
            </Link>
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-6 pt-6">
                <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                <Link href="/collection" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  All Collection
                </Link>
                <Link href="/collection/best-sellers" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Best Sellers
                </Link>
                <Link href="/customize" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Customize
                </Link>
                <Link href="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Contact Us
                </Link>
                {isLoggedIn ? (
                  <Link href="/account" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    My Account
                  </Link>
                ) : (
                  <Link href="/login" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                    Login / Register
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
