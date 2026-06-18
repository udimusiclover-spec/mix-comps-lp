import { useLabels } from '../context/LabelsContext'

export default function HowItWorks({ onNavigate }) {
  const { labels } = useLabels()
  const { howItWorks } = labels

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-heading">{howItWorks.heading}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-base text-black/70">
          {howItWorks.intro}
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, index) => (
            <article key={`${step.title}-${index}`} className="text-center md:text-left">
              <span className="text-4xl font-black md:text-5xl">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-extrabold uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/70">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="card mx-auto mt-16 max-w-3xl border-orange bg-orange p-8 text-center md:p-12">
          <h3 className="text-2xl font-black uppercase tracking-tight md:text-4xl">
            {howItWorks.ctaHeading}
          </h3>
          <p className="mt-4 text-sm text-black/80 md:text-base">{howItWorks.ctaBody}</p>
          <button type="button" onClick={() => onNavigate?.('apply')} className="btn-secondary mt-8 inline-flex bg-cream">
            {howItWorks.ctaButton}
          </button>
        </div>
      </div>
    </section>
  )
}
