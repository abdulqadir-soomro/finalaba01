"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { AddToCartAlert } from "@/components/add-to-cart-alert"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  name: string
  price: string
  image: string
  collection?: string
  category?: string
  featured?: boolean
}

interface ProductOptionsModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductOptionsModal({ product, isOpen, onClose }: ProductOptionsModalProps) {
  const [selectedLength, setSelectedLength] = useState("54")
  const [selectedInner, setSelectedInner] = useState("without-inner")
  const [selectedScarf, setSelectedScarf] = useState("no-scarf")
  const [selectedSize, setSelectedSize] = useState("medium")
  const [redirectToCheckout, setRedirectToCheckout] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  if (!isOpen) return null

  // Extract numeric price from string (e.g., "₨ 31,750 – ₨ 34,250" -> 31750)
  const extractPrice = (priceString: string): number => {
    const match = priceString.match(/\d[\d,]*/)
    if (match) {
      return Number.parseInt(match[0].replace(/,/g, ""))
    }
    return 0
  }

  const basePrice = extractPrice(product.price)

  // Calculate additional costs
  const getAdditionalCost = (): number => {
    let additional = 0
    if (selectedScarf === "plain-scarf") additional += 2000
    if (selectedScarf === "embellished-scarf") additional += 2500
    return additional
  }

  const finalPrice = basePrice + getAdditionalCost()

  const handleAddToCart = (goToCheckout = false) => {
    // Get current cart
    const storedCart = localStorage.getItem("cart")
    let cart: any[] = []

    if (storedCart) {
      try {
        cart = JSON.parse(storedCart)
      } catch (e) {
        console.error("Error parsing cart data:", e)
      }
    }

    // Create cart item with selected options
    const cartItem = {
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: 1,
      image: product.image,
      size: selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1),
      length: selectedLength,
      inner: selectedInner === "with-inner" ? "With Inner" : "Without Inner",
      scarf:
        selectedScarf === "no-scarf"
          ? "No Scarf"
          : selectedScarf === "plain-scarf"
            ? "Plain Scarf"
            : "Embellished Scarf",
    }

    // Check if same product with same options already exists
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.id === cartItem.id &&
        item.size === cartItem.size &&
        item.length === cartItem.length &&
        item.inner === cartItem.inner &&
        item.scarf === cartItem.scarf,
    )

    if (existingItemIndex >= 0) {
      // Increase quantity if already in cart
      cart[existingItemIndex].quantity += 1
    } else {
      // Add new item to cart
      cart.push(cartItem)
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart))

    // Close the modal
    onClose()

    if (goToCheckout) {
      // Redirect to checkout
      router.push("/checkout")
    } else {
      // Show the success toast
      toast({
        title: null,
        description: null,
        action: (
          <AddToCartAlert
            product={product}
            quantity={1}
            options={{
              length: selectedLength,
              inner: selectedInner === "with-inner" ? "With Inner" : "Without Inner",
              scarf:
                selectedScarf === "no-scarf"
                  ? "No Scarf"
                  : selectedScarf === "plain-scarf"
                    ? "Plain Scarf"
                    : "Embellished Scarf",
              size: selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1),
            }}
          />
        ),
        duration: 5000,
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-h-[90vh] w-full max-w-md overflow-auto rounded-xl bg-background p-6 shadow-lg">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-muted-foreground">₨ {finalPrice.toLocaleString()}</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-base">Length</Label>
            <RadioGroup value={selectedLength} onValueChange={setSelectedLength} className="grid grid-cols-6 gap-2">
              {["50", "52", "54", "56", "58", "60"].map((length) => (
                <div key={length}>
                  <RadioGroupItem value={length} id={`modal-length-${length}`} className="peer sr-only" />
                  <Label
                    htmlFor={`modal-length-${length}`}
                    className="flex h-9 w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-transparent text-center text-sm hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                  >
                    {length}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Inner</Label>
            <RadioGroup value={selectedInner} onValueChange={setSelectedInner} className="grid grid-cols-2 gap-2">
              <div>
                <RadioGroupItem value="with-inner" id="modal-with-inner" className="peer sr-only" />
                <Label
                  htmlFor="modal-with-inner"
                  className="flex h-9 w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-transparent text-center text-sm hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                >
                  With Inner
                </Label>
              </div>
              <div>
                <RadioGroupItem value="without-inner" id="modal-without-inner" className="peer sr-only" />
                <Label
                  htmlFor="modal-without-inner"
                  className="flex h-9 w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-transparent text-center text-sm hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                >
                  Without Inner
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Scarf</Label>
            <RadioGroup value={selectedScarf} onValueChange={setSelectedScarf} className="grid grid-cols-1 gap-2">
              <div>
                <RadioGroupItem value="no-scarf" id="modal-no-scarf" className="peer sr-only" />
                <Label
                  htmlFor="modal-no-scarf"
                  className="flex h-9 w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-transparent text-center text-sm hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                >
                  No Scarf
                </Label>
              </div>
              <div>
                <RadioGroupItem value="plain-scarf" id="modal-plain-scarf" className="peer sr-only" />
                <Label
                  htmlFor="modal-plain-scarf"
                  className="flex h-9 w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-transparent text-center text-sm hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                >
                  Plain Scarf (+Rs. 2,000)
                </Label>
              </div>
              <div>
                <RadioGroupItem value="embellished-scarf" id="modal-embellished-scarf" className="peer sr-only" />
                <Label
                  htmlFor="modal-embellished-scarf"
                  className="flex h-9 w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-transparent text-center text-sm hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                >
                  Embellished Scarf (+Rs. 2,500)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Size</Label>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="grid grid-cols-3 gap-2">
              {[
                { value: "extra-small", label: "Extra Small" },
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" },
                { value: "extra-large", label: "Extra Large" },
              ].map((size) => (
                <div key={size.value}>
                  <RadioGroupItem value={size.value} id={`modal-size-${size.value}`} className="peer sr-only" />
                  <Label
                    htmlFor={`modal-size-${size.value}`}
                    className="flex h-9 w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-transparent text-center text-sm hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                  >
                    {size.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 rounded-xl" onClick={() => handleAddToCart(false)}>
              ADD TO CART
            </Button>
            <Button className="flex-1 rounded-xl" onClick={() => handleAddToCart(true)}>
              BUY NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
