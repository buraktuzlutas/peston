import { getContent } from '@/utils/content'
import ContactForm from './ContactForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim | Peston',
  description: 'Peston ile iletişime geçin. Profesyonel ilaçlama ve peyzaj hizmetleri için bize ulaşın.',
  openGraph: {
    title: 'İletişim | Peston',
    description: 'Peston ile iletişime geçin. Profesyonel ilaçlama ve peyzaj hizmetleri için bize ulaşın.',
    type: 'website',
  }
}

export default async function Iletisim() {
  const content = await getContent()
  const { contact, general } = content || {}

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{contact?.title}</h1>
        <p className="text-xl text-gray-600 mb-12">{contact?.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Adres</h3>
                <p className="text-gray-600">{general?.address}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">İletişim</h3>
                <p className="text-gray-600">
                  Telefon: {general?.phone}<br />
                  E-posta: {general?.email}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Çalışma Saatleri</h3>
                <p className="text-gray-600">
                  Hafta içi: {contact?.workingHours.weekday}<br />
                  Hafta sonu: {contact?.workingHours.weekend}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Bize Ulaşın</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
} 