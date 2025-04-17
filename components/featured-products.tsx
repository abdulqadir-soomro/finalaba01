import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FeaturedProducts() {
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
      image: "/assets/6.jpg",
      collection: "Ramadan Collection'25",
      category: "Formals, Pret",
      featured: true,
    },
    {
      id: 3,
      name: "Nazleen",
      price: "₨ 31,750 – ₨ 34,250",
      image: "/assets/9.jpg",
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
  ]

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">BEST SELLERS</h2>
          <p className="mt-2 text-muted-foreground">Our most popular designs, loved by customers worldwide</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} showOptionsButton={true} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/collection">
            <Button variant="outline" className="rounded-xl">
              View All Collections
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
