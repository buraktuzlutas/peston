import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { services } from '@/data/services'

export const metadata: Metadata = {
  title: 'Hizmetlerimiz | İlaçlama ve Peyzaj',
  description: 'Profesyonel ilaçlama ve peyzaj hizmetlerimiz hakkında detaylı bilgi alın.',
}

export default function Hizmetler() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <div className="bg-emerald-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Hizmetlerimiz</h1>
          <p className="text-xl text-center text-gray-600">
            Profesyonel ilaçlama ve peyzaj çözümleri ile hizmetinizdeyiz
          </p>
        </div>
      </div>

      {/* İlaçlama Hizmetleri */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{services.ilaclama.title}</h2>
            <p className="text-gray-600">{services.ilaclama.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.ilaclama.items.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link 
                    href={`/hizmetler/ilaclama/${service.id}`}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Detaylı Bilgi →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Peyzaj Hizmetleri */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{services.peyzaj.title}</h2>
            <p className="text-gray-600">{services.peyzaj.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.peyzaj.items.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link 
                    href={`/hizmetler/peyzaj/${service.id}`}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Detaylı Bilgi →
                  </Link>
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
            Profesyonel Hizmet için Bize Ulaşın
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