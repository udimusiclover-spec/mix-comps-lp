import { useState } from 'react'
import { useLabels } from '../context/LabelsContext'

const agreementKeys = ['rightsConfirm', 'noGuaranteeConfirm', 'contactConfirm']

const initialForm = {
  artistName: '',
  email: '',
  country: '',
  website: '',
  instagram: '',
  tiktok: '',
  youtube: '',
  spotify: '',
  songTitle: '',
  genre: '',
  bpm: '',
  key: '',
  releaseStatus: 'unreleased',
  releaseDate: '',
  roughMixLink: '',
  hasStems: '',
  trackCount: '',
  fileFormat: '',
  vocalsIncluded: '',
  rightsHolder: '',
  goals: [],
  rightsConfirm: false,
  noGuaranteeConfirm: false,
  contactConfirm: false,
}

export default function ApplicationForm() {
  const { labels } = useLabels()
  const { apply } = labels
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const toggleGoal = (goal) => {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="card mx-auto max-w-2xl bg-orange p-10 text-center md:p-14">
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            {apply.successHeading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-black/80 md:text-base">{apply.successBody}</p>
          <button
            type="button"
            className="btn-secondary mt-8 bg-cream"
            onClick={() => {
              setForm(initialForm)
              setSubmitted(false)
            }}
          >
            {apply.submitAnother}
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="section-heading">{apply.heading}</h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-black/70">{apply.intro}</p>
        </div>

        <form onSubmit={handleSubmit} className="card mt-12 p-6 md:p-10">
          <fieldset className="space-y-5">
            <legend className="mb-6 text-lg font-extrabold uppercase tracking-tight">
              {apply.sections.artistDetails}
            </legend>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                label={apply.fields.artistName}
                required
                value={form.artistName}
                onChange={(v) => updateField('artistName', v)}
              />
              <FormField
                label={apply.fields.email}
                type="email"
                required
                value={form.email}
                onChange={(v) => updateField('email', v)}
              />
              <FormField
                label={apply.fields.country}
                value={form.country}
                onChange={(v) => updateField('country', v)}
              />
              <FormField
                label={apply.fields.website}
                type="url"
                value={form.website}
                onChange={(v) => updateField('website', v)}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                label={apply.fields.instagram}
                value={form.instagram}
                onChange={(v) => updateField('instagram', v)}
              />
              <FormField
                label={apply.fields.tiktok}
                value={form.tiktok}
                onChange={(v) => updateField('tiktok', v)}
              />
              <FormField
                label={apply.fields.youtube}
                value={form.youtube}
                onChange={(v) => updateField('youtube', v)}
              />
              <FormField
                label={apply.fields.spotify}
                value={form.spotify}
                onChange={(v) => updateField('spotify', v)}
              />
            </div>
          </fieldset>

          <fieldset className="mt-10 space-y-5 border-t border-black/20 pt-10">
            <legend className="mb-6 text-lg font-extrabold uppercase tracking-tight">
              {apply.sections.songDetails}
            </legend>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                label={apply.fields.songTitle}
                required
                value={form.songTitle}
                onChange={(v) => updateField('songTitle', v)}
              />
              <FormField
                label={apply.fields.genre}
                value={form.genre}
                onChange={(v) => updateField('genre', v)}
              />
              <FormField
                label={apply.fields.bpm}
                value={form.bpm}
                onChange={(v) => updateField('bpm', v)}
              />
              <FormField
                label={apply.fields.key}
                value={form.key}
                onChange={(v) => updateField('key', v)}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide">
                {apply.fields.releaseStatus}
              </label>
              <div className="flex gap-4">
                {['released', 'unreleased'].map((status) => (
                  <label key={status} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="releaseStatus"
                      value={status}
                      checked={form.releaseStatus === status}
                      onChange={(e) => updateField('releaseStatus', e.target.value)}
                      className="accent-black"
                    />
                    {apply.releaseOptions[status]}
                  </label>
                ))}
              </div>
            </div>

            {form.releaseStatus === 'released' && (
              <FormField
                label={apply.fields.releaseDate}
                type="date"
                value={form.releaseDate}
                onChange={(v) => updateField('releaseDate', v)}
              />
            )}

            <FormField
              label={apply.fields.roughMixLink}
              type="url"
              value={form.roughMixLink}
              onChange={(v) => updateField('roughMixLink', v)}
              placeholder={apply.urlPlaceholder}
            />
          </fieldset>

          <fieldset className="mt-10 space-y-5 border-t border-black/20 pt-10">
            <legend className="mb-6 text-lg font-extrabold uppercase tracking-tight">
              {apply.sections.files}
            </legend>

            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField
                label={apply.fields.hasStems}
                value={form.hasStems}
                onChange={(v) => updateField('hasStems', v)}
                options={apply.stemOptions}
                placeholder={apply.selectPlaceholder}
              />
              <FormField
                label={apply.fields.trackCount}
                value={form.trackCount}
                onChange={(v) => updateField('trackCount', v)}
              />
              <FormField
                label={apply.fields.fileFormat}
                value={form.fileFormat}
                onChange={(v) => updateField('fileFormat', v)}
                placeholder={apply.fileFormatPlaceholder}
              />
              <SelectField
                label={apply.fields.vocalsIncluded}
                value={form.vocalsIncluded}
                onChange={(v) => updateField('vocalsIncluded', v)}
                options={apply.vocalOptions}
                placeholder={apply.selectPlaceholder}
              />
              <SelectField
                label={apply.fields.rightsHolder}
                value={form.rightsHolder}
                onChange={(v) => updateField('rightsHolder', v)}
                options={apply.rightsOptions}
                placeholder={apply.selectPlaceholder}
                required
              />
            </div>
          </fieldset>

          <fieldset className="mt-10 space-y-4 border-t border-black/20 pt-10">
            <legend className="mb-4 text-lg font-extrabold uppercase tracking-tight">
              {apply.sections.goals}
            </legend>
            <div className="flex flex-wrap gap-3">
              {apply.goalOptions.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`rounded-full border border-black px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                    form.goals.includes(goal)
                      ? 'bg-orange text-black'
                      : 'bg-cream hover:bg-cream-dark'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-10 space-y-4 border-t border-black/20 pt-10">
            <legend className="mb-4 text-lg font-extrabold uppercase tracking-tight">
              {apply.sections.agreement}
            </legend>
            {apply.agreements.map((label, index) => (
              <label key={agreementKeys[index]} className="flex items-start gap-3 text-sm leading-relaxed">
                <input
                  type="checkbox"
                  required
                  checked={form[agreementKeys[index]]}
                  onChange={(e) => updateField(agreementKeys[index], e.target.checked)}
                  className="mt-1 accent-black"
                />
                {label}
              </label>
            ))}
          </fieldset>

          <div className="mt-10 flex justify-center">
            <button type="submit" className="btn-primary min-w-[220px]">
              {apply.submitButton}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

function FormField({ label, type = 'text', required, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide">
        {label}
        {required && <span className="text-orange"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black bg-cream px-4 py-3 text-sm outline-none transition-colors focus:bg-white"
      />
    </div>
  )
}

function SelectField({ label, value, onChange, options, placeholder, required }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide">
        {label}
        {required && <span className="text-orange"> *</span>}
      </label>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-black bg-cream px-4 py-3 text-sm outline-none transition-colors focus:bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
