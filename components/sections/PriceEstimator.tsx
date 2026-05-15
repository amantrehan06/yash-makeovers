'use client'

import { useRef, useState } from 'react'
import { features } from '@/config/features'
import { packages } from '@/config/packages'
import { site } from '@/config/site'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

// Single source of truth — both maps derive from config/packages.ts.
// Adding a new package or changing a price requires zero edits here.
const servicePrices: Record<string, number> = Object.fromEntries(
  packages.map((pkg) => [pkg.id, pkg.priceValue])
)

const serviceLabels: Record<string, string> = Object.fromEntries(
  packages.map((pkg) => [pkg.id, `${pkg.name} (${pkg.price}/person)`])
)

const peopleCounts: Record<string, [number, number]> = {
  '1': [1, 1],
  '2-3': [2, 3],
  '4-6': [4, 6],
  '7+': [7, 10],
}

export function PriceEstimator() {
  const [service, setService] = useState('bridal')
  const [people, setPeople] = useState('1')
  const [earlyMorning, setEarlyMorning] = useState(false)
  const [travelZone, setTravelZone] = useState<'none' | 'peel' | 'gta'>('none')
  const usedRef = useRef(false)
  if (!features.priceEstimator) return null
  function flagUsed() {
    if (usedRef.current) return
    usedRef.current = true
    trackEvent('estimator_used')
  }

  const basePrice = servicePrices[service]
  const [minPeople, maxPeople] = peopleCounts[people]
  const earlyFee  = earlyMorning ? site.policies.earlyMorningFee : 0
  const travelFee = travelZone === 'peel' ? site.policies.travelPeel
                  : travelZone === 'gta'  ? site.policies.travelGTA
                  : 0

  const minTotal = basePrice * minPeople + earlyFee * minPeople + travelFee
  const maxTotal = basePrice * maxPeople + earlyFee * maxPeople + travelFee

  const formatPrice = (n: number) =>
    n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })

  const totalLabel =
    minPeople === maxPeople
      ? formatPrice(minTotal)
      : `${formatPrice(minTotal)} – ${formatPrice(maxTotal)}`

  return (
    <section className="py-24 px-6 bg-ivory-2">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="Price Estimator"
          title="Estimate your investment"
          subtitle="Get an instant range before booking. No surprises — just transparency."
          centered
        />

        <div className="bg-ivory rounded-2xl border border-ivory-4 p-8 mt-10 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted mb-2">
                Service type
              </label>
              <select
                value={service}
                onChange={(e) => { flagUsed(); setService(e.target.value) }}
                className="w-full border border-ivory-4 rounded-lg px-4 py-3 text-dark bg-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              >
                {Object.entries(serviceLabels).map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-muted mb-2">
                Number of people
              </label>
              <select
                value={people}
                onChange={(e) => { flagUsed(); setPeople(e.target.value) }}
                className="w-full border border-ivory-4 rounded-lg px-4 py-3 text-dark bg-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <option value="1">1 person</option>
                <option value="2-3">2–3 people</option>
                <option value="4-6">4–6 people</option>
                <option value="7+">7+ people</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-muted mb-3">
                Travel zone
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'none', label: 'Studio / No travel' },
                  { key: 'peel', label: `Peel Region (+$${site.policies.travelPeel})` },
                  { key: 'gta',  label: `Greater GTA (+up to $${site.policies.travelGTA})` },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => { flagUsed(); setTravelZone(key as typeof travelZone) }}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      travelZone === key
                        ? 'bg-gold text-ivory border-gold'
                        : 'border-ivory-4 text-muted hover:border-gold'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <button
                onClick={() => { flagUsed(); setEarlyMorning(!earlyMorning) }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-colors w-full ${
                  earlyMorning
                    ? 'bg-gold-pale border-gold text-gold-dim'
                    : 'border-ivory-4 text-muted hover:border-gold'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    earlyMorning ? 'bg-gold border-gold' : 'border-muted-2'
                  }`}
                >
                  {earlyMorning && <span className="text-ivory text-xs font-bold">✓</span>}
                </span>
                Early morning start ({site.policies.earlyMorningThreshold}) — +${site.policies.earlyMorningFee}/person
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-ivory-4 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-1">Estimated total</p>
              <p className="font-serif text-4xl text-dark">{totalLabel}</p>
              <p className="text-xs text-muted mt-1">
                Final quote confirmed after consultation
              </p>
            </div>
            <Button href="/contact" size="lg">
              Get exact quote →
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
