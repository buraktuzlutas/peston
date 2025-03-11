import Image from '@/components/ui/Image'
import Link from 'next/link'
import { getContentCached } from '@/utils/cache'
import { Metadata } from 'next'
import { Star, Phone, CheckCircle2, ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import { Testimonial, BlogPost } from '@/types'

export default async function Home() {
  const content = await getContentCached()
  const { homepage, services } = content

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="relative h-screen">
          <Image
            src={homepage.hero.image}
            alt={homepage.hero.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="max-w-6xl mx-auto px-4 w-full">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  {homepage.hero.title}
                </h1>
                <p className="text-xl text-white mb-8">
                  {homepage.hero.description}
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/teklif-al"
                    className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Teklif Al
                  </Link>
                  <Link
                    href="/iletisim"
                    className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50"
                  >
                    Bize Ulaşın
                  </Link>
                </div>
                
                {/* Reviews Badge */}
                <div className="mt-12 bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg inline-flex items-center gap-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" size={20} />
                    ))}
                  </div>
                  <span className="text-white font-medium">Google'da 5/5 Yıldız</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <AnimatedSection className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Çalışma Sürecimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Keşif',
                description: 'Mekanınızı detaylı şekilde inceleyerek mevcut ve potansiyel zararlı sorunlarını tespit ediyoruz.',
                icon: '🔍'
              },
              {
                title: 'Uygulama',
                description: 'En güvenli ve etkili yöntemlerle ilaçlama işlemini gerçekleştiriyoruz.',
                icon: '🎯'
              },
              {
                title: 'Koruma',
                description: 'Zararlıların tekrar gelmemesi için önleyici tedbirler alıyoruz.',
                icon: '🛡️'
              },
              {
                title: 'Takip',
                description: 'Kritik alanlara özel monitörler yerleştirerek durumu sürekli kontrol ediyoruz.',
                icon: '📊'
              },
              {
                title: 'Raporlama',
                description: 'Yapılan işlemler ve öneriler hakkında detaylı rapor sunuyoruz.',
                icon: '📝'
              },
              {
                title: 'Destek',
                description: 'Düzenli ziyaretler arasında da ihtiyaçlarınıza anında yanıt veriyoruz.',
                icon: '💬'
              }
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-xl">
              <Image
                src={services.ilaclama.items[0]?.image || '/images/placeholder.jpg'}
                alt="İlaçlama Hizmetleri"
                width={600}
                height={400}
                className="w-full h-[300px] object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex items-end p-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">İlaçlama Hizmetleri</h3>
                  <p className="text-white/80 mb-4">{services.ilaclama.description}</p>
                  <Link 
                    href="/ilaclama-hizmetleri"
                    className="inline-flex items-center text-white hover:text-emerald-400"
                  >
                    Detaylı Bilgi
                    <CheckCircle2 className="ml-2" size={16} />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl">
              <Image
                src={services.peyzaj.items[0]?.image || '/images/placeholder.jpg'}
                alt="Peyzaj Hizmetleri"
                width={600}
                height={400}
                className="w-full h-[300px] object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex items-end p-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Peyzaj Hizmetleri</h3>
                  <p className="text-white/80 mb-4">{services.peyzaj.description}</p>
                  <Link 
                    href="/peyzaj-hizmetleri"
                    className="inline-flex items-center text-white hover:text-emerald-400"
                  >
                    Detaylı Bilgi
                    <CheckCircle2 className="ml-2" size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection className="py-24 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">{homepage.stats.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {homepage.stats.items.map((stat: { number: string; label: string; icon: string }, i: number) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-emerald-600 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Müşteri Yorumları</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homepage.testimonials.map((testimonial: Testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} fill="currentColor" size={16} />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Blog Section */}
      <AnimatedSection className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{homepage.blog.title}</h2>
            <p className="text-xl text-gray-600">{homepage.blog.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homepage.blog.posts.map((post: BlogPost) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(post.date).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Tüm Yazılar
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Profesyonel Çözümler İçin Bize Ulaşın
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Ücretsiz keşif ve fiyat teklifi için hemen iletişime geçin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/teklif-al"
              className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50"
            >
              Teklif Al
            </Link>
            <a
              href="tel:+905551234567"
              className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-800"
            >
              <Phone size={20} />
              Hemen Ara
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Peston | Profesyonel İlaçlama ve Peyzaj Hizmetleri',
  description: 'Yaşam alanlarınızı daha sağlıklı ve güzel hale getiriyoruz. Profesyonel ilaçlama ve peyzaj hizmetleri için Peston yanınızda.',
  openGraph: {
    title: 'Peston | Profesyonel İlaçlama ve Peyzaj Hizmetleri',
    description: 'Yaşam alanlarınızı daha sağlıklı ve güzel hale getiriyoruz.',
    type: 'website',
    images: ['/images/og-image.jpg'],
  }
} 