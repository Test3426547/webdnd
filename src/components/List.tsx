import clsx from 'clsx'

import { Border } from '@/components/Border'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GradualSpacingParagraph } from '@/components/ui/gradual-spacing'

export function List({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <FadeInStagger>
      <ul role="list" className={clsx('text-base text-neutral-600', className)}>
        {children}
      </ul>
    </FadeInStagger>
  )
}

export function ListItem({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <li className="group mt-10 first:mt-0">
      <FadeIn>
        <Border className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
          {title && (
            <strong className="font-semibold text-neutral-950">{`${title}. `}</strong>
          )}
          {typeof children === 'string' ? (
            <GradualSpacingParagraph
              text={children}
              duration={0.3}
              delayMultiple={0.015}
              className="leading-7"
            />
          ) : (
            children
          )}
        </Border>
      </FadeIn>
    </li>
  )
}
