"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { X, Search, FolderPlus, Trash2 } from 'lucide-react'

interface MediaItem {
  id: string
  url: string
  name: string
  type: string
  size: number
  createdAt: string
}

interface Props {
  onSelect: (url: string) => void
  onClose: () => void
}

export function MediaLibrary({ onSelect, onClose }: Props) {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedFolder, setSelectedFolder] = useState('all')

  // Medya dosyalarını yükle
  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media')
      if (!response.ok) throw new Error('Failed to fetch media')
      const data = await response.json()
      setMedia(data)
    } catch (error) {
      console.error('Error fetching media:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu dosyayı silmek istediğinize emin misiniz?')) return

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete media')
      
      setMedia(media.filter(item => item.id !== id))
    } catch (error) {
      console.error('Error deleting media:', error)
    }
  }

  const filteredMedia = media.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedFolder === 'all' || item.type === selectedFolder)
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Medya Kütüphanesi</h2>
          <button onClick={onClose} className="p-2 hover:text-red-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b flex gap-4">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border-gray-300"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="rounded-md border-gray-300"
            >
              <option value="all">Tüm Dosyalar</option>
              <option value="image">Görseller</option>
              <option value="document">Dökümanlar</option>
            </select>
          </div>
          <ImageUpload
            onUpload={async (url) => {
              await fetchMedia() // Yeni medyayı listele
            }}
          >
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              <FolderPlus size={20} />
              Yeni Ekle
            </button>
          </ImageUpload>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-square rounded-lg overflow-hidden border cursor-pointer"
                  onClick={() => onSelect(item.url)}
                >
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(item.id)
                        }}
                        className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-50 text-white p-2 text-sm truncate">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 