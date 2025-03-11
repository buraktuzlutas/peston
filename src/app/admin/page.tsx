"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { cookies } from 'next/headers'
import ServicesManager from '@/components/admin/ServicesManager'
import RequestsManager from '@/components/admin/RequestsManager'
import ContentManager from '@/components/admin/ContentManager'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HomepageContent from "@/components/admin/content/HomepageContent"
import ServicesContent from "@/components/admin/content/ServicesContent"
import AboutContent from "@/components/admin/content/AboutContent"
import ContactContent from "@/components/admin/content/ContactContent"
import { notify } from '@/utils/notifications'

export default function AdminPage() {
  const [content, setContent] = useState<any>(null)
  const router = useRouter()

  // İçeriği yükle
  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content')
      if (!response.ok) throw new Error('Failed to fetch content')
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error('Error fetching content:', error)
      notify.error('İçerik yüklenirken bir hata oluştu')
    }
  }

  // Component yüklendiğinde içeriği getir
  useEffect(() => {
    fetchContent()
  }, [])

  const handleSave = async (section: string, data: any) => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data })
      })

      if (!response.ok) throw new Error('Failed to save')
      notify.success('Değişiklikler kaydedildi')
      router.refresh() // Sayfayı yenile
    } catch (error) {
      console.error('Save error:', error)
      notify.error('Değişiklikler kaydedilirken bir hata oluştu')
    }
  }

  if (!content) return <div>Loading...</div>

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">İçerik Yönetimi</h1>
      
      <Tabs defaultValue="homepage">
        <TabsList>
          <TabsTrigger value="homepage">Ana Sayfa</TabsTrigger>
          <TabsTrigger value="services">Hizmetler</TabsTrigger>
          <TabsTrigger value="about">Hakkımızda</TabsTrigger>
          <TabsTrigger value="contact">İletişim</TabsTrigger>
        </TabsList>

        <TabsContent value="homepage">
          <HomepageContent 
            data={content.homepage} 
            onSave={(data) => handleSave('homepage', data)} 
          />
        </TabsContent>

        <TabsContent value="services">
          <ServicesContent 
            data={content.services} 
            onSave={(data) => handleSave('services', data)} 
          />
        </TabsContent>

        <TabsContent value="about">
          <AboutContent 
            data={content.about} 
            onSave={(data) => handleSave('about', data)} 
          />
        </TabsContent>

        <TabsContent value="contact">
          <ContactContent 
            data={content.contact} 
            onSave={(data) => handleSave('contact', data)} 
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (response.ok) {
        onLogin()
      } else {
        setError('Kullanıcı adı veya şifre hatalı')
      }
    } catch (error) {
      setError('Bir hata oluştu')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Admin Girişi</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Kullanıcı adı"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Şifre"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Giriş Yap
            </button>
          </div>
        </form>
        {error && (
          <p className="text-red-600 text-center">{error}</p>
        )}
      </div>
    </div>
  )
} 