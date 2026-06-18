import { useLabels } from '../context/LabelsContext'

const stemFills = ['85%', '72%', '60%', '78%', '45%']

function StemBar({ fill }) {
  return (
    <div className="h-3 rounded-full bg-black/10">
      <div className="h-full rounded-full bg-black" style={{ width: fill }} />
    </div>
  )
}

export default function Hero({ onNavigate }) {
  const { labels } = useLabels()
  const { hero } = labels

  return (
    <section className="px-4 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-black/60">
          {hero.eyebrow}
        </p>

        <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
          {hero.headline}
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-black/80 md:text-lg">
          {hero.subhead}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button type="button" onClick={() => onNavigate?.('apply')} className="btn-primary min-w-[200px]">
            {hero.ctaPrimary}
          </button>
          <button type="button" onClick={() => onNavigate?.('how-it-works')} className="btn-secondary min-w-[200px]">
            {hero.ctaSecondary}
          </button>
        </div>

        <p className="mt-8 text-sm text-black/60">{hero.footnote}</p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 md:items-stretch">
        <div className="card flex h-full min-h-0 flex-col justify-between overflow-hidden bg-orange p-8 md:p-10">
          <div>
            <span className="inline-block rounded-full border border-black bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {hero.stemsBadge}
            </span>
            <h2 className="mt-6 text-3xl font-black uppercase leading-tight md:text-4xl">
              {hero.stemsTitleLine1}
              <br />
              {hero.stemsTitleLine2}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/80">{hero.stemsDesc}</p>
          </div>
          <div className="mt-8 space-y-2">
            {hero.stemNames.map((stem, index) => (
              <div key={`${stem}-${index}`} className="flex items-center gap-3">
                <span className="w-14 shrink-0 text-[10px] font-bold uppercase">{stem}</span>
                <StemBar fill={stemFills[index] ?? '50%'} />
              </div>
            ))}
          </div>
        </div>

        <div className="card flex h-full min-h-0 flex-col justify-between p-8 md:p-10">
          <div>
            <span className="inline-block rounded-full border border-black px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              {hero.checklistBadge}
            </span>
            <h2 className="mt-6 text-2xl font-black uppercase leading-tight md:text-3xl">
              {hero.checklistTitle}
            </h2>
          </div>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-black/80">
            {hero.checklistItems.map((item, index) => (
              <li key={`${item}-${index}`} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black bg-orange text-xs font-black">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
