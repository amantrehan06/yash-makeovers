// Thin wrapper around GA4 events. Safe to call from any client component —
// if GA isn't loaded yet (or NEXT_PUBLIC_GA_ID isn't set), the call is a no-op.

import { sendGAEvent } from '@next/third-parties/google'

// Canonical event names used across the site. Keep this list narrow so
// reports in GA stay clean.
export type AnalyticsEvent =
  | 'inquiry_form_started'
  | 'inquiry_form_completed'
  | 'whatsapp_clicked'
  | 'portfolio_filtered'
  | 'estimator_used'

export function trackEvent(
  event: AnalyticsEvent,
  params: Record<string, string | number | boolean> = {}
): void {
  if (typeof window === 'undefined') return
  if (!process.env.NEXT_PUBLIC_GA_ID) return

  try {
    sendGAEvent({ event, ...params })
  } catch {
    // GA not loaded yet, or blocked by a content blocker — silently no-op.
  }
}
