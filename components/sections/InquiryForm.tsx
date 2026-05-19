'use client'

import { useEffect, useRef, useState } from 'react'
import { features } from '@/config/features'
import { site } from '@/config/site'
import { packages } from '@/config/packages'
import { content } from '@/config/content'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { trackEvent } from '@/lib/analytics'

interface FormData {
  name:        string
  whatsapp:    string
  email:       string
  eventDate:   string
  readyTime:   string
  serviceType: string
  message:     string
  // Honeypot field — invisible to humans, often filled by bots.
  // See lib/spam.ts for the checking logic.
  website:     string
}

const EMPTY: FormData = {
  name:        '',
  whatsapp:    '',
  email:       '',
  eventDate:   '',
  readyTime:   '',
  serviceType: '',
  message:     '',
  website:     '',
}

// Service options shown as pills. 'Not sure' is appended for clients who
// haven't decided yet — same approach as the portfolio filter chips.
const SERVICE_OPTIONS = [
  ...packages.map((pkg) => pkg.name),
  'Not sure',
] as const

export function InquiryForm() {
  const [data, setData] = useState<FormData>(EMPTY)
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
  }

  // Required: name, whatsapp, email, serviceType. Event date and ready
  // time are optional — many clients inquire before they've locked dates.
  const isValid =
    data.name.trim()        !== '' &&
    data.whatsapp.trim()    !== '' &&
    data.email.trim()       !== '' &&
    data.serviceType.trim() !== ''

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || loading) return
    setLoading(true)
    setError('')
    try {
      const formAgeMs = mountedAtRef.current ? Date.now() - mountedAtRef.current : 0
      const res = await fetch('/api/inquiry', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, formAgeMs }),
      })
      if (!res.ok) throw new Error('Failed to send')
      trackEvent('inquiry_form_completed', { service: data.serviceType })
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
          subtitle={`Fill in a few details and ${site.artistName} will personally WhatsApp you within 24 hours.`}
          centered
        />

        <form
          onSubmit={handleSubmit}
          className="relative mt-10 bg-ivory-2 rounded-2xl border border-ivory-4 p-6 sm:p-8 flex flex-col gap-6"
        >
          <Field
            label={content.inquiryForm.fields.name.label}
            value={data.name}
            onChange={(v) => update('name', v)}
            placeholder={content.inquiryForm.fields.name.placeholder}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label={content.inquiryForm.fields.whatsapp.label}
              value={data.whatsapp}
              onChange={(v) => update('whatsapp', v)}
              placeholder={content.inquiryForm.fields.whatsapp.placeholder}
              type="tel"
              required
            />
            <Field
              label={content.inquiryForm.fields.email.label}
              value={data.email}
              onChange={(v) => update('email', v)}
              placeholder={content.inquiryForm.fields.email.placeholder}
              type="email"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label={content.inquiryForm.fields.eventDate.label}
              value={data.eventDate}
              onChange={(v) => update('eventDate', v)}
              type="date"
            />
            <Field
              label={content.inquiryForm.fields.readyTime.label}
              value={data.readyTime}
              onChange={(v) => update('readyTime', v)}
              type="time"
            />
          </div>

          {/* Service type as branded pills — matches the portfolio filter design. */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-3">
              {content.inquiryForm.fields.serviceType.label} <span className="text-gold">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {SERVICE_OPTIONS.map((option) => {
                const active = data.serviceType === option
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => update('serviceType', option)}
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
          </div>

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
            disabled={!isValid || loading}
            className="w-full justify-center mt-2"
          >
            {loading ? content.inquiryForm.submittingButton : content.inquiryForm.submitButton}
          </Button>
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type     = 'text',
  required = false,
}: {
  label:       string
  value:       string
  onChange:    (v: string) => void
  placeholder?: string
  type?:       string
  required?:   boolean
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted mb-2">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border border-ivory-4 rounded-lg px-4 py-3 text-dark bg-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-muted-2"
      />
    </div>
  )
}
