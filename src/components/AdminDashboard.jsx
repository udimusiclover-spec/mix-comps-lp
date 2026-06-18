import { useEffect, useState } from 'react'
import { flattenLabels } from '../labels/defaultLabels'
import { useLabels } from '../context/LabelsContext'

const ADMIN_SECTIONS = [
  { id: 'header', label: 'Header' },
  { id: 'nav', label: 'Navigation' },
  { id: 'hero', label: 'Overview' },
  { id: 'howItWorks', label: 'How it works' },
  { id: 'benefits', label: 'What you get' },
  { id: 'payout', label: 'Payout' },
  { id: 'rights', label: 'Rights' },
  { id: 'faq', label: 'FAQ' },
  { id: 'apply', label: 'Apply form' },
  { id: 'footer', label: 'Footer' },
]

function pathKey(path) {
  return path.join('.')
}

function FieldEditor({ entry, value, onChange }) {
  const label = pathKey(entry.path)
  const isLong = value.length > 80 || value.includes('\n')

  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-black/50">
        {label}
      </span>
      {isLong ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(entry.path, e.target.value)}
          className="w-full rounded-xl border border-black/20 bg-white px-3 py-2 text-sm outline-none focus:border-black"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(entry.path, e.target.value)}
          className="w-full rounded-xl border border-black/20 bg-white px-3 py-2 text-sm outline-none focus:border-black"
        />
      )}
    </label>
  )
}

export default function AdminDashboard() {
  const { adminOpen, draft, setAdminOpen, updateDraft, saveDraft, resetDraft, resetAndSave } =
    useLabels()
  const [activeSection, setActiveSection] = useState('header')

  useEffect(() => {
    if (!adminOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [adminOpen])

  useEffect(() => {
    if (adminOpen) {
      setActiveSection('header')
    }
  }, [adminOpen])

  if (!adminOpen) return null

  const entries = flattenLabels(draft)
  const sectionEntries = entries.filter((entry) => entry.group === activeSection)
  const activeMeta = ADMIN_SECTIONS.find((section) => section.id === activeSection)

  const handleSectionChange = (id) => {
    setActiveSection(id)
  }

  return (
    <div className="fixed inset-0 z-[100] flex h-dvh flex-col overflow-hidden bg-cream">
      <header className="shrink-0 border-b border-black bg-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <div>
            <h1 className="text-lg font-black uppercase tracking-tight md:text-xl">Admin settings</h1>
            <p className="mt-1 text-xs text-black/60">Cmd+Shift+A to close · Saved to this browser</p>
          </div>
          <button
            type="button"
            onClick={() => setAdminOpen(false)}
            className="btn-secondary shrink-0 text-xs"
          >
            Back to site
          </button>
        </div>

        <nav
          className="mx-auto flex max-w-7xl gap-2 overflow-x-auto border-t border-black px-4 py-3 md:px-8"
          aria-label="Admin sections"
        >
          {ADMIN_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => handleSectionChange(section.id)}
              aria-current={activeSection === section.id ? 'page' : undefined}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide transition-colors ${
                activeSection === section.id
                  ? 'bg-orange text-black'
                  : 'text-black/70 hover:bg-cream-dark hover:text-black'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
        <h2 className="text-2xl font-black uppercase tracking-tight">{activeMeta?.label}</h2>
        <p className="mt-2 text-sm text-black/60">
          Edit labels for this section. Changes apply after you save.
        </p>

        <div className="card mt-8 p-6 md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {sectionEntries.map((entry) => (
              <FieldEditor
                key={pathKey(entry.path)}
                entry={entry}
                value={entry.value}
                onChange={updateDraft}
              />
            ))}
          </div>
        </div>
        </div>
      </main>

      <footer className="shrink-0 border-t border-black bg-cream">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 py-4 md:px-8">
          <button type="button" onClick={saveDraft} className="btn-primary text-xs">
            Save changes
          </button>
          <button type="button" onClick={resetDraft} className="btn-secondary text-xs">
            Reset section draft
          </button>
          <button
            type="button"
            onClick={resetAndSave}
            className="rounded-full border border-black px-5 py-2.5 text-xs font-extrabold uppercase"
          >
            Restore all defaults
          </button>
        </div>
      </footer>
    </div>
  )
}
