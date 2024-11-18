'use client'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import ShineBorder from "@/components/ui/shine-border"
import { Meteors } from "@/components/ui/meteors"
import { useState } from 'react'
import { motion } from "framer-motion"
import Image from "next/image"
import { useId } from "react"
import { cn } from "@/lib/utils"
import { AnimatedList } from "@/components/ui/animated-list"

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    message: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    message: '',
  })

  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  function validateMobileNumber(number: string) {
    const re = /^(\+?\d{1,4}?[\s-]?)?(($$\d{1,4}$$)|\d{1,4})[\s-]?\d{3,4}[\s-]?\d{3,4}$/
    return re.test(number)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()
    console.log('Form submission prevented')

    // Validation checks
    const newErrors = {
      name: '',
      email: '',
      mobileNumber: '',
      message: '',
    }
    let hasError = false

    if (!formData.name) {
      newErrors.name = 'Name is required'
      hasError = true
    }
    if (!formData.email) {
      newErrors.email = 'Email is required'
      hasError = true
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address'
      hasError = true
    }
    if (formData.mobileNumber && !validateMobileNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number'
      hasError = true
    }
    if (!formData.message) {
      newErrors.message = 'Message is required'
      hasError = true
    }

    if (hasError) {
      console.log('Validation failed:', newErrors)
      setErrors(newErrors)
      return
    }

    setStatus('sending')
    console.log('Attempting to send data:', formData)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(errorData.detail || 'Failed to send message')
      }

      const data = await response.json()
      console.log('Success response:', data)

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        mobileNumber: '',
        message: '',
      })
    } catch (error) {
      console.error('Submission error:', error)
      setStatus('error')
    }
  }

  const Pin = ({ className, location }: { className?: string; location: string }) => {
    return (
      <motion.div
        style={{
          transform: "translateZ(1px)",
        }}
        className={cn(
          "pointer-events-none absolute z-[60] flex h-40 w-96 items-center justify-center opacity-100 transition duration-500",
          className,
        )}
      >
        <div className="h-full w-full">
          <div className="absolute inset-x-0 top-0 z-20 mx-auto inline-block w-fit rounded-lg bg-white/90 px-2 py-1 text-xs font-semibold text-neutral-900 shadow-lg">
            {location}
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 transition-opacity duration-500"></span>
          </div>

          <div
            style={{
              perspective: "800px",
              transform: "rotateX(70deg) translateZ(0px)",
            }}
            className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
          >
            {[0, 2, 4].map((delay) => (
              <motion.div
                key={delay}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{
                  opacity: [0, 1, 0.5, 0],
                  scale: 1,
                  z: 0,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: delay,
                }}
                className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-sky-500/30 shadow-[0_8px_16px_rgb(0_0_0/0.4)] dark:bg-sky-400/50"
              />
            ))}
          </div>

          <motion.div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-blue-400 blur-[2px]" />
          <motion.div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-blue-400" />
          <motion.div className="absolute bottom-1/2 right-1/2 z-40 h-[4px] w-[4px] translate-x-[1.5px] translate-y-[14px] rounded-full bg-blue-400 blur-[3px]" />
          <motion.div className="absolute bottom-1/2 right-1/2 z-40 h-[2px] w-[2px] translate-x-[0.5px] translate-y-[14px] rounded-full bg-blue-300" />
        </div>
      </motion.div>
    );
  };

  return (
    <FadeIn>
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <ShineBorder
          className="relative overflow-hidden bg-neutral-950 px-6 py-20 sm:py-32 md:px-12 w-full"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          borderRadius={32}
          borderWidth={8}
        >
          <div className="mx-auto max-w-4xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left column with map */}
              <div className="relative flex flex-col items-center overflow-hidden lg:items-start">
                <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
                  Enquire About Your Development
                </h2>
                <AnimatedList 
                  className="mt-10 w-full" 
                  delay={1500} 
                  maxItems={4}
                >
                  <div className="flex items-center space-x-4 rounded-lg border border-gray-700 bg-neutral-800/50 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                      <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Submit Project Details</h3>
                      <p className="text-sm text-neutral-400">Tell us about your vision and requirements</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 rounded-lg border border-gray-700 bg-neutral-800/50 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-500/20">
                      <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Initial Consultation</h3>
                      <p className="text-sm text-neutral-400">Schedule a meeting to discuss your project</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 rounded-lg border border-gray-700 bg-neutral-800/50 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                      <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Project Planning</h3>
                      <p className="text-sm text-neutral-400">Define scope, timeline, and deliverables</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 rounded-lg border border-gray-700 bg-neutral-800/50 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                      <svg className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Development Phase</h3>
                      <p className="text-sm text-neutral-400">Agile development with regular updates</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 rounded-lg border border-gray-700 bg-neutral-800/50 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/20">
                      <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Testing & QA</h3>
                      <p className="text-sm text-neutral-400">Comprehensive testing and quality assurance</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 rounded-lg border border-gray-700 bg-neutral-800/50 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-500/20">
                      <svg className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Deployment</h3>
                      <p className="text-sm text-neutral-400">Launch your application to production</p>
                    </div>
                  </div>
                </AnimatedList>
              </div>

              {/* Right column with form */}
              <div>
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-700 bg-neutral-800 px-3 py-2 text-white shadow-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-700 bg-neutral-800 px-3 py-2 text-white shadow-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-white">
                      Mobile Number (optional)
                    </label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-700 bg-neutral-800 px-3 py-2 text-white shadow-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                    />
                    {errors.mobileNumber && <p className="mt-1 text-sm text-red-500">{errors.mobileNumber}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-700 bg-neutral-800 px-3 py-2 text-white shadow-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>

                  <div>
                    <Button 
                      type="submit" 
                      invert 
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </Button>
                    {status === 'success' && (
                      <p className="mt-2 text-sm text-green-400">Message sent successfully!</p>
                    )}
                    {status === 'error' && (
                      <p className="mt-2 text-sm text-red-500">Failed to send message. Please try again.</p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-10">
              <h3 className="font-display text-base font-semibold text-white">
                Our offices
              </h3>
              <Offices
                invert
                className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
              />
            </div>
          </div>
          <Meteors number={20} />
        </ShineBorder>
      </Container>
    </FadeIn>
  )
}