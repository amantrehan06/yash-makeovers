'use client'

import { useEffect } from 'react'
import { getOrInitAttribution } from '@/lib/attribution'

// Captures first-touch source on initial load; renders nothing.
export function AttributionCapture() {
  useEffect(() => { getOrInitAttribution() }, [])
  return null
}
