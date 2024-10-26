'use client'

import { createContext, useContext } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const FadeInStaggerContext = createContext(false)

const viewport = { once: true, margin: '0px 0px -200px' }

export function FadeIn({
  inert,
  ...props
}: React.ComponentPropsWithoutRef<typeof motion.div> & {
  inert?: boolean
}) {
  let shouldReduceMotion = useReducedMotion()
  let isInStaggerGroup = useContext(FadeInStaggerContext)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            whileInView: 'visible',
            viewport,
          })}
      inert={inert === '' ? true : inert}  // Handle empty string case
      {...props}
    />
  )
}

export function FadeInStagger({
  faster = false,
  inert,
  ...props
}: React.ComponentPropsWithoutRef<typeof motion.div> & { 
  faster?: boolean
  inert?: boolean 
}) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        inert={inert === '' ? true : inert}  // Handle empty string case
        {...props}
      />
    </FadeInStaggerContext.Provider>
  )
}
