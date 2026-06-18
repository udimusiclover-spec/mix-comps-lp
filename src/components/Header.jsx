import { useCallback, useEffect, useRef, useState } from 'react'
import { useLabels } from '../context/LabelsContext'
import SafariAudioIcon from './SafariAudioIcon'

const subtypeIds = ['rights', 'faq']

function NavButton({ section, activeSection, onSelect, variant, className = '' }) {
  const isActive = activeSection === section.id

  return (
    <button
      type="button"
      onClick={() => onSelect(section.id)}
      aria-current={isActive ? 'page' : undefined}
      className={`inline-flex min-h-11 shrink-0 snap-start items-center py-2 text-sm transition-opacity hover:opacity-70 ${
        variant === 'primary'
          ? 'font-extrabold uppercase tracking-wide'
          : 'font-medium'
      } ${isActive ? 'underline underline-offset-4' : ''} ${className}`}
    >
      {section.label}
    </button>
  )
}

function ScrollableNavRow({ children }) {
  const scrollRef = useRef(null)
  const [fade, setFade] = useState({ left: false, right: false })

  const updateFade = useCallback(() => {
    const element = scrollRef.current
    if (!element) return

    const { scrollLeft, scrollWidth, clientWidth } = element
    setFade({
      left: scrollLeft > 4,
      right: scrollLeft + clientWidth < scrollWidth - 4,
    })
  }, [])

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return undefined

    updateFade()
    element.addEventListener('scroll', updateFade, { passive: true })

    const resizeObserver = new ResizeObserver(updateFade)
    resizeObserver.observe(element)

    return () => {
      element.removeEventListener('scroll', updateFade)
      resizeObserver.disconnect()
    }
  }, [updateFade, children])

  return (
    <div className="relative lg:hidden">
      {fade.left ? (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-cream to-transparent"
          aria-hidden="true"
        />
      ) : null}
      {fade.right ? (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-cream to-transparent"
          aria-hidden="true"
        />
      ) : null}
      <div
        ref={scrollRef}
        className="nav-scroll mx-auto flex max-w-7xl snap-x snap-mandatory scroll-px-4 items-center gap-4 overflow-x-auto px-4 py-2.5 md:px-8"
      >
        {children}
      </div>
    </div>
  )
}

export default function Header({ sections, activeSection, onSectionChange }) {
  const { labels } = useLabels()

  const handleSectionChange = (id) => {
    onSectionChange(id)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const primarySections = sections.filter((section) => !subtypeIds.includes(section.id))
  const subtypeSections = sections.filter((section) => subtypeIds.includes(section.id))

  return (
    <header className="sticky top-0 z-50 border-b border-black bg-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <button
          type="button"
          onClick={() => handleSectionChange('overview')}
          className="text-lg font-black uppercase tracking-tight md:text-xl"
        >
          {labels.header.brand}
        </button>

        <SafariAudioIcon />
      </div>

      <nav aria-label="Page sections" className="border-t border-black">
        <ScrollableNavRow>
          {primarySections.map((section) => (
            <NavButton
              key={section.id}
              section={section}
              activeSection={activeSection}
              onSelect={handleSectionChange}
              variant="primary"
            />
          ))}
        </ScrollableNavRow>

        <div className="flex items-center justify-center gap-6 border-t border-black/15 px-4 py-2.5 lg:hidden">
          {subtypeSections.map((section) => (
            <NavButton
              key={section.id}
              section={section}
              activeSection={activeSection}
              onSelect={handleSectionChange}
              variant="subtype"
            />
          ))}
        </div>

        <div className="mx-auto hidden max-w-7xl items-center justify-center gap-6 px-8 py-3 lg:flex">
          <div className="flex items-center gap-6">
            {primarySections.map((section) => (
              <NavButton
                key={section.id}
                section={section}
                activeSection={activeSection}
                onSelect={handleSectionChange}
                variant="primary"
              />
            ))}
          </div>

          <span className="h-4 w-px shrink-0 bg-black/30" aria-hidden="true" />

          <div className="flex items-center gap-6">
            {subtypeSections.map((section) => (
              <NavButton
                key={section.id}
                section={section}
                activeSection={activeSection}
                onSelect={handleSectionChange}
                variant="subtype"
              />
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
