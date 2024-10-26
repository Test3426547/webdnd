'use client'

import { FadeIn } from '@/components/FadeIn'
import FlipText from "@/components/ui/flip-text"
import BlurFade from "@/components/ui/blur-fade"
import SparklesText from "@/components/ui/sparkles-text"

export function HeroSection() {
  return (
    <FadeIn className="max-w-3xl">
      <h1 className="font-display text-4xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-5xl md:text-6xl lg:text-7xl text-center">
        <FlipText className="block tracking-tight leading-tight" word="High-end Boutique" />
        <FlipText className="block tracking-tight leading-tight" word={
          <>
            Web <SparklesText 
              text="Design" 
              className="inline tracking-tight leading-tight"
            />
            {" &"}
          </>
        } />
        <FlipText className="block tracking-tight leading-tight" word={
          <>
            <SparklesText 
              text="Development" 
              className="inline tracking-tight leading-tight"
            />
            {" Agency"}
          </>
        } />
        <FlipText className="block tracking-tight leading-tight" word={
          <>
            in <SparklesText 
              text="Sydney," 
              className="inline tracking-tight leading-tight"
            />
            {" Australia"}
          </>
        } />
      </h1>
      <style jsx global>{`
        .flip-text {
          letter-spacing: inherit;
          line-height: inherit;
        }
      `}</style>
      <BlurFade delay={0.25} inView>
        <p className="mt-6 text-lg text-neutral-600 sm:text-xl">
          At Spectrum Web Co, we are dedicated to providing creative and innovative, purpose-driven web design and development services. Based in Sydney, Australia, we specialize in crafting bespoke digital solutions for small to medium businesses. Our mission is to help you establish a strong online presence, engage your audience effectively, and achieve your business objectives through high-quality web experiences.
        </p>
      </BlurFade>
    </FadeIn>
  )
}