"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"

export default function CollectionPage() {
  // const [priceRange, setPriceRange] = useState([15000, 35000])
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock collection data
  const collections = [
    { id: "all", name: "All Collections", count: 24 },
    // { id: "ramadan25", name: "Ramadan Collection'25", count: 12 },
    { id: "premium", name: "Premium Collection", count: 8 },
    { id: "casual", name: "Casual Collection", count: 6 },
    // { id: "formal", name: "Formal Collection", count: 10 },
  ]

  const categories = [
    { id: "all", name: "All Categories", count: 24 },
    { id: "abayas", name: "Abayas", count: 16 },
    // { id: "jilbabs", name: "Jilbabs", count: 5 },
    // { id: "prayer-sets", name: "Prayer Sets", count: 3 },
  ]

  // const colors = [
  //   { id: "black", name: "Black", hex: "#000000" },
  //   { id: "navy", name: "Navy", hex: "#0A1747" },
  //   { id: "burgundy", name: "Burgundy", hex: "#800020" },
  //   { id: "olive", name: "Olive", hex: "#556B2F" },
  //   { id: "beige", name: "Beige", hex: "#F5F5DC" },
  //   { id: "gray", name: "Gray", hex: "#808080" },
  // ]

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Nadine",
      price: "₨ 22,250 – ₨ 24,750",
      image: "/assets/1.jpg",
      collection: "Ramadan Collection'25",
      category: "Formals",
      featured: true,
    },
    {
      id: 2,
      name: "Layla",
      price: "₨ 24,250 – ₨ 29,750",
      image: "/assets/7.jpg",
      collection: "Ramadan Collection'25",
      category: "Formals, Pret",
      featured: true,
    },
    {
      id: 3,
      name: "Nazleen",
      price: "₨ 31,750 – ₨ 34,250",
      image: "/assets/10.jpg",
      collection: "Ramadan Collection'25",
      category: "Formals",
      featured: true,
    },
    {
      id: 4,
      name: "Elanoor - B",
      price: "₨ 14,750 – ₨ 16,750",
      image: "/assets/13.jpg",
      collection: "Ramadan Collection'25",
      category: "Casuals",
      featured: true,
    },
    {
      id: 5,
      name: "Amara",
      price: "₨ 18,500 – ₨ 21,000",
      image: "/assets/17.jpg",
      collection: "Premium Collection",
      category: "Abayas",
      featured: false,
    },
    {
      id: 6,
      name: "Zahra",
      price: "₨ 26,750 – ₨ 29,250",
      image: "/assets/21.jpg",
      collection: "Premium Collection",
      category: "Abayas",
      featured: false,
    },
    {
      id: 7,
      name: "Samira",
      price: "₨ 19,250 – ₨ 22,750",
      image: "/assets/19.jpg",
      collection: "Casual Collection",
      category: "Jilbabs",
      featured: false,
    },
    {
      id: 8,
      name: "Hana",
      price: "₨ 17,500 – ₨ 19,750",
      image: "/assets/22.jpg",
      collection: "Casual Collection",
      category: "Abayas",
      featured: false,
    },
    {
      id: 9,
      name: "Leila",
      price: "₨ 28,250 – ₨ 32,750",
      image: "/assets/23.jpg",
      collection: "Formal Collection",
      category: "Abayas",
      featured: false,
    },
    {
      id: 10,
      name: "Noor",
      price: "₨ 23,750 – ₨ 26,250",
      image: "/assets/24.jpg",
      collection: "Formal Collection",
      category: "Abayas",
      featured: false,
    },
    {
      id: 11,
      name: "Yasmin",
      price: "₨ 20,250 – ₨ 23,750",
      image: "/assets/25.jpg",
      collection: "Ramadan Collection'25",
      category: "Prayer Sets",
      featured: false,
    },
    {
      id: 12,
      name: "Fatima",
      price: "₨ 25,750 – ₨ 28,250",
      image: "/assets/26.jpg",
      collection: "Premium Collection",
      category: "Abayas",
      featured: false,
    },
  ]
  return (
    <div className="container px-4 py-10 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Our Collection</h1>
        <p className="mt-2 text-muted-foreground">
          Discover our exquisite range of premium abayas, jilbabs, and prayer sets
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 border-b pb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex" onClick={() => setFilterOpen(!filterOpen)}>
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setFilterOpen(!filterOpen)}>
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[280px_1fr] md:gap-12">
        {/* Filters Sidebar */}
        <div
          className={`${
            filterOpen ? "block" : "hidden"
          } fixed inset-0 z-40 bg-background p-6 md:static md:block md:p-0`}
        >
          <div className="flex items-center justify-between border-b pb-4 md:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setFilterOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-6 space-y-6">
            <Accordion type="multiple" defaultValue={["collections", "categories", "price", "colors"]}>
              <AccordionItem value="collections">
                <AccordionTrigger>Collections</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {collections.map((collection) => (
                      <div key={collection.id} className="flex items-center space-x-2">
                        <Checkbox id={`collection-${collection.id}`} />
                        <Label
                          htmlFor={`collection-${collection.id}`}
                          className="flex w-full cursor-pointer justify-between text-sm"
                        >
                          <span>{collection.name}</span>
                          <span className="text-muted-foreground">({collection.count})</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="categories">
                <AccordionTrigger>Categories</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox id={`category-${category.id}`} />
                        <Label
                          htmlFor={`category-${category.id}`}
                          className="flex w-full cursor-pointer justify-between text-sm"
                        >
                          <span>{category.name}</span>
                          <span className="text-muted-foreground">({category.count})</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* <AccordionItem value="price">
                <AccordionTrigger>Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <Slider value={priceRange} min={10000} max={40000} step={1000} onValueChange={setPriceRange} />
                    <div className="flex items-center justify-between">
                      <span>₨ {priceRange[0].toLocaleString()}</span>
                      <span>₨ {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem> */}

              {/* <AccordionItem value="colors">
                <AccordionTrigger>Colors</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-3 gap-2">
                    {colors.map((color) => (
                      <div key={color.id} className="flex flex-col items-center gap-1">
                        <div className="relative">
                          <div className="h-8 w-8 rounded-full border" style={{ backgroundColor: color.hex }}></div>
                          <Checkbox
                            id={`color-${color.id}`}
                            className="absolute right-0 top-0 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full border-none"
                          />
                        </div>
                        <Label htmlFor={`color-${color.id}`} className="text-xs">
                          {color.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem> */}
            </Accordion>

            <div className="flex flex-col gap-2 pt-4 md:hidden">
              <Button>Apply Filters</Button>
              <Button variant="outline">Reset Filters</Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">Showing {products.length} products</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} showOptionsButton={true} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            {/* <Button variant="outline" className="rounded-xl">
              Load More
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
