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
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Mock collection data
  const collections = [
    { id: "all", name: "All Collections", count: 24 },
    { id: "ramadan25", name: "Ramadan Collection'25", count: 12 },
    { id: "premium", name: "Premium Collection", count: 8 },
    // { id: "casual", name: "Casual Collection", count: 6 },
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
      name: "Pom Pom",
      price: "₨ 15,000",
      description: `Includes Matching Scarf 
 Material: Premium Nida

A statement piece crafted from luxurious premium nida fabric, this black abaya features dramatic bell sleeves adorned with playful black and turquoise textured pom-pom detailing. The front is enhanced with structured pleated trimming, adding a refined touch to its flowy silhouette. Paired with a matching scarf, this abaya blends sophistication with a hint of fun — perfect for elevating your modest wear collection.`,
      image: "/assets/13.jpg",
      collection: "Ramadan Collection'25",
      category: "Formals",
      featured: true,
      scarfOrinner:true,
    },
    {
      id: 2,
      name: "Zarina",
      price: "₨ 13,500",
      description: `Includes Matching Scarf 
 Available in 2 Colors 
Material: Premium Fabric

Gracefully designed with a blend of deep plum and black panels, the Zarina Abaya features delicate floral embroidery on the front, framed by soft beige piping for a striking contrast. The flared sleeves and sleek lines give it a modern, flowy silhouette that flatters all body types. Comes with a matching scarf for a complete, polished look. Ideal for both casual elegance and formal occasions.`,
      image: "/assets/2.jpg",
      collection: "Ramadan Collection'25",
      category: "Formals",
      featured: true,
      scarfOrinner:true,
    },
    {
      id: 3,
      name: "Layla",
      price: "₨ 12,000",
      description: `Elevate your wardrobe with this elegant outerwear piece, crafted from luxurious Laser Nida fabric for a smooth and graceful drape. This design features intricate embroidered detailing and comes with a beautifully embroidered scarf for a complete and refined look. Perfect for both formal and casual settings.
Details:
	•	Material: Premium Laser Nida
	•	Includes: Embroidered scarf
	•	Optional: Can be customized with a plain scarf upon request
`,
      image: "/assets/27.jpeg",
      collection: "Ramadan Collection'25",
      category: "Formals, Pret",
      featured: true,
      scarfOrinner:true,
    },
    {
      id: 4,
      name: "Midnight Crimson ",
      price: "₨ 10,000",
      description: `Elevate your style with our Midnight Crimson Abaya, featuring a sleek button-down front and striking red cuffs embellished for a touch of sparkle. Tailored from premium Nida, it offers both comfort and a graceful drape. A matching scarf is included to complete your sophisticated look.`,
      image: "/assets/28.jpeg",
      collection: "Ramadan Collection'25",
      category: "Formals, Pret",
      featured: true,
      scarfOrinner:true,
    },
    {
      id: 5,
      name: "Luna Vogue",
      price: "₨ 9,000",
      description:`Step out in style with our Luna Vogue Abaya a chic, coat-style design that blends modern structure with timeless elegance. Crafted from premium Nida, its clean lines and subtle detailing offer a refined silhouette, while the matching scarf adds a polished finish to any look.`,
      image: "/assets/29.jpeg",
      collection: "Ramadan Collection'25",
      category: "Casuals",
      featured: true,
      scarfOrinner:true,
    },
    {
      id: 6,
      name: "Mocha Bloom",
      price: "₨ 14,000",
      description:`Indulge in understated elegance with our Mocha Bloom Abaya, crafted from premium Nida in a rich chocolate hue. Delicate floral embroidery graces the cuffs and matching scarf, adding a subtle, feminine touch. Perfect for everyday wear or special occasions.`,
      image: "/assets/30.jpeg",
      collection: "Premium Collection",
      category: "Abayas",
      featured: false,
      scarfOrinner:true,
    },
    {
      id: 7,
      name: "Summer Linen",
      price: "₨ 9,000",
      description:`Stay cool and stylish with our Summer Linen Abaya, crafted from breathable linen in a versatile neutral hue. Its relaxed silhouette and subtle sleeve detailing make it perfect for warmer days, while the matching scarf completes your effortlessly chic look.`,
      image: "/assets/32.jpeg",
      collection: "Premium Collection",
      category: "Abayas",
      featured: false,
      scarfOrinner:true,
    },
    {
      id: 8,
      name: "Zahra Bloom",
      price: "₨ 12,500",
      description:`Indulge in understated elegance with our Zahra Bloom Abaya, tailored from premium Nida in a lush, deep hue. Delicate pleated accents along the neckline and sleeves exude subtle sophistication, while the included scarf completes the look.`,
      image: "/assets/Zahra Bloom.jpeg",
      collection: "Premium Collection",
      category: "Abayas",
      featured: false,
      scarfOrinner:true,
    },
    {
      id: 9,
      name: "Haya Luxe Abaya",
      price: "₨ 12,000",
      description:`Elegant, flowy abaya with delicate embroidery on the sleeves. Comes with a matching scarf for a complete modest look.
      Includes: Scarf
      Inner: Can be purchased separately`,
      image: "/assets/33.jpeg",
      collection: "Premium Collection",
      category: "Abayas",
      featured: false,
      scarfOrinner:true,
    },
    {
      id: 10,
      name: "Mocha Belle Abaya",
      price: "₨ 12,500",
      description:`Elevate your everyday wardrobe with our chic double-breasted abaya in a warm, chocolate-brown hue. Crafted from a high-quality, breathable fabric, this design features wide lapels and metallic button accents for a contemporary twist on a classic silhouette. Its relaxed, flowing cut ensures all-day comfort and modest coverage, making it perfect for both casual outings and formal gatherings. Add neutral-toned accessories to complete the look and enjoy a versatile, timeless addition to your modest fashion collection.`,
      image: "/assets/31.jpeg",
      collection: "Premium Collection",
      category: "Abayas",
      featured: false,
      scarfOrinner:true,
    },
    
  ]

  // Add function to handle collection filter changes
  const handleCollectionChange = (collectionId: string) => {
    setSelectedCollections(prev => {
      if (collectionId === "all") {
        return prev.includes("all") ? [] : ["all"]
      }
      const newSelection = prev.filter(id => id !== "all")
      if (prev.includes(collectionId)) {
        return newSelection.filter(id => id !== collectionId)
      }
      return [...newSelection, collectionId]
    })
  }

  // Add function to handle category filter changes
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (categoryId === "all") {
        return prev.includes("all") ? [] : ["all"]
      }
      const newSelection = prev.filter(id => id !== "all")
      if (prev.includes(categoryId)) {
        return newSelection.filter(id => id !== categoryId)
      }
      return [...newSelection, categoryId]
    })
  }

  // Modify the getSortedProducts function to include filtering
  const getFilteredAndSortedProducts = () => {
    let filteredProducts = [...products];

    // Apply collection filter
    if (selectedCollections.length > 0 && !selectedCollections.includes("all")) {
      filteredProducts = filteredProducts.filter(product => {
        // Convert both the product collection and selected collection to lowercase for comparison
        const productCollection = product.collection.toLowerCase().replace(/[']/g, ""); // Remove any special characters
        return selectedCollections.some(selected => {
          const selectedCollection = selected.toLowerCase();
          // Handle special case for ramadan25
          if (selectedCollection === "ramadan25") {
            return productCollection.includes("ramadan collection25");
          }
          return productCollection.includes(selectedCollection);
        });
      });
    }

    // Apply category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes("all")) {
      filteredProducts = filteredProducts.filter(product => 
        selectedCategories.includes(product.category.toLowerCase())
      );
    }

    // Apply search filter
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      case "price-low":
        filteredProducts.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceA - priceB;
        });
        break;
      case "price-high":
        filteredProducts.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceB - priceA;
        });
        break;
      case "name-asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filteredProducts;
  };

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
          className={`${filterOpen ? "block" : "hidden"
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
                        <Checkbox 
                          id={`collection-${collection.id}`}
                          checked={selectedCollections.includes(collection.id)}
                          onCheckedChange={() => handleCollectionChange(collection.id)}
                        />
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
                        <Checkbox 
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryChange(category.id)}
                        />
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
            {getFilteredAndSortedProducts().map((product) => (
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
