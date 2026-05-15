'use client'

import { useRef, useState } from 'react'
import { features } from '@/config/features'
import { site } from '@/config/site'
import { packages } from '@/config/packages'
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

const steps = ['Contact', 'Event details', 'Location & time', 'Your vision']

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
      setError(`Something went wrong. Please WhatsApp us directly at ${site.phone}.`)
    } finally {
      setLoading(false)
    }
  }

  if (!features.acceptingBookings) {
    return (
      <section className="py-24 px-6 bg-ivory" id="inquiry">
        <div className="max-w-lg mx-auto text-center">
          <p className="font-serif text-6xl text-gold mb-6">✦</p>
          <h2 className="font-serif text-4xl text-dark mb-4">Not accepting new bookings</h2>
          <p className="text-muted leading-relaxed mb-8">
            We are currently not accepting new bookings. Please follow
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
          <h2 className="font-serif text-4xl text-dark mb-4">Inquiry received!</h2>
          <p className="text-muted leading-relaxed">
            {site.artistName} will WhatsApp you within 24 hours to discuss your vision.
            Keep an eye on your WhatsApp — we can&apos;t wait to make your day unforgettable.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-6 bg-ivory" id="inquiry">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          eyebrow="Get in touch"
          title="Start your booking"
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
                <Field label="Full name" value={data.name} onChange={(v) => update('name', v)} placeholder="Your full name" />
                <Field label="WhatsApp number" value={data.whatsapp} onChange={(v) => update('whatsapp', v)} placeholder="+1 (647) 000-0000" type="tel" />
                <Field label="Email address" value={data.email} onChange={(v) => update('email', v)} placeholder="your@email.com" type="email" />
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-5">
                <Field label="Event date" value={data.eventDate} onChange={(v) => update('eventDate', v)} type="date" />
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted mb-2">Service type</label>
                  <select
                    value={data.serviceType}
                    onChange={(e) => update('serviceType', e.target.value)}
                    className="w-full border border-ivory-4 rounded-lg px-4 py-3 text-dark bg-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="">Select a service</option>
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.name}>
                        {pkg.name} ({pkg.price}/person)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted mb-2">Number of people</label>
                  <select
                    value={data.numPeople}
                    onChange={(e) => update('numPeople', e.target.value)}
                    className="w-full border border-ivory-4 rounded-lg px-4 py-3 text-dark bg-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="">Select</option>
                    <option value="1">1 person</option>
                    <option value="2-3">2–3 people</option>
                    <option value="4-6">4–6 people</option>
                    <option value="7+">7+ people</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5">
                <Field label="City / Venue location" value={data.city} onChange={(v) => update('city', v)} placeholder="e.g. Brampton, ON or venue name" />
                <Field label="Preferred start time" value={data.startTime} onChange={(v) => update('startTime', v)} type="time" />
                {isEarlyMorning && (
                  <div className="bg-gold-pale border border-gold-pale rounded-xl p-4 text-sm text-gold-dim">
                    ⏰ <strong>Early morning fee applies.</strong> Start times between {site.policies.earlyMorningThreshold} incur an additional ${site.policies.earlyMorningFee} per person.
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted mb-2">Your vision & inspiration</label>
                  <textarea
                    value={data.vision}
                    onChange={(e) => update('vision', e.target.value)}
                    rows={5}
                    placeholder="Describe your dream look, color palette, any inspiration images or references, and any specific requirements..."
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
                  ← Back
                </button>
              ) : (
                <span />
              )}

              {step < 3 ? (
                <Button onClick={() => setStep((s) => s + 1)} size="md">
                  Continue →
                </Button>
              ) : (
                <Button onClick={handleSubmit} size="md" disabled={loading}>
                  {loading ? 'Sending…' : 'Send inquiry'}
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
