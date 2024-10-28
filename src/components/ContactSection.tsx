'use client'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { useState } from 'react'

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
      const apiUrl = '/api/contact'
      console.log('Sending to:', apiUrl)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
              Tell us about your project
            </h2>
            
            <form 
              onSubmit={handleSubmit} 
              className="mt-6 space-y-6"
            >
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
        </div>
      </FadeIn>
    </Container>
  )
}