import { flattenLabels } from '../labels/defaultLabels'
import { useLabels } from '../context/LabelsContext'

const GROUP_LABELS = {
  header: 'Header',
  nav: 'Navigation',
  hero: 'Overview / Hero',
  benefits: 'What you get',
  howItWorks: 'How it works',
  payout: 'Payout',
  rights: 'Rights',
  faq: 'FAQ',
  apply: 'Apply form',
  footer: 'Footer',
}

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

  if (!adminOpen) return null

  const entries = flattenLabels(draft)
  const groups = [...new Set(entries.map((entry) => entry.group))]

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Label admin dashboard"
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-black bg-cream shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-black px-6 py-4">
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight">Label editor</h2>
            <p className="mt-1 text-xs text-black/60">
              Cmd+Shift+A to toggle · Changes save to this browser
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAdminOpen(false)}
            className="rounded-full border border-black px-4 py-1.5 text-xs font-extrabold uppercase"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-8">
            {groups.map((group) => {
              const groupEntries = entries.filter((entry) => entry.group === group)

              return (
                <section key={group}>
                  <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wide">
                    {GROUP_LABELS[group] ?? group}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {groupEntries.map((entry) => (
                      <FieldEditor
                        key={pathKey(entry.path)}
                        entry={entry}
                        value={entry.value}
                        onChange={updateDraft}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-black px-6 py-4">
          <button type="button" onClick={saveDraft} className="btn-primary text-xs">
            Save changes
          </button>
          <button type="button" onClick={resetDraft} className="btn-secondary text-xs">
            Reset draft
          </button>
          <button
            type="button"
            onClick={resetAndSave}
            className="rounded-full border border-black px-5 py-2.5 text-xs font-extrabold uppercase"
          >
            Restore defaults
          </button>
        </div>
      </div>
    </div>
  )
}
