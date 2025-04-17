"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CustomizationSection() {
  const [activeTab, setActiveTab] = useState("fabric")
  const [selectedFabric, setSelectedFabric] = useState("premium-crepe")
  const [selectedColor, setSelectedColor] = useState("black")
  const [selectedEmbroidery, setSelectedEmbroidery] = useState("none")

  return (
    <section className="bg-muted/50 py-16">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">CUSTOMIZE YOUR ABAYA</h2>
          <p className="mt-2 text-muted-foreground">
            Create a unique piece that perfectly matches your style and preferences
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="fabric">Fabric</TabsTrigger>
                {/* <TabsTrigger value="color">Color</TabsTrigger> */}
                {/* <TabsTrigger value="embroidery">Embroidery</TabsTrigger> */}
              </TabsList>
              <TabsContent value="fabric" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Select Fabric</h3>
                  <RadioGroup
                    value={selectedFabric}
                    onValueChange={setSelectedFabric}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <div>
                      <RadioGroupItem value="premium-crepe" id="premium-crepe" className="peer sr-only" />
                      <Label
                        htmlFor="premium-crepe"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border">
                          <div className="h-full w-full bg-neutral-200"></div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-medium">Premium Crepe</h4>
                          <p className="text-sm text-muted-foreground">Soft, elegant drape with matte finish</p>
                        </div>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="nida-silk" id="nida-silk" className="peer sr-only" />
                      <Label
                        htmlFor="nida-silk"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border">
                          <div className="h-full w-full bg-neutral-300"></div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-medium">Nida Silk</h4>
                          <p className="text-sm text-muted-foreground">Lightweight with subtle sheen</p>
                        </div>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="japanese-crepe" id="japanese-crepe" className="peer sr-only" />
                      <Label
                        htmlFor="japanese-crepe"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border">
                          <div className="h-full w-full bg-neutral-100"></div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-medium">Japanese Crepe</h4>
                          <p className="text-sm text-muted-foreground">Premium texture with excellent drape</p>
                        </div>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="linen" id="linen" className="peer sr-only" />
                      <Label
                        htmlFor="linen"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border">
                          <div className="h-full w-full bg-amber-50"></div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-medium">Premium Linen</h4>
                          <p className="text-sm text-muted-foreground">Breathable natural fiber</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>
              <TabsContent value="color" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Select Color</h3>
                  <RadioGroup
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-6"
                  >
                    <div>
                      <RadioGroupItem value="black" id="black" className="peer sr-only" />
                      <Label
                        htmlFor="black"
                        className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-full border-2 border-muted bg-black hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="sr-only">Black</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="navy" id="navy" className="peer sr-only" />
                      <Label
                        htmlFor="navy"
                        className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-full border-2 border-muted bg-blue-950 hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="sr-only">Navy</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="burgundy" id="burgundy" className="peer sr-only" />
                      <Label
                        htmlFor="burgundy"
                        className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-full border-2 border-muted bg-red-900 hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="sr-only">Burgundy</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="olive" id="olive" className="peer sr-only" />
                      <Label
                        htmlFor="olive"
                        className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-full border-2 border-muted bg-olive-600 hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="sr-only">Olive</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="beige" id="beige" className="peer sr-only" />
                      <Label
                        htmlFor="beige"
                        className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-full border-2 border-muted bg-amber-100 hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="sr-only">Beige</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="gray" id="gray" className="peer sr-only" />
                      <Label
                        htmlFor="gray"
                        className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-full border-2 border-muted bg-gray-400 hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="sr-only">Gray</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>
              <TabsContent value="embroidery" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Select Embroidery Style</h3>
                  <RadioGroup
                    value={selectedEmbroidery}
                    onValueChange={setSelectedEmbroidery}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <div>
                      <RadioGroupItem value="none" id="none" className="peer sr-only" />
                      <Label
                        htmlFor="none"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border">
                          <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-xs">
                            None
                          </div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-medium">No Embroidery</h4>
                          <p className="text-sm text-muted-foreground">Clean, minimal design</p>
                        </div>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="sleeves" id="sleeves" className="peer sr-only" />
                      <Label
                        htmlFor="sleeves"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border">
                          <div className="h-full w-full bg-neutral-100 text-center text-xs">Sleeves</div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-medium">Sleeve Embroidery</h4>
                          <p className="text-sm text-muted-foreground">Elegant patterns on sleeves</p>
                        </div>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="front" id="front" className="peer sr-only" />
                      <Label
                        htmlFor="front"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border">
                          <div className="h-full w-full bg-neutral-100 text-center text-xs">Front</div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-medium">Front Embroidery</h4>
                          <p className="text-sm text-muted-foreground">Detailed work on the front panel</p>
                        </div>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="full" id="full" className="peer sr-only" />
                      <Label
                        htmlFor="full"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border">
                          <div className="h-full w-full bg-neutral-100 text-center text-xs">Full</div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-medium">Full Embroidery</h4>
                          <p className="text-sm text-muted-foreground">Luxurious all-over pattern</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-8 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Your Custom Abaya</h3>
                <p className="text-sm text-muted-foreground">Starting from ₨ 35,000</p>
              </div>
              <Link href="/customize">
                <Button size="lg" className="rounded-xl">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-xl bg-accent/20">
              <Image
                src="/assets/1.jpg"
                alt="Custom Abaya Preview"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <h3 className="text-xl font-medium">Your Custom Design</h3>
                <p className="mt-1 text-sm text-white/80">
                  {selectedFabric === "premium-crepe" && "Premium Crepe"}
                  {selectedFabric === "nida-silk" && "Nida Silk"}
                  {selectedFabric === "japanese-crepe" && "Japanese Crepe"}
                  {selectedFabric === "linen" && "Premium Linen"} ·{" "}
                  {/* {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} ·{" "}
                  {selectedEmbroidery === "none" && "No Embroidery"}
                  {selectedEmbroidery === "sleeves" && "Sleeve Embroidery"}
                  {selectedEmbroidery === "front" && "Front Embroidery"}
                  {selectedEmbroidery === "full" && "Full Embroidery"} */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
