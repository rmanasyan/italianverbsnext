'use client'

import { useReportWebVitals } from 'next/web-vitals'
// @ts-ignore
import { sendGTMEvent } from '@next/third-parties/google'

export function WebVitals() {
  useReportWebVitals((metric) => {
    sendGTMEvent({
      event: 'web-vitals',
      event_category: 'Web Vitals',
      event_action: metric.name,
      event_value: Math.round(
        metric.name === 'CLS' ? metric.delta * 1000 : metric.delta
      ),
      event_label: metric.id,
    })
  })

  return ''
}
