import { Check, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  price: string
  images?: string[]
  image?: string
}

interface ProductOptions {
  length?: string
  inner?: string
  scarf?: string
  size?: string
}

interface AddToCartAlertProps {
  product: Product
  quantity: number
  options?: ProductOptions
}

export function AddToCartAlert({ product, quantity, options }: AddToCartAlertProps) {
  const productImage = product.images ? product.images[0] : product.image

  return (
    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="w-full rounded-lg border bg-background p-6 shadow-lg sm:max-w-md">
        <div className="flex items-center gap-2 text-green-600">
          <Check className="h-5 w-5" />
          <span className="text-sm font-medium">Added to cart successfully!</span>
        </div>

        <div className="mt-4 flex items-start space-x-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
            <Image src={productImage || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">{product.name}</h4>
            <p className="mt-1 text-sm text-muted-foreground">Quantity: {quantity}</p>
            {options && (
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                {options.length && <p>Length: {options.length}</p>}
                {options.inner && <p>Inner: {options.inner}</p>}
                {options.scarf && <p>Scarf: {options.scarf}</p>}
                {options.size && <p>Size: {options.size}</p>}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="outline" className="flex-1 rounded-xl">
            <Link href="/collection">Continue Shopping</Link>
          </Button>
          <Button asChild className="flex-1 rounded-xl">
            <Link href="/cart">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View Cart
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
