export default function SafariAudioIcon({ className = '' }) {
  return (
    <a
      href="https://safariaudio.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Safari Audio"
      className={`inline-block transition-opacity hover:opacity-80 ${className}`}
    >
      <img
        src="/safari-audio-logo.png"
        alt="Safari Audio"
        className="h-8 w-auto object-contain md:h-9"
      />
    </a>
  )
}
