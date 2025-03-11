"use client"

import { useState, useRef } from 'react'
import Image from 'next/image'

interface ServiceEditModalProps {
  service: any
  onClose: () => void
  onSave: (service: any) => void
}

export default function ServiceEditModal({ service, onClose, onSave }: ServiceEditModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    id: service.id || '',
    title: service.title || '',
    description: service.description || '',
    image: service.image || '',
    imageWidth: service.imageWidth || '800',
    imageHeight: service.imageHeight || '600'
  })
  const [imagePreview, setImagePreview] = useState<string>(service.image || '')

  const imageSizePresets = [
    { width: '800', height: '600', label: 'Geniş (800x600)' },
    { width: '400', height: '300', label: 'Orta (400x300)' },
    { width: '200', height: '200', label: 'Kare (200x200)' }
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Dosyayı URL'e çevir
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
      setFormData(prev => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const submitData = new FormData()
    submitData.append('serviceType', service.serviceType || 'ilaclama')
    submitData.append('id', formData.id)
    submitData.append('title', formData.title)
    submitData.append('description', formData.description)
    submitData.append('imageWidth', formData.imageWidth)
    submitData.append('imageHeight', formData.imageHeight)
    
    if (formData.image instanceof File) {
      submitData.append('image', formData.image)
    }

    onSave(submitData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {service.id ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Başlık
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Açıklama
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border rounded-md"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Görsel
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              >
                Görsel Seç
              </button>
              <span className="text-sm text-gray-500">
                {formData.image instanceof File ? formData.image.name : 'Görsel seçilmedi'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Hazır Boyutlar
            </label>
            <div className="flex gap-2">
              {imageSizePresets.map((preset) => (
                <button
                  key={`${preset.width}x${preset.height}`}
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    imageWidth: preset.width,
                    imageHeight: preset.height
                  }))}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Görsel Genişliği (px)
              </label>
              <input
                type="number"
                value={formData.imageWidth}
                onChange={(e) => setFormData(prev => ({ ...prev, imageWidth: e.target.value }))}
                className="w-full p-2 border rounded-md"
                min="100"
                step="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Görsel Yüksekliği (px)
              </label>
              <input
                type="number"
                value={formData.imageHeight}
                onChange={(e) => setFormData(prev => ({ ...prev, imageHeight: e.target.value }))}
                className="w-full p-2 border rounded-md"
                min="100"
                step="10"
              />
            </div>
          </div>

          {imagePreview && (
            <div 
              className="relative bg-gray-100 rounded-md overflow-hidden"
              style={{
                width: `${formData.imageWidth}px`,
                height: `${formData.imageHeight}px`,
                maxWidth: '100%',
                margin: '0 auto'
              }}
            >
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                style={{ 
                  objectFit: 'cover'
                }}
              />
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 