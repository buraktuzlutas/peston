"use client"
import Image from 'next/image'
import { X } from 'lucide-react'

interface Props {
  post: {
    title: string
    excerpt: string
    content: string
    image: string
    date: string
  }
  onClose: () => void
}

export function BlogPreviewModal({ post, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Önizleme</h2>
          <button onClick={onClose} className="p-2 hover:text-red-600">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="relative aspect-[16/9] mb-6">
            <Image
              src={post.image || '/images/placeholder.jpg'}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600 mb-4">
            {new Date(post.date).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  )
} 