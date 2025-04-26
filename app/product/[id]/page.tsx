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
  // Mock product data based on the ID
  const products = [
    {
      id: 1,
      name: "Pom Pom",
      price: "₨ 15,000",
      basePrice: 15000,
      description:
        "Crafted from luxurious premium nida, this black abaya features dramatic bell sleeves with playful black and turquoise pom-pom detailing. Paired with a matching scarf, it offers a refined yet lively touch to your modest wear collection.",
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
        "/assets/13.jpg",
        "/assets/14.jpg",
        "/assets/20.jpg",
        "/assets/21.jpg",
      ],
    },
    {
      id: 2,
      name: "zarina",
      price: "₨ 13,500",
      basePrice: 18500,
      description:
        "This elegant navy blue abaya features intricate gold-thread embroidery along the sleeves and hemline. Made with premium silk blend fabric that drapes beautifully, creating a sophisticated silhouette perfect for special occasions.",
      details: [
        "Luxurious silk blend fabric",
        "Gold-thread embroidery",
        "Front button closure",
        "Flowing design",
        "Modest yet contemporary style",
      ],
      care: [
        "Dry clean only",
        "Store hanging",
        "Avoid direct sunlight",
        "Do not bleach",
        "Iron on medium heat",
      ],
      images: [
        "/assets/1.jpg",
        "/assets/2.jpg",
        "/assets/3.jpg",
        "/assets/4.jpg",
      ],
    },
    {
      id: 3,
      name: "Layla",
      price: "₨ 12,000",
      basePrice: 12000,
      description:
        "A minimalist abaya in soft gray crepe fabric, featuring subtle pearl accents on the cuffs. The streamlined design offers everyday elegance with a modern touch, perfect for both casual and formal settings.",
      details: [
        "Premium Japanese crepe fabric",
        "Pearl embellishments",
        "Concealed button closure",
        "Side pockets",
        "Versatile design for everyday wear",
      ],
      care: [
        "Machine wash on delicate cycle",
        "Wash with similar colors",
        "Tumble dry low heat",
        "Cool iron if needed",
        "Do not bleach",
      ],
      images: [
        "/assets/16.jpg",
        "/assets/15.jpg",
        "/assets/27.jpg",
        "/assets/19.jpg",
      ],
    },
    {
      id: 4,
      name: "Midnight Crimson",
      price: "₨ 10,000",
      basePrice: 10000,
      description:
        "A statement piece featuring emerald green nida fabric with delicate lace overlay on the sleeves. The flowing A-line silhouette creates movement with every step, while the contrasting black piping adds definition.",
      details: [
        "Premium nida fabric",
        "French lace overlay",
        "Contrast piping detail",
        "A-line silhouette",
        "Hidden magnetic closures",
      ],
      care: [
        "Hand wash cold",
        "Do not wring",
        "Lay flat to dry",
        "Iron on low heat",
        "Dry clean for best results",
      ],
      images: [
        "/assets/23.jpg",
        "/assets/28.jpg",
        // "/assets/15.jpg",
        // "/assets/16.jpg",
      ],
    },
    {
      id: 5,
      name: "Luna Vogue",
      price: "₨ 9000",
      basePrice: 16800,
      description:
        "This burgundy abaya combines modern styling with traditional craftsmanship, featuring hand-stitched geometric patterns and kimono-inspired sleeves. The premium crepe fabric ensures comfort while maintaining an elegant drape.",
      details: [
        "Hand-stitched geometric embroidery",
        "Kimono-style sleeves",
        "Premium crepe fabric",
        "Includes matching belt",
        "Side slits for ease of movement",
      ],
      care: [
        "Gentle hand wash",
        "Mild detergent only",
        "Do not twist or wring",
        "Iron on medium heat",
        "Hang to dry in shade",
      ],
      images: [
        "/assets/29.jpeg",
        "/assets/20.jpeg",
        "/assets/21.jpeg",
        // "/assets/20.jpg",
      ],
    },
    {
      id: 6,
      name: "Mocha Bloom",
      price: "₨ 14,000",
      basePrice: 14000,
      description:
        "A contemporary open-front abaya in rich cobalt blue with cascading butterfly sleeves. Adorned with minimalist crystal embellishments along the front panels, this piece transitions effortlessly from day to evening wear.",
      details: [
        "Open-front design",
        "Butterfly sleeves",
        "Premium Korean nida fabric",
        "Crystal embellishments",
        "Includes matching inner slip dress",
      ],
      care: [
        "Dry clean recommended",
        "Remove embellishments before washing",
        "Do not bleach or tumble dry",
        "Iron on reverse side",
        "Store on padded hanger",
      ],
      images: [
        "/assets/26.jpg",
        "/assets/30.jpg",
        "/assets/31.jpg",
        // "/assets/24.jpg",
      ],
    },
    {
      id: 7,
      name: "Summer Linen",
      price: "₨ 9000",
      basePrice: 9000,
      description:
        "This dusty rose abaya features delicate pleating across the shoulders and a subtle high-low hem. Made from lightweight satin-touch crepe, it offers a flattering silhouette with an ethereal quality perfect for special occasions.",
      details: [
        "Satin-touch crepe fabric",
        "Pleated shoulder detailing",
        "High-low hem design",
        "Hidden snap closures",
        "Modest yet contemporary fit",
      ],
      care: [
        "Cold hand wash only",
        "Mild detergent",
        "Do not soak",
        "Hang to dry away from sunlight",
        "Cool iron from inside",
      ],
      images: [
        "/assets/25.jpg",
        // "/assets/26.jpg",
        // "/assets/27.jpg",
        "/assets/32.jpg",
      ],
    },
    {
      id: 8,
      name: "Zahra Bloom",
      price: "₨ 12,500",
      basePrice: 12500,
      description:
        "A luxurious occasion piece in deep plum silk-blend fabric, featuring intricate beadwork along the cuffs and collar. The tailored silhouette with subtle flare creates a regal presence perfect for formal gatherings.",
      details: [
        "Silk-blend fabric",
        "Hand-applied beadwork",
        "Satin-lined collar and cuffs",
        "Tailored silhouette with flare",
        "Includes matching embellished scarf",
      ],
      care: [
        "Professional dry clean only",
        "Store in garment bag",
        "Avoid contact with perfumes and oils",
        "Do not iron beadwork",
        "Handle with care",
      ],
      images: [
        "/assets/24.jpg",
        // "/assets/30.jpg",
        // "/assets/31.jpg",
        // "/assets/32.jpg",
      ],
    },
    {
      id: 9,
      name: "Haya Luxe",
      price: "₨ 12,000",
      basePrice: 12000,
      description:
        "This forest green abaya features architectural cape-style overlays and subtle metallic thread detailing. The structured shoulders and flowing silhouette create a contemporary statement while maintaining modest elegance.",
      details: [
        "Premium crepe fabric",
        "Cape-style overlay",
        "Metallic thread embroidery",
        "Structured shoulders",
        "Concealed front zipper",
      ],
      care: [
        "Dry clean recommended",
        "Hand wash with extreme care",
        "Do not bleach",
        "Iron on low heat",
        "Store hanging to prevent creases",
      ],
      images: [
        "/assets/33.jpeg",
        // "/assets/34.jpg",
        // "/assets/35.jpg",
        // "/assets/36.jpg",
      ],
    },
    {
      id: 10,
      name: "Mocha Belle",
      price: "₨ 12,500",
      basePrice: 12500,
      description:
        "A blend of tradition and modernity, this ivory abaya features delicate cutwork embroidery and scalloped trim. Made from breathable cotton-blend fabric, it provides comfort while the pearl-accented sleeves add a touch of luxury.",
      details: [
        "Cotton-blend fabric",
        "Cutwork embroidery",
        "Pearl accents on sleeves",
        "Scalloped hem and trim",
        "Side pockets",
      ],
      care: [
        "Gentle machine wash",
        "Wash with similar colors",
        "Do not bleach",
        "Medium iron",
        "Dry in shade",
      ],
      images: [
        "/assets/30.jpeg",
        "/assets/31.jpeg",
        // "/assets/39.jpg",
        // "/assets/40.jpg",
      ],
    },
  ];
  
  // Find the product based on the ID from the URL
  const product = products.find(p => p.id === Number.parseInt(params.id)) || products[0];

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
