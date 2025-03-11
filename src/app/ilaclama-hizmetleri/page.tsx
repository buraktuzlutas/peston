import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Loading } from '@/components/ui/Loading'
import { getContent } from '@/utils/content'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'İlaçlama Hizmetleri | Peston',
  description: 'Profesyonel ilaçlama hizmetlerimiz ile yaşam alanlarınızı zararlılardan koruyoruz.',
  openGraph: {
    title: 'İlaçlama Hizmetleri | Peston',
    description: 'Profesyonel ilaçlama hizmetlerimiz ile yaşam alanlarınızı zararlılardan koruyoruz.',
    type: 'website',
    images: ['/images/services/ilaclama.jpg'],
  }
}

// Interface tanımlaması ekleyelim
interface ServiceType {
  id: string
  slug: string
  title: string
  description: string
  image: string
}

async function PestControlContent() {
  const content = await getContent()
  const { services } = content

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {services.ilaclama.hero.title}
        </h1>
        <p className="text-xl text-gray-600">
          {services.ilaclama.hero.description}
        </p>
      </div>

      {/* Hizmet Türleri Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.ilaclama.serviceTypes.map((service: ServiceType) => (
          <Link 
            key={service.id} 
            href={`/ilaclama-hizmetleri/${service.slug}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 group-hover:text-emerald-600 transition-colors">
                  {service.title}
                </h2>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function PestControlPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <PestControlContent />
      </Suspense>
    </ErrorBoundary>
  )
} 