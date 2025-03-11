"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ImageUpload } from '../ui/ImageUpload'

export default function MediaLibrary() {
  const [media, setMedia] = useState<any[]>([])
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const loadMedia = async () => {
    try {
      const response = await fetch('/api/media')
      if (response.ok) {
        const data = await response.json()
        setMedia(data)
      }
    } catch (error) {
      console.error('Error loading media:', error)
    }
  }

  useEffect(() => {
    loadMedia()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Medya Kütüphanesi</h3>
        <ImageUpload
          onUpload={(url) => {
            setMedia([...media, { url, date: new Date().toISOString() }])
          }}
          accept="image/*"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {media.map((item, index) => (
          <div
            key={index}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
              selectedMedia === item.url ? 'border-emerald-500' : 'border-transparent'
            }`}
            onClick={() => setSelectedMedia(item.url)}
          >
            <Image
              src={item.url}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <div className="relative aspect-video">
              <Image
                src={selectedMedia}
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedMedia)
                }}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                URL Kopyala
              </button>
              <button
                onClick={() => setSelectedMedia(null)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 