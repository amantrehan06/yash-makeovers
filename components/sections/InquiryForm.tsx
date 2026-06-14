'use client'

import { useEffect, useRef, useState } from 'react'
import { features } from '@/config/features'
import { site } from '@/config/site'
import { content } from '@/config/content'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { trackEvent } from '@/lib/analytics'
import { getOrInitAttribution } from '@/lib/attribution'

interface FormData {
  name:     string
  whatsapp: string
  email:    string
  eventDate: string
  readyTime: string
  occasion: string
  familyLook: string  // only set when occasion === FAMILY_TRIGGER
  message:  string
  // Honeypot field — invisible to humans, often filled by bots.
  // See lib/spam.ts for the checking logic.
  website:  string
}

const EMPTY: FormData = {
  name:      '',
  whatsapp:  '',
  email:     '',
  eventDate: '',
  readyTime: '',
  occasion:  '',
  familyLook: '',
  message:   '',
  website:   '',
}

// Occasion + family-look options come from config — reworded there, not here.
const OCCASION_OPTIONS    = content.inquiryForm.fields.occasion.options
const FAMILY_TRIGGER      = content.inquiryForm.fields.occasion.familyTrigger
const FAMILY_LOOK_OPTIONS = content.inquiryForm.fields.familyLook.options

type FieldErrors = Partial<Record<keyof FormData, string>>

export function InquiryForm() {
  const [data, setData] = useState<FormData>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const startedRef = useRef(false)

  // Form-mount timestamp — combined with submit time on the server to detect
  // bots that auto-fill in milliseconds. See lib/spam.ts (MIN_FILL_MS).
  const mountedAtRef = useRef<number>(0)
  useEffect(() => { mountedAtRef.current = Date.now() }, [])

  const update = (field: keyof FormData, value: string) => {
    if (!startedRef.current) {
      startedRef.current = true
      trackEvent('inquiry_form_started')
    }
    setData((d) => ({ ...d, [field]: value }))
    // Clear that field's error as soon as the user starts fixing it.
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  // Occasion has a side effect: picking anything other than the family-wedding
  // trigger clears any stale familyLook choice (and its error) so we never
  // submit a look for a non-family occasion.
  const updateOccasion = (value: string) => {
    update('occasion', value)
    if (value !== FAMILY_TRIGGER) {
      setData((d) => ({ ...d, familyLook: '' }))
      setErrors((e) => ({ ...e, familyLook: undefined }))
    }
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    if (!data.name.trim())     next.name        = 'Please enter your name.'
    if (!data.whatsapp.trim()) next.whatsapp    = 'A real WhatsApp number is required so we can reach you.'
    if (!data.email.trim())    next.email       = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      next.email = 'That email doesn\'t look right — please double-check.'
    }
    if (!data.occasion.trim()) next.occasion = 'Pick the occasion.'
    // familyLook is optional — a family-wedding guest can leave it blank and
    // sort the look out on the call.
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    const fieldErrors = validate()
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      // Focus the first invalid field so the user lands at the error.
      const first = Object.keys(fieldErrors)[0]
      const el = document.querySelector<HTMLElement>(`[data-field="${first}"]`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el?.focus()
      return
    }
    setLoading(true)
    setError('')
    try {
      const formAgeMs = mountedAtRef.current ? Date.now() - mountedAtRef.current : 0
      const res = await fetch('/api/inquiry', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, formAgeMs, attribution: getOrInitAttribution() }),
      })
      if (!res.ok) throw new Error('Failed to send')
      trackEvent('inquiry_form_completed', {
        occasion: data.occasion === FAMILY_TRIGGER ? `${data.occasion} (${data.familyLook})` : data.occasion,
      })
      setSubmitted(true)
    } catch {
      setError(`${content.inquiryForm.errorBody} ${site.phone}.`)
    } finally {
      setLoading(false)
    }
  }

  if (!features.acceptingBookings) {
    return (
      <section className="py-24 px-6 bg-ivory" id="inquiry">
        <div className="max-w-lg mx-auto text-center">
          <p className="font-serif text-6xl text-gold mb-6">✦</p>
          <h2 className="font-serif text-4xl text-dark mb-4">{content.inquiryForm.notAcceptingTitle}</h2>
          <p className="text-muted leading-relaxed mb-8">
            {content.inquiryForm.notAcceptingBody}
            <a
              href={`https://instagram.com/${site.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-dim transition-colors mx-1 underline-offset-4 underline"
            >
              @{site.instagram}
            </a>
            on Instagram for updates.
          </p>
        </div>
      </section>
    )
  }

  if (submitted) {
    return (
      <section className="py-24 px-6 bg-ivory">
        <div className="max-w-lg mx-auto text-center">
          <p className="font-serif text-6xl text-gold mb-6">✦</p>
          <h2 className="font-serif text-4xl text-dark mb-4">{content.inquiryForm.successTitle}</h2>
          <p className="text-muted leading-relaxed">
            {site.artistName} {content.inquiryForm.successBody}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-6 bg-ivory" id="inquiry">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          eyebrow={content.inquiryForm.eyebrow}
          title={content.inquiryForm.title}
          subtitle={`Fill in a few details and ${site.artistName} will personally reach out to you soon.`}
          centered
        />

        <form
          onSubmit={handleSubmit}
          className="relative mt-10 bg-ivory-2 rounded-2xl border border-ivory-4 p-6 sm:p-8 flex flex-col gap-6"
        >
          <Field
            name="name"
            label={content.inquiryForm.fields.name.label}
            value={data.name}
            onChange={(v) => update('name', v)}
            placeholder={content.inquiryForm.fields.name.placeholder}
            error={errors.name}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              name="whatsapp"
              label={content.inquiryForm.fields.whatsapp.label}
              value={data.whatsapp}
              onChange={(v) => update('whatsapp', v)}
              placeholder={content.inquiryForm.fields.whatsapp.placeholder}
              type="tel"
              error={errors.whatsapp}
              required
            />
            <Field
              name="email"
              label={content.inquiryForm.fields.email.label}
              value={data.email}
              onChange={(v) => update('email', v)}
              placeholder={content.inquiryForm.fields.email.placeholder}
              type="email"
              error={errors.email}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              name="eventDate"
              label={content.inquiryForm.fields.eventDate.label}
              value={data.eventDate}
              onChange={(v) => update('eventDate', v)}
              placeholder={content.inquiryForm.fields.eventDate.placeholder}
            />
            <Field
              name="readyTime"
              label={content.inquiryForm.fields.readyTime.label}
              value={data.readyTime}
              onChange={(v) => update('readyTime', v)}
              placeholder={content.inquiryForm.fields.readyTime.placeholder}
            />
          </div>

          {/* Occasion as branded pills — replaces the old self-selected
              package pills so the artist maps the correct package on the
              call. The bride can't undercharge her own event; a family-wedding
              guest gets a follow-up to choose their look level. */}
          <PillGroup
            name="occasion"
            label={content.inquiryForm.fields.occasion.label}
            options={OCCASION_OPTIONS}
            value={data.occasion}
            onChange={updateOccasion}
            error={errors.occasion}
          />

          {/* Follow-up: only family weddings are a gray tier, so we let that
              guest pick how done-up they want to be. Hidden otherwise. */}
          {data.occasion === FAMILY_TRIGGER && (
            <PillGroup
              name="familyLook"
              label={content.inquiryForm.fields.familyLook.label}
              options={FAMILY_LOOK_OPTIONS}
              value={data.familyLook}
              onChange={(v) => update('familyLook', v)}
              error={errors.familyLook}
              required={false}
            />
          )}

          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-2">
              {content.inquiryForm.fields.message.label}
            </label>
            <textarea
              value={data.message}
              onChange={(e) => update('message', e.target.value)}
              rows={5}
              placeholder={content.inquiryForm.fields.message.placeholder}
              className="w-full border border-ivory-4 rounded-lg px-4 py-3 text-dark bg-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold resize-none"
            />
          </div>

          {/* Honeypot — visually hidden, off-screen, and aria-hidden. Real
              users never see or focus this field. Bots that crawl the DOM
              fill every input → server checks this and silently rejects. */}
          <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="company-website">Website (leave blank)</label>
            <input
              id="company-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={data.website}
              onChange={(e) => update('website', e.target.value)}
            />
          </div>

          <p className="text-xs text-muted leading-relaxed">
            {content.termsPage.inquiryAgreement}{' '}
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-dim underline underline-offset-2"
            >
              {content.termsPage.inquiryAgreementLink}
            </a>
            .
          </p>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full justify-center mt-2"
          >
            {loading ? content.inquiryForm.submittingButton : content.inquiryForm.submitButton}
          </Button>
        </form>
      </div>
    </section>
  )
}

// Single-select pill group — branded chips matching the portfolio filter
// design. `required` (default true) shows the gold asterisk.
function PillGroup({
  name,
  label,
  options,
  value,
  onChange,
  error,
  required = true,
}: {
  name:     string
  label:    string
  options:  readonly string[]
  value:    string
  onChange: (v: string) => void
  error?:   string
  required?: boolean
}) {
  return (
    <div data-field={name} tabIndex={-1}>
      <label className="block text-xs uppercase tracking-widest text-muted mb-3">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <div className={`flex flex-wrap gap-2 ${error ? 'rounded-lg ring-2 ring-red-300 ring-offset-4 ring-offset-ivory-2' : ''}`}>
        {options.map((option) => {
          const active = value === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                active
                  ? 'bg-gold text-ivory border-gold'
                  : 'bg-ivory border-ivory-4 text-muted hover:border-gold hover:text-gold'
              }`}
              aria-pressed={active}
            >
              {option}
            </button>
          )
        })}
      </div>
      {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type     = 'text',
  required = false,
  error,
  name,
}: {
  label:       string
  value:       string
  onChange:    (v: string) => void
  placeholder?: string
  type?:       string
  required?:   boolean
  error?:      string
  name?:       string
}) {
  const borderClass = error
    ? 'border-red-400 focus:ring-red-300'
    : 'border-ivory-4 focus:ring-gold'
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted mb-2">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      <input
        data-field={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`w-full border rounded-lg px-4 py-3 text-dark bg-ivory text-sm focus:outline-none focus:ring-2 placeholder:text-muted-2 ${borderClass}`}
      />
      {error && <p className="text-red-600 text-xs mt-1.5">{error}</p>}
    </div>
  )
}
