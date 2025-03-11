"use client"
import { useState, useEffect, useCallback } from 'react'
import { ImageUpload } from '../ui/ImageUpload'
import { notify } from '@/utils/notifications'
import { Plus, Trash2, Edit2, MoveUp, MoveDown, Eye } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmojiPicker } from '@/components/ui/EmojiPicker'
import { RichTextEditor } from '@/components/ui/RichTextEditor'
import { BlogPreviewModal } from '@/components/admin/BlogPreviewModal'
import { DraggableContent } from '../DraggableContent'
import { debounce } from 'lodash'
import { SeoSettings } from '@/components/admin/SeoSettings'

interface Feature {
  id: string
  title: string
  description: string
  icon: string
}

interface Section {
  id: string
  title: string
  description: string
  image: string
  link: string
}

interface Props {
  data: {
    hero: {
      title: string
      description: string
      image: string
    }
    features: Feature[]
    sections: Section[]
    stats: {
      title: string
      items: { number: string; label: string; icon: string }[]
    }
  }
  onSave: (data: any) => void
}

export default function HomepageContent({ data, onSave }: Props) {
  const [formData, setFormData] = useState(data)
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null)
  const [editingSection, setEditingSection] = useState<Section | null>(null)
  const [previewPost, setPreviewPost] = useState<any | null>(null)

  // Değişiklikleri otomatik kaydet
  const debouncedSave = useCallback(
    debounce((data) => {
      onSave(data)
      notify.success('Değişiklikler otomatik kaydedildi')
    }, 2000),
    []
  )

  useEffect(() => {
    debouncedSave(formData)
    return () => debouncedSave.cancel()
  }, [formData, debouncedSave])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    notify.success('Değişiklikler kaydedildi')
  }

  const moveItem = (array: any[], fromIndex: number, toIndex: number) => {
    const newArray = [...array]
    const [movedItem] = newArray.splice(fromIndex, 1)
    newArray.splice(toIndex, 0, movedItem)
    return newArray
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="stats">İstatistikler</TabsTrigger>
          <TabsTrigger value="testimonials">Yorumlar</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Hero Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-6">Hero Bölümü</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Başlık</label>
                  <input
                    type="text"
                    value={formData.hero.title}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, title: e.target.value }
                    })}
                    className="w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Açıklama</label>
                  <textarea
                    value={formData.hero.description}
                    onChange={(e) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, description: e.target.value }
                    })}
                    rows={3}
                    className="w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Arka Plan Görseli</label>
                  <ImageUpload
                    currentImage={formData.hero.image}
                    onUpload={(url) => setFormData({
                      ...formData,
                      hero: { ...formData.hero, image: url }
                    })}
                  />
                </div>
              </div>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="stats">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">İstatistikler</h2>
              <button
                type="button"
                onClick={() => {
                  const newStat = {
                    number: '',
                    label: '',
                    icon: ''
                  }
                  setFormData({
                    ...formData,
                    stats: {
                      ...formData.stats,
                      items: [...formData.stats.items, newStat]
                    }
                  })
                }}
                className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100"
              >
                <Plus size={16} />
                Yeni İstatistik Ekle
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Başlık</label>
                <input
                  type="text"
                  value={formData.stats.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, title: e.target.value }
                  })}
                  className="w-full rounded-md border-gray-300"
                />
              </div>

              <div className="space-y-4">
                {formData.stats.items.map((stat, index) => (
                  <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Sayı</label>
                        <input
                          type="text"
                          value={stat.number}
                          onChange={(e) => {
                            const newItems = [...formData.stats.items]
                            newItems[index] = { ...stat, number: e.target.value }
                            setFormData({
                              ...formData,
                              stats: { ...formData.stats, items: newItems }
                            })
                          }}
                          className="w-full rounded-md border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Etiket</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const newItems = [...formData.stats.items]
                            newItems[index] = { ...stat, label: e.target.value }
                            setFormData({
                              ...formData,
                              stats: { ...formData.stats, items: newItems }
                            })
                          }}
                          className="w-full rounded-md border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">İkon</label>
                        <input
                          type="text"
                          value={stat.icon}
                          onChange={(e) => {
                            const newItems = [...formData.stats.items]
                            newItems[index] = { ...stat, icon: e.target.value }
                            setFormData({
                              ...formData,
                              stats: { ...formData.stats, items: newItems }
                            })
                          }}
                          className="w-full rounded-md border-gray-300"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = formData.stats.items.filter((_, i) => i !== index)
                        setFormData({
                          ...formData,
                          stats: { ...formData.stats, items: newItems }
                        })
                      }}
                      className="p-2 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="testimonials">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Müşteri Yorumları</h2>
              <button
                type="button"
                onClick={() => {
                  const newTestimonial = {
                    id: Date.now().toString(),
                    name: '',
                    role: '',
                    comment: '',
                    image: '',
                    rating: 5
                  }
                  setFormData({
                    ...formData,
                    testimonials: [...formData.testimonials, newTestimonial]
                  })
                }}
                className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100"
              >
                <Plus size={16} />
                Yeni Yorum Ekle
              </button>
            </div>

            <div className="space-y-4">
              {formData.testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">İsim</label>
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => {
                          const newTestimonials = [...formData.testimonials]
                          newTestimonials[index] = { ...testimonial, name: e.target.value }
                          setFormData({ ...formData, testimonials: newTestimonials })
                        }}
                        className="w-full rounded-md border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pozisyon</label>
                      <input
                        type="text"
                        value={testimonial.role}
                        onChange={(e) => {
                          const newTestimonials = [...formData.testimonials]
                          newTestimonials[index] = { ...testimonial, role: e.target.value }
                          setFormData({ ...formData, testimonials: newTestimonials })
                        }}
                        className="w-full rounded-md border-gray-300"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Yorum</label>
                      <textarea
                        value={testimonial.comment}
                        onChange={(e) => {
                          const newTestimonials = [...formData.testimonials]
                          newTestimonials[index] = { ...testimonial, comment: e.target.value }
                          setFormData({ ...formData, testimonials: newTestimonials })
                        }}
                        rows={3}
                        className="w-full rounded-md border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Profil Fotoğrafı</label>
                      <ImageUpload
                        currentImage={testimonial.image}
                        onUpload={(url) => {
                          const newTestimonials = [...formData.testimonials]
                          newTestimonials[index] = { ...testimonial, image: url }
                          setFormData({ ...formData, testimonials: newTestimonials })
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Değerlendirme</label>
                      <select
                        value={testimonial.rating}
                        onChange={(e) => {
                          const newTestimonials = [...formData.testimonials]
                          newTestimonials[index] = { ...testimonial, rating: Number(e.target.value) }
                          setFormData({ ...formData, testimonials: newTestimonials })
                        }}
                        className="w-full rounded-md border-gray-300"
                      >
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <option key={rating} value={rating}>{rating} Yıldız</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        const newTestimonials = formData.testimonials.filter((_, i) => i !== index)
                        setFormData({ ...formData, testimonials: newTestimonials })
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="blog">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Blog Yazıları</h2>
              <button
                type="button"
                onClick={() => {
                  const newPost = {
                    id: Date.now().toString(),
                    title: '',
                    excerpt: '',
                    image: '',
                    date: new Date().toISOString().split('T')[0],
                    slug: ''
                  }
                  setFormData({
                    ...formData,
                    blog: {
                      ...formData.blog,
                      posts: [...formData.blog.posts, newPost]
                    }
                  })
                }}
                className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100"
              >
                <Plus size={16} />
                Yeni Yazı Ekle
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Blog Başlığı</label>
                <input
                  type="text"
                  value={formData.blog.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    blog: { ...formData.blog, title: e.target.value }
                  })}
                  className="w-full rounded-md border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Blog Açıklaması</label>
                <input
                  type="text"
                  value={formData.blog.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    blog: { ...formData.blog, description: e.target.value }
                  })}
                  className="w-full rounded-md border-gray-300"
                />
              </div>

              <DraggableContent
                items={formData.blog.posts}
                onDragEnd={(result) => {
                  if (!result.destination) return
                  
                  const items = Array.from(formData.blog.posts)
                  const [reorderedItem] = items.splice(result.source.index, 1)
                  items.splice(result.destination.index, 0, reorderedItem)

                  setFormData({
                    ...formData,
                    blog: { ...formData.blog, posts: items }
                  })
                }}
                renderItem={(post, index, provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div {...provided.dragHandleProps} className="cursor-move">
                        ⋮⋮
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewPost(post)}
                          className="text-gray-600 hover:text-emerald-600"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const newPosts = formData.blog.posts.filter((_, i) => i !== index)
                            setFormData({
                              ...formData,
                              blog: { ...formData.blog, posts: newPosts }
                            })
                          }}
                          className="text-gray-600 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1">İçerik</label>
                      <RichTextEditor
                        value={post.content}
                        onChange={(content) => {
                          const newPosts = [...formData.blog.posts]
                          newPosts[index] = { ...post, content }
                          setFormData({
                            ...formData,
                            blog: { ...formData.blog, posts: newPosts }
                          })
                        }}
                      />
                    </div>

                    <div className="border-t pt-6 mt-6">
                      <h3 className="text-lg font-medium mb-4">SEO Ayarları</h3>
                      <SeoSettings
                        title={post.seo?.title || post.title}
                        description={post.seo?.description || post.excerpt}
                        image={post.seo?.image || post.image}
                        onChange={(seo) => {
                          const newPosts = [...formData.blog.posts]
                          newPosts[index] = { ...post, seo }
                          setFormData({
                            ...formData,
                            blog: { ...formData.blog, posts: newPosts }
                          })
                        }}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>

          {previewPost && (
            <BlogPreviewModal
              post={previewPost}
              onClose={() => setPreviewPost(null)}
            />
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <button
          onClick={() => onSave(formData)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  )
} 