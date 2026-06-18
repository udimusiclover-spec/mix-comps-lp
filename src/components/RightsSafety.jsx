import { useLabels } from '../context/LabelsContext'

export default function RightsSafety() {
  const { labels } = useLabels()
  const { rights } = labels

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-heading">{rights.heading}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-base text-black/70">{rights.intro}</p>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {rights.points.map((point, index) => (
            <article key={`${point.title}-${index}`} className="card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black bg-orange text-sm font-black"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <div>
                  <h3 className="text-base font-extrabold uppercase tracking-tight">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">{point.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="card mt-8 bg-cream-dark p-6 text-center md:p-8">
          <p className="text-sm leading-relaxed text-black/70">{rights.footerNote}</p>
        </div>
      </div>
    </section>
  )
}
