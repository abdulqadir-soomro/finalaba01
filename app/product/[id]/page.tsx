"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Share2, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { AddToCartAlert } from "@/components/add-to-cart-alert"

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState("medium")
  const [selectedLength, setSelectedLength] = useState("54")
  const [selectedScarf, setSelectedScarf] = useState("no-scarf")
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  // Mock product data
  const product = {
    id: Number.parseInt(params.id),
    name: "Nazleen",
    price: "₨ 31,750 – ₨ 34,250",
    basePrice: 31750,
    description:
      "The Nazleen Abaya is designed with luxury and elegance in mind. Featuring exquisite embroidery details and made from premium quality fabric, this abaya offers both style and comfort. Perfect for special occasions or everyday elegance.",
    fabric: "Premium Japanese Crepe",
    details: [
      "Premium quality fabric",
      "Hand-embroidered details",
      "Comfortable fit",
      "Elegant silhouette",
      "Includes matching scarf (optional)",
    ],
    care: [
      "Hand wash recommended",
      "Gentle cycle machine wash possible",
      "Do not bleach",
      "Iron on low heat",
      "Dry clean friendly",
    ],
    images: [
      "/assets/1.jpg",
      "/assets/2.jpg",
      "/assets/3.jpg",
      "/assets/4.jpg",
    ],
  }

  const handleAddToCart = () => {
    toast({
      title: undefined,
      description: undefined,
      action: <AddToCartAlert product={product} quantity={quantity} />,
      duration: 5000,
    })
  }

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity(quantity + 1)
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 border-muted"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 text-xl font-semibold">{product.price}</div>
            <div className="mt-1 text-sm text-muted-foreground">Including tax</div>
            <div className="mt-4">{product.description}</div>
            <div className="mt-4 text-sm">
              <span className="font-medium">Fabric:</span> {product.fabric}
            </div>
          </div>
          <div className="mb-8 space-y-6">
            <div className="space-y-2">
              <Label className="text-base">Length</Label>
              <RadioGroup value={selectedLength} onValueChange={setSelectedLength} className="flex flex-wrap gap-2">
                {["50", "52", "54", "56", "58", "60"].map((length) => (
                  <div key={length}>
                    <RadioGroupItem value={length} id={`length-${length}`} className="peer sr-only" />
                    <Label
                      htmlFor={`length-${length}`}
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-muted bg-transparent text-center text-sm hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                    >
                      {length}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label className="text-base">Size</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                {[
                  { value: "extra-small", label: "Extra Small" },
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                  { value: "extra-large", label: "Extra Large" },
                ].map((size) => (
                  <div key={size.value}>
                    <RadioGroupItem value={size.value} id={`size-${size.value}`} className="peer sr-only" />
                    <Label
                      htmlFor={`size-${size.value}`}
                      className="flex cursor-pointer items-center justify-center rounded-md border border-muted px-3 py-1 text-center text-sm hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                    >
                      {size.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label className="text-base">Scarf</Label>
              <RadioGroup value={selectedScarf} onValueChange={setSelectedScarf} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-scarf" id="no-scarf" />
                  <Label htmlFor="no-scarf">No Scarf</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="plain-scarf" id="plain-scarf" />
                  <Label htmlFor="plain-scarf">Plain Scarf (+₨ 2,000)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="embellished-scarf" id="embellished-scarf" />
                  <Label htmlFor="embellished-scarf">Embellished Scarf (+₨ 2,500)</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center space-x-4">
              <Label className="text-base">Quantity</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                  className="h-8 w-8 rounded-md"
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange("increase")}
                  className="h-8 w-8 rounded-md"
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="flex-1 rounded-xl" onClick={handleAddToCart}>
              ADD TO CART
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl">
              <Heart className="mr-2 h-4 w-4" />
              ADD TO WISHLIST
            </Button>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
          <div className="mt-10">
            <Tabs defaultValue="details">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="care">Care Instructions</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4 space-y-2">
                <ul className="ml-6 list-disc space-y-1 text-sm">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="care" className="mt-4 space-y-2">
                <ul className="ml-6 list-disc space-y-1 text-sm">
                  {product.care.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
