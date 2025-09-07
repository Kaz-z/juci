import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  title?: string
  kicker?: string
  children: ReactNode
  className?: string
  container?: boolean
  padding?: boolean
}

export default function Section({ 
  title, 
  kicker, 
  children, 
  className,
  container = true,
  padding = true 
}: SectionProps) {
  return (
    <section className={cn(
      padding && 'py-8 sm:py-12 md:py-16',
      className
    )}>
      <div className={cn(
        container && 'container-max section-padding'
      )}>
        {(title || kicker) && (
          <div className="text-center mb-8 sm:mb-10">
            {kicker && (
              <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">
                {kicker}
              </p>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-fg">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
