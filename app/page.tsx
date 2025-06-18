import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CustomizationSection } from "@/components/customization-section"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <CustomizationSection />
      </main>
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">About Us</h3>
              <p className="text-sm text-muted-foreground">
                We create premium hand-crafted abayas with attention to detail and quality fabrics.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Customer Service</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/contact" className="hover:text-foreground">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/cart" className="hover:text-foreground">
                    Shopping Cart
                  </a>
                </li>
                <li>
                  <a href="/returns" className="hover:text-foreground">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-foreground">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Information</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-foreground">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/shipping" className="hover:text-foreground">
                    Shipping Information
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Subscribe to receive updates, access to exclusive deals, and more.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-10 border-t pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              For custom orders, DM us on Instagram @zualabayas or Whatsapp on 0332 0272422.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              © {new Date().getFullYear()} Saha Modest Wear. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
