"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ServiceEditModal from './ServiceEditModal'

export default function ServicesManager() {
  const [services, setServices] = useState<any>(null)
  const [editingService, setEditingService] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Servisleri yükle
  const loadServices = async () => {
    try {
      const response = await fetch('/api/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Error loading services:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [])

  const handleSave = async (formData: FormData) => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          alert('Hizmet başarıyla kaydedildi')
          setEditingService(null)
          loadServices() // Servisleri yeniden yükle
        } else {
          alert(result.error || 'Kaydetme sırasında bir hata oluştu')
        }
      } else {
        alert('Kaydetme sırasında bir hata oluştu')
      }
    } catch (error) {
      console.error('Error saving service:', error)
      alert('Kaydetme sırasında bir hata oluştu')
    }
  }

  if (loading) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Hizmet Yönetimi</h2>
        <button
          onClick={() => setEditingService({})}
          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
        >
          Yeni Hizmet Ekle
        </button>
      </div>

      {/* İlaçlama Hizmetleri */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">İlaçlama Hizmetleri</h3>
        <div className="grid grid-cols-1 gap-4">
          {services.ilaclama.items.map((service) => (
            <div
              key={service.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{service.title}</h4>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingService(service)}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Düzenle
                </button>
                <button className="text-red-600 hover:text-red-700">
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Peyzaj Hizmetleri */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Peyzaj Hizmetleri</h3>
        <div className="grid grid-cols-1 gap-4">
          {services.peyzaj.items.map((service) => (
            <div
              key={service.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{service.title}</h4>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingService(service)}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Düzenle
                </button>
                <button className="text-red-600 hover:text-red-700">
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingService && (
        <ServiceEditModal
          service={editingService}
          onClose={() => setEditingService(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
} 