"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  size?: string
  color?: string
  length?: string
  inner?: string
  scarf?: string
  fabric?: string
  embroidery?: string
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (e) {
        console.error("Error parsing cart data:", e)
      }
    }
    setIsLoading(false)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, isLoading])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCartItems([])
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 150 : 0
  const total = subtotal + shipping

  if (isLoading) {
    return (
      <div className="container flex min-h-[400px] items-center justify-center px-4 py-10 md:px-6 md:py-16">
        <p>Loading your cart...</p>
      </div>
    )
  }

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="mt-2 text-muted-foreground">
          {cartItems.length > 0
            ? `You have ${cartItems.length} item${cartItems.length > 1 ? "s" : ""} in your cart`
            : "Your cart is empty"}
        </p>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border">
              <div className="hidden border-b p-4 sm:grid sm:grid-cols-5">
                <div className="col-span-2 font-medium">Product</div>
                <div className="text-center font-medium">Price</div>
                <div className="text-center font-medium">Quantity</div>
                <div className="text-right font-medium">Total</div>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="border-b p-4 last:border-0">
                  <div className="grid gap-4 sm:grid-cols-5 sm:gap-6">
                    <div className="col-span-2 flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>

                        {/* Display product options */}
                        <div className="mt-1 space-y-1 text-xs text-muted-foreground">
                          {item.size && <p>Size: {item.size}</p>}
                          {item.length && <p>Length: {item.length}</p>}
                          {item.inner && <p>Inner: {item.inner}</p>}
                          {item.scarf && <p>Scarf: {item.scarf}</p>}
                          {item.color && <p>Color: {item.color}</p>}
                          {item.fabric && <p>Fabric: {item.fabric}</p>}
                          {item.embroidery && <p>Embroidery: {item.embroidery}</p>}
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="mt-2 flex items-center text-xs text-red-500 hover:text-red-700 sm:hidden"
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <span className="sm:hidden">Price: </span>
                      <span className="font-medium">₨ {item.price.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-l-md rounded-r-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                          className="h-8 w-12 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-l-none rounded-r-md"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end">
                      <span className="font-medium">₨ {(item.price * item.quantity).toLocaleString()}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-4 hidden text-red-500 hover:text-red-700 sm:block"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => router.push("/collection")}>
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={clearCart} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="lg:sticky lg:top-20 lg:h-fit">
            <div className="rounded-xl border p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₨ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>₨ {shipping.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2"></div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₨ {total.toLocaleString()}</span>
                </div>
              </div>

              <Button className="mt-6 w-full gap-2 rounded-xl" size="lg" onClick={() => router.push("/checkout")}>
                <ShoppingBag className="h-5 w-5" />
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border py-16">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-medium">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added any items to your cart yet.</p>
          <Button className="mt-6 rounded-xl" onClick={() => router.push("/collection")}>
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  )
}
