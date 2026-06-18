import { useLabels } from '../context/LabelsContext'

export default function HowItWorks() {
  const { labels } = useLabels()
  const { howItWorks } = labels

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-heading">{howItWorks.heading}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-base text-black/70">
          {howItWorks.intro}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {howItWorks.steps.map((step, index) => (
            <article
              key={`${step.title}-${index}`}
              className="card flex flex-col p-6 transition-colors hover:bg-cream-dark md:p-8"
            >
              <span className="text-3xl font-black md:text-4xl">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-lg font-extrabold uppercase leading-tight tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-black/70">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
