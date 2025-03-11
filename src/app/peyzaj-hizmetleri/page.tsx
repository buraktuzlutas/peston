import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { getContent } from '@/utils/content'

export const metadata: Metadata = {
  title: 'Peyzaj Hizmetleri | Peston',
  description: 'Modern ve estetik peyzaj çözümleri ile yaşam alanlarınızı güzelleştiriyoruz.',
  openGraph: {
    title: 'Peyzaj Hizmetleri | Peston',
    description: 'Modern ve estetik peyzaj çözümleri ile yaşam alanlarınızı güzelleştiriyoruz.',
    type: 'website',
    images: ['/images/services/peyzaj.jpg'],
  }
}

export default async function PeyzajHizmetleri() {
  const content = await getContent()
  const { services } = content
  const peyzajServices = services.peyzaj

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="bg-emerald-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{peyzajServices.title}</h1>
          <p className="text-xl text-gray-600">{peyzajServices.description}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {peyzajServices.items.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Profesyonel Peyzaj Hizmeti Alın
          </h2>
          <p className="text-xl mb-8">
            Ücretsiz keşif ve fiyat teklifi için hemen iletişime geçin
          </p>
          <Link 
            href="/teklif-al"
            className="bg-white text-emerald-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-colors inline-block"
          >
            Teklif Al
          </Link>
        </div>
      </section>
    </div>
  )
} 