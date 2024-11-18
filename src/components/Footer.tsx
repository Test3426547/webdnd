'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'

const navigation = [
  {
    title: 'Work',
    links: [
      { title: 'FamilyFund', href: '/work/family-fund' },
      { title: 'Unseal', href: '/work/unseal' },
      { title: 'Phobia', href: '/work/phobia' },
      {
        title: (
          <>
            See all <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: '/work',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Process', href: '/process' },
      { title: 'Blog', href: '/blog' },
      { title: 'Contact us', href: '/contact' },
    ],
  },
  {
    title: 'Connect',
    links: socialMediaProfiles,
  },
]

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')

    // Validate email
    if (!email) {
      setErrorMessage('Email is required')
      setStatus('error')
      return
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address')
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed')
      }

      setStatus('success')
      setEmail('')
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setErrorMessage('Subscription failed. Please try again.')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm">
      <TypewriterEffectSmooth
        words={[{
          text: "Sign up for our newsletter",
          className: "font-display text-sm font-semibold tracking-wider text-neutral-950"
        }]}
        className="!my-0"
      />
      <TypewriterEffectSmooth
        words={[{
          text: "Subscribe to get the latest design news, articles, resources and inspiration.",
          className: "mt-4 text-sm text-neutral-700 whitespace-normal"
        }]}
        className="block w-full"
      />
      <div className="relative mt-6">
        <input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            // Reset error/success states when user starts typing
            if (status !== 'idle') {
              setStatus('idle')
              setErrorMessage('')
            }
          }}
          className={`block w-full rounded-2xl border ${
            status === 'error' ? 'border-red-500' : 'border-neutral-300'
          } bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5`}
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            disabled={status === 'loading'}
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800 disabled:opacity-50"
          >
            {status === 'loading' ? (
              <span className="animate-spin">&#8987;</span>
            ) : (
              <ArrowIcon className="w-4" />
            )}
          </button>
        </div>
      </div>
      {status === 'success' && (
        <p className="mt-2 text-sm text-green-600">
          Thanks for subscribing! Check your email for confirmation.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </form>
  )
}

export function Footer() {
  return (
    <div className="border-t border-neutral-100 dark:border-white/[0.1] px-8 py-20 bg-white dark:bg-neutral-950 w-full relative overflow-hidden">
      <Container>
        <FadeIn>
          <div className="max-w-7xl mx-auto text-sm text-neutral-500">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
              {/* Logo and Newsletter Section */}
              <div className="flex flex-col space-y-8 lg:max-w-[280px]">
                <Logo className="h-8" fillOnHover />
                <NewsletterForm />
                <TypewriterEffectSmooth 
                  words={[{ 
                    text: `© Spectrum Web Co. ${new Date().getFullYear()}`,
                    className: "text-sm text-neutral-700"
                  }]}
                />
              </div>

              {/* Navigation Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24 items-start lg:flex-1 lg:pl-8">
                {navigation.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="flex justify-start space-y-6 flex-col min-w-[160px]">
                    <TypewriterEffectSmooth
                      words={[{
                        text: section.title,
                        className: "font-display text-sm font-semibold tracking-wider text-neutral-950 dark:text-white"
                      }]}
                    />
                    <ul className="space-y-5 text-sm text-neutral-700">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex} className="list-none">
                          <Link href={link.href}>
                            <TypewriterEffectSmooth
                              words={[{
                                text: typeof link.title === 'string' ? link.title : 'See all →',
                                className: "transition hover:text-neutral-950 dark:hover:text-white"
                              }]}
                              className="!my-0"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Large Spectrum Text */}
          <div className="w-full flex justify-center items-center">
            <div className="relative w-full flex justify-center items-center">
              <TypewriterEffectSmooth
                words={[{
                  text: "Spectrum.",
                  className: "text-center mt-20 text-5xl md:text-9xl lg:text-[12rem] xl:text-[13rem] font-display font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800"
                }]}
                className="flex justify-center items-center text-center"
              />
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}