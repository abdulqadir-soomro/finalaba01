"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      image: "/assets/hero.png",
      title: "Elegant Abayas",
      subtitle: "Discover Our New Collection",
      description: "Handcrafted with premium fabrics and attention to every detail",
      cta: "Shop Now",
      link: "/collection",
    },
    {
      image: "/assets/hero2.png",
      title: "Custom Designs",
      subtitle: "Create Your Unique Style",
      description: "Personalize your abaya with our customization options",
      cta: "Customize",
      link: "/customize",
    },
    {
      image: "/assets/hero3.png",
      title: "Ramadan Collection",
      subtitle: "Limited Edition Pieces",
      description: "Specially designed for the holy month",
      cta: "Explore",
      link: "/collection",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative h-full w-full">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container px-4 md:px-6">
                <div className="max-w-lg space-y-4 text-center sm:text-left">
                  <h2 className="text-sm font-medium uppercase tracking-wider text-white/80">{slide.subtitle}</h2>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="text-white/80">{slide.description}</p>
                  <div className="flex justify-center sm:justify-start">
                    <Link href={slide.link}>
                      <Button size="lg" className="rounded-full">
                        {slide.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
