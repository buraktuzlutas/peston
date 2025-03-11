export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// pageview olayını izle
export const pageview = (url: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID as string, {
      page_path: url,
    })
  }
}

// özel olayları izle
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
} 