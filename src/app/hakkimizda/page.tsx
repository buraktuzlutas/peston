import Image from 'next/image'
import { getContent } from '@/utils/content'

export default async function Hakkimizda() {
  const content = await getContent()
  const { about } = content

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="bg-emerald-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{about.title}</h1>
          <div className="prose max-w-none">
            <p className="text-xl text-gray-600">{about.content}</p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Vizyonumuz</h2>
              <p className="text-gray-600">{about.vision}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Misyonumuz</h2>
              <p className="text-gray-600">{about.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ekibimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.team.map((member) => (
              <div key={member.id} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 