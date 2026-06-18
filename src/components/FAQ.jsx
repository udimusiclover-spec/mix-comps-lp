import { useState } from 'react'
import { useLabels } from '../context/LabelsContext'

export default function FAQ() {
  const { labels } = useLabels()
  const { faq } = labels
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="section-heading">{faq.heading}</h2>

        <div className="mt-12 divide-y divide-black border-y border-black">
          {faq.items.map((item, index) => (
            <div key={`${item.question}-${index}`}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-extrabold uppercase tracking-tight">{item.question}</span>
                <span className="shrink-0 text-2xl font-light leading-none">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <p className="pb-5 text-sm leading-relaxed text-black/70">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
