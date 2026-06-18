import { useLabels } from '../context/LabelsContext'

export default function Footer() {
  const { labels } = useLabels()
  const { footer } = labels

  return (
    <footer className="border-t border-black bg-cream px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xl font-black uppercase tracking-tight">{footer.brand}</p>
            <p className="mt-3 text-sm leading-relaxed text-black/70">{footer.tagline}</p>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider">{footer.companyHeading}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="https://mixcomps.com" className="hover:underline">
                  {footer.mixcompsLink}
                </a>
              </li>
              <li>
                <a href="https://mixcomps.com/about" className="hover:underline">
                  {footer.aboutLink}
                </a>
              </li>
            </ul>

            <h3 className="mt-8 text-xs font-extrabold uppercase tracking-wider">{footer.followHeading}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="https://instagram.com/mixcomps" className="hover:underline">
                  {footer.instagramLink}
                </a>
              </li>
              <li>
                <a href="https://discord.gg/mixcomps" className="hover:underline">
                  {footer.discordLink}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider">{footer.contactHeading}</h3>
            <p className="mt-4 text-sm leading-relaxed text-black/70">{footer.contactBody}</p>
            <a
              href={`mailto:${footer.email}`}
              className="mt-2 inline-block text-sm font-semibold hover:underline"
            >
              {footer.email}
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-black/20 pt-8 text-center text-xs text-black/50">
          © {new Date().getFullYear()} {footer.brand}. {footer.copyrightSuffix}
        </p>
      </div>
    </footer>
  )
}
