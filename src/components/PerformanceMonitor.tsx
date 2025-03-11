'use client'

import { useEffect } from 'react'
import { trackPageLoad } from '@/utils/metrics'

export function PerformanceMonitor() {
  useEffect(() => {
    trackPageLoad()
  }, [])

  return null
} 