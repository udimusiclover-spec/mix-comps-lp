import { useLabels } from '../context/LabelsContext'
import SafariAudioIcon from './SafariAudioIcon'

const subtypeIds = ['rights', 'faq']

function NavButton({ section, activeSection, onSelect, variant }) {
  const isActive = activeSection === section.id

  return (
    <button
      type="button"
      onClick={() => onSelect(section.id)}
      aria-current={isActive ? 'page' : undefined}
      className={`shrink-0 text-sm transition-opacity hover:opacity-70 ${
        variant === 'primary'
          ? 'font-extrabold uppercase tracking-wide'
          : 'font-medium'
      } ${isActive ? 'underline underline-offset-4' : ''}`}
    >
      {section.label}
    </button>
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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <button
          type="button"
          onClick={() => handleSectionChange('overview')}
          className="text-lg font-black uppercase tracking-tight md:text-xl"
        >
          {labels.header.brand}
        </button>

        <SafariAudioIcon />
      </div>

      <nav
        className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto border-t border-black px-4 py-3 md:px-8 lg:justify-center"
        aria-label="Page sections"
      >
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
      </nav>
    </header>
  )
}
