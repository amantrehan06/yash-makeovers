'use client'

import { useRef, useState } from 'react'
import { features } from '@/config/features'
import { site } from '@/config/site'
import { packages, formatPrice } from '@/config/packages'
import { content } from '@/config/content'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { trackEvent } from '@/lib/analytics'

interface FormData {
  name: string
  whatsapp: string
  email: string
  eventDate: string
  serviceType: string
  numPeople: string
  city: string
  startTime: string
  vision: string
}

const EMPTY: FormData = {
  name: '',
  whatsapp: '',
  email: '',
  eventDate: '',
  serviceType: '',
  numPeople: '',
  city: '',
  startTime: '',
  vision: '',
}

const steps = content.inquiryForm.steps

export function InquiryForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const startedRef = useRef(false)

  const update = (field: keyof FormData, value: string) => {
    if (!startedRef.current) {
      startedRef.current = true
      trackEvent('inquiry_form_started')
    }
    setData((d) => ({ ...d, [field]: value }))
  }

  const isEarlyMorning = data.startTime !== '' && parseInt(data.startTime.split(':')[0]) < 6

  async function handleSubmit() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to send')
      trackEvent('inquiry_form_completed', { service: data.serviceType, city: data.city })
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

        <div className="mt-10 bg-ivory-2 rounded-2xl border border-ivory-4 overflow-hidden">
          <div className="flex">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`flex-1 py-3 text-center text-xs font-medium border-b-2 transition-colors ${
                  i === step
                    ? 'border-gold text-gold'
                    : i < step
                    ? 'border-gold-pale text-muted'
                    : 'border-ivory-4 text-muted-2'
                }`}
              >
                <span className="hidden sm:inline">{s}</span>
                <span className="sm:hidden">{i + 1}</span>
              </div>
            ))}
          </div>

          <div className="p-8">
            {step === 0 && (
              <div className="flex flex-col gap-5">
                <Field label={content.inquiryForm.fields.name.label}     value={data.name}     onChange={(v) => update('name', v)}     placeholder={content.inquiryForm.fields.name.placeholder} />
                <Field label={content.inquiryForm.fields.whatsapp.label} value={data.whatsapp} onChange={(v) => update('whatsapp', v)} placeholder={content.inquiryForm.fields.whatsapp.placeholder} type="tel" />
                <Field label={content.inquiryForm.fields.email.label}    value={data.email}    onChange={(v) => update('email', v)}    placeholder={content.inquiryForm.fields.email.placeholder} type="email" />
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-5">
                <Field label={content.inquiryForm.fields.eventDate.label} value={data.eventDate} onChange={(v) => update('eventDate', v)} type="date" />
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted mb-2">{content.inquiryForm.fields.serviceType.label}</label>
                  <select
                    value={data.serviceType}
                    onChange={(e) => update('serviceType', e.target.value)}
                    className="w-full border border-ivory-4 rounded-lg px-4 py-3 text-dark bg-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="">{content.inquiryForm.fields.serviceType.placeholder}</option>
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.name}>
                        {pkg.name} ({formatPrice(pkg.price)}/person)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted mb-2">{content.inquiryForm.fields.numPeople.label}</label>
                  <select
                    value={data.numPeople}
                    onChange={(e) => update('numPeople', e.target.value)}
                    className="w-full border border-ivory-4 rounded-lg px-4 py-3 text-dark bg-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="">{content.inquiryForm.fields.numPeople.placeholder}</option>
                    {content.inquiryForm.peopleOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5">
                <Field label={content.inquiryForm.fields.city.label}      value={data.city}      onChange={(v) => update('city', v)}      placeholder={content.inquiryForm.fields.city.placeholder} />
                <Field label={content.inquiryForm.fields.startTime.label} value={data.startTime} onChange={(v) => update('startTime', v)} type="time" />
                {isEarlyMorning && (
                  <div className="bg-gold-pale border border-gold-pale rounded-xl p-4 text-sm text-gold-dim">
                    ⏰ <strong>{content.inquiryForm.earlyMorningWarning}</strong> Start times between {site.policies.earlyMorningThreshold} incur an additional ${site.policies.earlyMorningFee} per person.
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted mb-2">{content.inquiryForm.fields.vision.label}</label>
                  <textarea
                    value={data.vision}
                    onChange={(e) => update('vision', e.target.value)}
                    rows={5}
                    placeholder={content.inquiryForm.fields.vision.placeholder}
                    className="w-full border border-ivory-4 rounded-lg px-4 py-3 text-dark bg-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                  />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-ivory-4">
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="text-sm text-muted hover:text-dark transition-colors"
                >
                  {content.inquiryForm.backButton}
                </button>
              ) : (
                <span />
              )}

              {step < 3 ? (
                <Button onClick={() => setStep((s) => s + 1)} size="md">
                  {content.inquiryForm.continueButton}
                </Button>
              ) : (
                <Button onClick={handleSubmit} size="md" disabled={loading}>
                  {loading ? content.inquiryForm.submittingButton : content.inquiryForm.submitButton}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-ivory-4 rounded-lg px-4 py-3 text-dark bg-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-muted-2"
      />
    </div>
  )
}
