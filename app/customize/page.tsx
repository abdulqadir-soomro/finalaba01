"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { AddToCartAlert } from "@/components/add-to-cart-alert"

export default function CustomizePage() {
  const [fabric, setFabric] = useState("premium-crepe")
  const [color, setColor] = useState("black")
  const [embroidery, setEmbroidery] = useState("none")
  const [embroideryColor, setEmbroideryColor] = useState("gold")
  const [sleeveStyle, setSleeveStyle] = useState("regular")
  const [length, setLength] = useState(54)
  const [notes, setNotes] = useState("")
  const { toast } = useToast()

  const fabricOptions = [
    {
      id: "Premium Nida",
      name: "Premium Nida",
      description: "Soft, elegant drape with matte finish",
      price: 0,
    },
    {
      id: "Nida",
      name: "Nida",
      description: "Lightweight with subtle sheen",
      price: 800,
    },
    {
      id: "Laser nida",
      name: "Laser nida",
      description: "Premium texture with excellent drape",
      price: 1200,
    },
    {
      id: "Crepe",
      name: "Crepe",
      description: "Breathable natural fiber",
      price: 1500,
    },
    {
      id:"Georgette",
      name: "Georgette",
      description: "Breathable natural fiber",
      price: 1500
    },
  ]

  const colorOptions = [
    { id: "black", name: "Black", hex: "#000000" },
    { id: "navy", name: "Navy", hex: "#0A1747" },
    { id: "burgundy", name: "Burgundy", hex: "#800020" },
    { id: "olive", name: "Olive", hex: "#556B2F" },
    { id: "beige", name: "Beige", hex: "#F5F5DC" },
    { id: "gray", name: "Gray", hex: "#808080" },
  ]

  const embroideryOptions = [
    {
      id: "none",
      name: "No Embroidery",
      description: "Clean, minimal design",
      price: 0,
    },
    {
      id: "sleeves",
      name: "Sleeve Embroidery",
      description: "Elegant patterns on sleeves",
      price: 2500,
    },
    {
      id: "front",
      name: "Front Embroidery",
      description: "Detailed work on the front panel",
      price: 3500,
    },
    {
      id: "full",
      name: "Full Embroidery",
      description: "Luxurious all-over pattern",
      price: 5000,
    },
  ]

  const sleeveOptions = [
    { id: "regular", name: "Regular Sleeves" },
    { id: "bell", name: "Bell Sleeves" },
    { id: "butterfly", name: "Butterfly Sleeves" },
    { id: "flared", name: "Flared Sleeves" },
    { id: "kimono", name: "Kimono Sleeves" },
  ]

  const embroideryColorOptions = [
    { id: "gold", name: "Gold", hex: "#CFB53B" },
    { id: "silver", name: "Silver", hex: "#C0C0C0" },
    { id: "pearl", name: "Pearl White", hex: "#F5F5F5" },
    { id: "rose-gold", name: "Rose Gold", hex: "#B76E79" },
    { id: "black", name: "Black", hex: "#000000" },
  ]

  const handleAddToCart = () => {
    const product = {
      id: 999,
      name: "Custom Abaya",
      price: "₨ 35,000",
      images: ["/assets/6.jpg"],
    }

    toast({
      title: null,
      description: null,
      action: <AddToCartAlert product={product} quantity={1} />,
      duration: 5000,
    })
  }

  const getBasePrice = () => {
    const selectedFabric = fabricOptions.find((f) => f.id === fabric)
    const selectedEmbroidery = embroideryOptions.find((e) => e.id === embroidery)
    return 35000 + (selectedFabric?.price || 0) + (selectedEmbroidery?.price || 0)
  }

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Customize Your Abaya</h1>
        <p className="mt-2 text-muted-foreground">Create a unique piece tailored to your preferences</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Tabs defaultValue="fabric" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="fabric">Fabric</TabsTrigger>
              {/* <TabsTrigger value="color">Color</TabsTrigger> */}
              {/* <TabsTrigger value="embroidery">Embroidery</TabsTrigger> */}
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="measurements">Size</TabsTrigger>
            </TabsList>

            <TabsContent value="fabric" className="mt-6 space-y-6">
              <div className="space-y-4">
                <Label className="text-lg">Select Fabric</Label>
                <RadioGroup value={fabric} onValueChange={setFabric} className="grid gap-4 sm:grid-cols-2">
                  {fabricOptions.map((option) => (
                    <div key={option.id}>
                      <RadioGroupItem value={option.id} id={`fabric-${option.id}`} className="peer sr-only" />
                      <Label
                        htmlFor={`fabric-${option.id}`}
                        className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border">
                          <div className="h-full w-full bg-neutral-200"></div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-medium">{option.name}</h4>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                          {option.price > 0 && (
                            <p className="mt-1 text-sm font-medium text-primary">+₨ {option.price.toLocaleString()}</p>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="color" className="mt-6 space-y-6">
              <div className="space-y-4">
                <Label className="text-lg">Select Color</Label>
                <RadioGroup value={color} onValueChange={setColor} className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                  {colorOptions.map((option) => (
                    <div key={option.id}>
                      <RadioGroupItem value={option.id} id={`color-${option.id}`} className="peer sr-only" />
                      <Label
                        htmlFor={`color-${option.id}`}
                        className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-full border-2 border-muted hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        style={{ backgroundColor: option.hex }}
                      >
                        <span className="sr-only">{option.name}</span>
                      </Label>
                      <div className="mt-2 text-center text-xs">{option.name}</div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="embroidery" className="mt-6 space-y-6">
              <div className="space-y-4">
                <Label className="text-lg">Embroidery Style</Label>
                <RadioGroup value={embroidery} onValueChange={setEmbroidery} className="grid gap-4 sm:grid-cols-2">
                  {embroideryOptions.map((option) => (
                    <div key={option.id}>
                      <RadioGroupItem value={option.id} id={`embroidery-${option.id}`} className="peer sr-only" />
                      <Label
                        htmlFor={`embroidery-${option.id}`}
                        className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border">
                          <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-xs">
                            {option.id === "none" ? "None" : option.id.charAt(0).toUpperCase() + option.id.slice(1)}
                          </div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-medium">{option.name}</h4>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                          {option.price > 0 && (
                            <p className="mt-1 text-sm font-medium text-primary">+₨ {option.price.toLocaleString()}</p>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {embroidery !== "none" && (
                <div className="space-y-4 pt-4">
                  <Label className="text-lg">Embroidery Color</Label>
                  <RadioGroup
                    value={embroideryColor}
                    onValueChange={setEmbroideryColor}
                    className="grid grid-cols-5 gap-4"
                  >
                    {embroideryColorOptions.map((option) => (
                      <div key={option.id}>
                        <RadioGroupItem
                          value={option.id}
                          id={`embroidery-color-${option.id}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`embroidery-color-${option.id}`}
                          className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-full border-2 border-muted hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          style={{ backgroundColor: option.hex }}
                        >
                          <span className="sr-only">{option.name}</span>
                        </Label>
                        <div className="mt-2 text-center text-xs">{option.name}</div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </TabsContent>

            <TabsContent value="design" className="mt-6 space-y-6">
              <div className="space-y-4">
                <Label className="text-lg">Sleeve Style</Label>
                <RadioGroup value={sleeveStyle} onValueChange={setSleeveStyle} className="grid gap-4 sm:grid-cols-3">
                  {sleeveOptions.map((option) => (
                    <div key={option.id}>
                      <RadioGroupItem value={option.id} id={`sleeve-${option.id}`} className="peer sr-only" />
                      <Label
                        htmlFor={`sleeve-${option.id}`}
                        className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span>{option.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-4 pt-4">
                <Label className="text-lg">Additional Notes</Label>
                <Textarea
                  placeholder="Add any specific design instructions or preferences here..."
                  className="min-h-[120px] resize-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="measurements" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-lg">Length (inches)</Label>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="w-8 text-center">{length}</span>
                    <Slider
                      value={[length]}
                      min={50}
                      max={62}
                      step={1}
                      onValueChange={(value) => setLength(value[0])}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="grid gap-4 pt-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bust">Bust (inches)</Label>
                    <Input id="bust" type="number" placeholder="36" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waist">Waist (inches)</Label>
                    <Input id="waist" type="number" placeholder="32" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hips">Hips (inches)</Label>
                    <Input id="hips" type="number" placeholder="40" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shoulder">Shoulder Width (inches)</Label>
                    <Input id="shoulder" type="number" placeholder="15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sleeve-length">Sleeve Length (inches)</Label>
                    <Input id="sleeve-length" type="number" placeholder="24" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arm-hole">Arm Hole (inches)</Label>
                    <Input id="arm-hole" type="number" placeholder="18" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-10 flex flex-col gap-4 rounded-xl border bg-muted/20 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Total Price</h3>
              <span className="text-xl font-semibold">₨ {getBasePrice().toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground">Estimated delivery time: 2-3 weeks</p>
            <Button size="lg" className="mt-2 rounded-xl" onClick={handleAddToCart}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="sticky top-20">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-accent/20">
              <Image
                src="/assets/1.jpg"
                alt="Custom Abaya Preview"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <h3 className="text-xl font-medium">Your Custom Design</h3>
                <div className="mt-2 space-y-1 text-sm text-white/80">
                  <p>
                    <span className="font-medium">Fabric:</span> {fabricOptions.find((f) => f.id === fabric)?.name}
                  </p>
                  <p>
                    <span className="font-medium">Color:</span> {colorOptions.find((c) => c.id === color)?.name}
                  </p>
                  <p>
                    <span className="font-medium">Embroidery:</span>{" "}
                    {embroideryOptions.find((e) => e.id === embroidery)?.name}
                    {embroidery !== "none" && (
                      <> in {embroideryColorOptions.find((ec) => ec.id === embroideryColor)?.name}</>
                    )}
                  </p>
                  <p>
                    <span className="font-medium">Sleeve Style:</span>{" "}
                    {sleeveOptions.find((s) => s.id === sleeveStyle)?.name}
                  </p>
                  <p>
                    <span className="font-medium">Length:</span> {length} inches
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-xl border bg-muted/20 p-4">
              <h4 className="font-medium">About Custom Orders</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>All custom orders are final and non-refundable</li>
                <li>We may contact you to confirm measurements</li>
                <li>Please allow 2-3 weeks for production and delivery</li>
                <li>For special requests, contact us directly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
