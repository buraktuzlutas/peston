"use client"
import { Suspense, useState } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Loading } from '@/components/ui/Loading'
import { getContent } from '@/utils/content'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, ChevronDown, Search } from 'lucide-react'

interface Props {
  params: {
    slug: string
  }
}

interface ServiceType {
  slug: string
  title: string
  description: string
  image: string
  faqCategories?: FAQCategory[]
}

interface FAQ {
  id: string
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  title: string
  faqs: FAQ[]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await getContent()
  const service = content.services.ilaclama.serviceTypes.find(
    (s: ServiceType) => s.slug === params.slug
  )

  if (!service) return {}

  return {
    title: `${service.title} | Peston İlaçlama`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Peston İlaçlama`,
      description: service.description,
      images: [service.image],
    },
  }
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronDown
          size={20}
          className={`text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  )
}

function FAQSection({ faqCategories }: { faqCategories: FAQCategory[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredFaqs = faqCategories.flatMap((category: FAQCategory) => 
    category.faqs.filter((faq: FAQ) => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const faqsToShow = activeCategory === 'all' 
    ? filteredFaqs 
    : faqCategories
        .find((c: FAQCategory) => c.id === activeCategory)?.faqs
        .filter((faq: FAQ) => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        ) || []

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-center mb-8">
        Sık Sorulan Sorular
      </h2>

      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Soru ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
          </div>

          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white"
          >
            <option value="all">Tüm Kategoriler</option>
            {faqCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          {faqsToShow.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {faqsToShow.map((faq) => (
                <FAQ
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Aranan kriterlere uygun soru bulunamadı.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

async function ServiceDetailContent({ params }: Props) {
  const content = await getContent()
  const service = content.services.ilaclama.serviceTypes.find(
    (s: ServiceType) => s.slug === params.slug
  )

  if (!service) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link 
          href="/ilaclama-hizmetleri"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
        >
          <ChevronLeft size={16} className="mr-1" />
          Tüm İlaçlama Hizmetleri
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="relative aspect-[4/3] md:aspect-auto">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {service.title}
          </h1>
          <div className="prose prose-emerald max-w-none">
            <p>{service.description}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Neden Profesyonel İlaçlama?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <p>Uzman ekip ve profesyonel ekipmanlar</p>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <p>Sağlık Bakanlığı onaylı ilaçlar</p>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <p>Garantili hizmet</p>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-600 mr-2">•</span>
              <p>7/24 teknik destek</p>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Hizmet Süreci</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">1. Keşif ve İnceleme</h3>
              <p className="text-gray-600">
                Uzman ekibimiz mekanınızı detaylı şekilde inceleyerek zararlı türlerini ve yoğunluğunu tespit eder.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Planlama</h3>
              <p className="text-gray-600">
                İnceleme sonuçlarına göre en uygun ilaçlama yöntemi ve kullanılacak ilaçlar belirlenir.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. Uygulama</h3>
              <p className="text-gray-600">
                Belirlenen plan doğrultusunda profesyonel ekipmanlarla ilaçlama yapılır.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4. Kontrol ve Takip</h3>
              <p className="text-gray-600">
                Uygulama sonrası düzenli kontroller yapılarak sonuçlar takip edilir.
              </p>
            </div>
          </div>
        </div>
      </div>

      {service.faqCategories && service.faqCategories.length > 0 && (
        <FAQSection faqCategories={service.faqCategories} />
      )}

      <div className="bg-emerald-50 p-8 rounded-lg mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Profesyonel İlaçlama Hizmeti Alın
        </h2>
        <p className="text-gray-600 mb-6">
          Zararlılardan kurtulmak için hemen bizimle iletişime geçin.
        </p>
        <Link
          href="/randevu"
          className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-md hover:bg-emerald-700 transition-colors"
        >
          Randevu Al
        </Link>
      </div>
    </div>
  )
}

export default function ServiceDetailPage({ params }: Props) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <ServiceDetailContent params={params} />
      </Suspense>
    </ErrorBoundary>
  )
} 