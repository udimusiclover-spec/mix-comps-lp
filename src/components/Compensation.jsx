import { useLabels } from '../context/LabelsContext'

export default function Compensation() {
  const { labels } = useLabels()
  const { payout } = labels

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-heading">{payout.heading}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-base text-black/70">{payout.intro}</p>

        <div className="card mx-auto mt-14 max-w-3xl border-orange bg-orange p-8 md:p-12">
          <h3 className="text-2xl font-black uppercase leading-tight md:text-4xl">
            {payout.offerTitle}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-black/80 md:text-base">{payout.offerBody}</p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-2xl border border-black bg-cream p-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-black/50">
                {payout.thresholdLabel}
              </p>
              <p className="mt-2 text-xl font-black">{payout.thresholdValue}</p>
            </div>
            <div className="rounded-2xl border border-black bg-cream p-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-black/50">
                {payout.rateLabel}
              </p>
              <p className="mt-2 text-xl font-black">{payout.rateValue}</p>
            </div>
            <div className="rounded-2xl border border-black bg-cream p-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-black/50">
                {payout.payoutLabel}
              </p>
              <p className="mt-2 text-xl font-black">{payout.payoutValue}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-black bg-cream p-6 md:p-8">
            <p className="text-center text-[10px] font-bold uppercase tracking-wider text-black/50">
              {payout.exampleBreakdownHeading}
            </p>
            <ol className="mt-6 space-y-4">
              {payout.exampleBreakdownSteps.map((step, index) => (
                <li key={`${step}-${index}`} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p
                    className={`pt-1 text-sm leading-relaxed ${
                      index === payout.exampleBreakdownSteps.length - 1
                        ? 'font-bold text-black'
                        : 'text-black/80'
                    }`}
                  >
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-6 text-center text-xs leading-relaxed text-black/60">
            {payout.qualifyingNote}
          </p>
        </div>

        <div className="card mt-12 border-orange bg-orange p-8 md:p-12">
          <h3 className="text-2xl font-black uppercase leading-tight tracking-tight md:text-4xl">
            {payout.includedHeading}
          </h3>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {payout.includedItems.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex gap-3 rounded-2xl border border-black bg-cream p-5 text-sm font-medium leading-relaxed text-black/90"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black bg-orange text-xs font-black">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card mt-12 p-8 md:p-10">
          <h3 className="text-2xl font-black uppercase tracking-tight md:text-3xl">
            {payout.resultsHeading}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/70">{payout.resultsIntro}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {payout.resultsItems.map((outcome, index) => (
              <li key={`${outcome}-${index}`} className="flex gap-3 text-sm leading-relaxed text-black/80">
                <span className="font-black">→</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
