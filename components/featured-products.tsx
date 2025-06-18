import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FeaturedProducts() {
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
      scarfOrinner: true,
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
      scarfOrinner: true,
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
      scarfOrinner: true,
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
      scarfOrinner: true,
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
