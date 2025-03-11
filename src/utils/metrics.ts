import { MetricsLogger } from '@/lib/metrics'

const metrics = new MetricsLogger()

export function logMetric(name: string, value: number) {
  metrics.log(name, value)
}

export function trackPageLoad() {
  if (typeof window !== 'undefined') {
    const navigationStart = performance.timing.navigationStart
    const loadTime = Date.now() - navigationStart

    logMetric('page_load', loadTime)
  }
} 