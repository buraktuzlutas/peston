import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://peston.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Peston | İlaçlama ve Peyzaj Hizmetleri',
    template: '%s | Peston'
  },
  description: 'Profesyonel ilaçlama ve peyzaj hizmetleri',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: baseUrl,
    siteName: 'Peston',
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Peston'
      }
    ]
  }
} 