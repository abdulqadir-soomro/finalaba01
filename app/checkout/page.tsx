"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Package } from "lucide-react"

// Enhanced cart interface with all possible product options
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

export default function Checkout() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    notes: "",
  })

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (e) {
        console.error("Error parsing cart data:", e)
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Calculate subtotal, shipping, and total
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 150 : 0
  const total = subtotal + shipping

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checking out.")
      return
    }

    setIsLoading(true)

    // Generate email content
    const orderID = `ORDER-${Math.floor(100000 + Math.random() * 900000)}`
    const subject = `New Order: ${orderID}`

    let body = `New order from ${formData.fullName}\n\n`
    body += `Order ID: ${orderID}\n`
    body += `Date: ${new Date().toLocaleString()}\n\n`

    body += `Customer Information:\n`
    body += `Name: ${formData.fullName}\n`
    body += `Email: ${formData.email}\n`
    body += `Phone: ${formData.phone}\n\n`

    body += `Shipping Address:\n`
    body += `${formData.address}\n`
    body += `${formData.city}, ${formData.state} ${formData.zipCode}\n\n`

    body += `Order Items:\n`
    cartItems.forEach((item) => {
      body += `- ${item.name} (${item.quantity}x) - Rs. ${item.price.toLocaleString()}\n`

      // Include all possible product options in the email
      if (item.size) body += `  Size: ${item.size}\n`
      if (item.color) body += `  Color: ${item.color}\n`
      if (item.length) body += `  Length: ${item.length}\n`
      if (item.inner) body += `  Inner: ${item.inner}\n`
      if (item.scarf) body += `  Scarf: ${item.scarf}\n`
      if (item.fabric) body += `  Fabric: ${item.fabric}\n`
      if (item.embroidery) body += `  Embroidery: ${item.embroidery}\n`
    })

    body += `\nSubtotal: Rs. ${subtotal.toLocaleString()}\n`
    body += `Shipping: Rs. ${shipping.toLocaleString()}\n`
    body += `Total: Rs. ${total.toLocaleString()}\n\n`

    if (formData.notes) {
      body += `Additional Notes:\n${formData.notes}\n\n`
    }

    body += `Payment Method: Cash on Delivery`

    // Open email client
    const mailtoLink = `mailto:rminhal783@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink

    // Clear the cart after sending email
    localStorage.removeItem("cart")

    // Show confirmation message after short delay
    setTimeout(() => {
      alert("Thank you for your order! We have received your details and will contact you shortly.")
      router.push("/")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="mt-2 text-muted-foreground">Complete your order by providing shipping details</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            <div className="rounded-xl border p-6">
              <h2 className="mb-4 text-xl font-semibold">Contact Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
              </div>
            </div>

            <div className="rounded-xl border p-6">
              <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Postal Code</Label>
                  <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
                </div>
              </div>
            </div>

            <div className="rounded-xl border p-6">
              <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
              <div className="flex items-center space-x-2 rounded-lg border p-3">
                <div className="h-4 w-4 rounded-full bg-primary"></div>
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-muted-foreground">Pay when your order arrives</p>
                  </div>
                  <div className="rounded-md bg-primary/10 p-2 text-primary">
                    <Package className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border p-6">
              <h2 className="mb-4 text-xl font-semibold">Additional Notes</h2>
              <div className="space-y-2">
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Special instructions for delivery or anything else we should know"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Button type="submit" className="mt-4 w-full gap-2 rounded-xl" size="lg" disabled={isLoading}>
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Place Order
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-20 lg:h-fit">
          <div className="rounded-xl border p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="font-medium">{item.name}</p>

                      {/* Display all available product options */}
                      {(item.size || item.length) && (
                        <p className="text-sm text-muted-foreground">
                          {item.size && `Size: ${item.size}`} {item.length && `Length: ${item.length}`}
                        </p>
                      )}

                      {(item.inner || item.scarf) && (
                        <p className="text-sm text-muted-foreground">
                          {item.inner && `Inner: ${item.inner}`} {item.scarf && `Scarf: ${item.scarf}`}
                        </p>
                      )}

                      {(item.fabric || item.color) && (
                        <p className="text-sm text-muted-foreground">
                          {item.fabric && `Fabric: ${item.fabric}`} {item.color && `Color: ${item.color}`}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <p className="text-sm">Qty: {item.quantity}</p>
                        <p className="font-medium">₨ {item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 space-y-2 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₨ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₨ {shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₨ {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>Your cart is empty</p>
                <Button variant="outline" className="mt-4" onClick={() => router.push("/collection")}>
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
