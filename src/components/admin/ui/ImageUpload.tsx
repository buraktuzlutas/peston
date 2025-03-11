"use client"
import { useState } from 'react'
import Image from 'next/image'

interface Props {
  currentImage?: string
  onUpload: (url: string) => void
}

export function ImageUpload({ currentImage, onUpload }: Props) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Upload failed')

      const { url } = await response.json()
      onUpload(url)
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {currentImage && (
        <div className="relative h-40 w-full">
          <Image
            src={currentImage}
            alt="Preview"
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={isUploading}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-emerald-50 file:text-emerald-700
          hover:file:bg-emerald-100
          disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  )
} 