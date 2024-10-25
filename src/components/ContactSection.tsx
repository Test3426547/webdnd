'use client'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { useState } from 'react'

export function ContactSection() {
  const [status, setStatus] = useState('')
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
    const re = /^(\+?\d{1,4}?[\s-]?)?((\(\d{1,4}\))|\d{1,4})[\s-]?\d{3,4}[\s-]?\d{3,4}$/
    return re.test(number)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Client-side validation
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
      setErrors(newErrors)
      return
    }

    setErrors({ name: '', email: '', mobileNumber: '', message: '' })

    // ... existing submit logic ...
  }

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
              Tell us about your project
            </h2>
            <div className="mt-6 flex">
              <Button href="/contact" invert>
                Say G&apos;day
              </Button>
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
        </div>
      </FadeIn>
    </Container>
  )
}
