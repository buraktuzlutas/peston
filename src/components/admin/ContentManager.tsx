"use client"
import { useState, useEffect } from 'react'
import { notify } from '@/utils/notifications'
import Image from 'next/image'
import GeneralSettings from './content/GeneralSettings'
import HomepageContent from './content/HomepageContent'
import AboutContent from './content/AboutContent'
import ContactContent from './content/ContactContent'
import MediaLibrary from './content/MediaLibrary'

export default function ContentManager() {
  const [activeSection, setActiveSection] = useState('general')
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const response = await fetch('/api/content')
      if (response.ok) {
        const data = await response.json()
        setContent(data)
      }
    } catch (error) {
      notify.error('İçerik yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (section: string, data: any) => {
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          section,
          data
        })
      })

      if (response.ok) {
        notify.success('Değişiklikler kaydedildi')
        loadContent()
      } else {
        notify.error('Kaydetme sırasında hata oluştu')
      }
    } catch (error) {
      notify.error('Kaydetme sırasında hata oluştu')
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings data={content?.general} onSave={(data) => handleSave('general', data)} />
      case 'homepage':
        return <HomepageContent data={content?.homepage} onSave={(data) => handleSave('homepage', data)} />
      case 'about':
        return <AboutContent data={content?.about} onSave={(data) => handleSave('about', data)} />
      case 'contact':
        return <ContactContent data={content?.contact} onSave={(data) => handleSave('contact', data)} />
      case 'media':
        return <MediaLibrary />
      default:
        return null
    }
  }

  if (loading) return <div>Yükleniyor...</div>

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveSection('general')}
          className={`px-4 py-2 ${
            activeSection === 'general' ? 'border-b-2 border-emerald-500' : ''
          }`}
        >
          Genel Ayarlar
        </button>
        <button
          onClick={() => setActiveSection('homepage')}
          className={`px-4 py-2 ${
            activeSection === 'homepage' ? 'border-b-2 border-emerald-500' : ''
          }`}
        >
          Ana Sayfa
        </button>
        <button
          onClick={() => setActiveSection('about')}
          className={`px-4 py-2 ${
            activeSection === 'about' ? 'border-b-2 border-emerald-500' : ''
          }`}
        >
          Hakkımızda
        </button>
        <button
          onClick={() => setActiveSection('contact')}
          className={`px-4 py-2 ${
            activeSection === 'contact' ? 'border-b-2 border-emerald-500' : ''
          }`}
        >
          İletişim
        </button>
        <button
          onClick={() => setActiveSection('media')}
          className={`px-4 py-2 ${
            activeSection === 'media' ? 'border-b-2 border-emerald-500' : ''
          }`}
        >
          Medya
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {renderContent()}
      </div>
    </div>
  )
} 