"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ImageUpload } from '../ui/ImageUpload'

interface Props {
  data: any
  onSave: (data: any) => void
}

export default function GeneralSettings({ data, onSave }: Props) {
  const [formData, setFormData] = useState(data || {
    logo: '',
    companyName: '',
    phone: '',
    email: '',
    address: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: ''
    }
  })

  useEffect(() => {
    if (data) setFormData(data)
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Logo</label>
        <div className="mt-1 flex items-center space-x-4">
          {formData.logo && (
            <div className="relative w-32 h-32">
              <Image
                src={formData.logo}
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          )}
          <ImageUpload
            onUpload={(url) => setFormData({ ...formData, logo: url })}
            accept="image/*"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Şirket Adı
        </label>
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>

      {/* Diğer form alanları */}

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Kaydet
          </button>
        </div>
      </div>
    </form>
  )
} 