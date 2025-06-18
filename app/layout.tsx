import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MobileNav } from "@/components/mobile-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Saha Modest Wear - Premium Abayas",
  description: "Discover our collection of premium hand-crafted abayas with attention to detail and quality fabrics.",
    generator: 'Minhal Rizvi'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'