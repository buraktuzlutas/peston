"use client"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceSchema, ServiceFormData } from '@/lib/validations/service'
import { notify } from '@/utils/notifications'
import { Plus, Trash2, GripVertical, Loader2, RotateCcw } from 'lucide-react'
import { DraggableContent } from '../DraggableContent'
import { ImageUpload } from '@/components/ui/ImageUpload'

interface Props {
  data: ServiceFormData
  onSave: (data: ServiceFormData) => Promise<void>
}

export default function ServicesContent({ data, onSave }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const defaultValues = {
    hero: {
      title: '',
      description: '',
      image: ''
    },
    categories: [],
    pestTypes: [],
    process: {
      title: '',
      steps: []
    },
    features: {
      title: '',
      items: []
    },
    serviceTypes: [],
    ...data // Varolan datayı defaultValues ile birleştir
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues
  })

  const onSubmit = async (formData: ServiceFormData) => {
    try {
      setIsSubmitting(true)
      await onSave(formData)
      notify.success('Değişiklikler kaydedildi')
    } catch (error) {
      notify.error('Bir hata oluştu')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    if (window.confirm('Tüm değişiklikler silinecek. Emin misiniz?')) {
      reset(data)
      notify.info('Form sıfırlandı')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Form Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold">İlaçlama Hizmetleri</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={!isDirty || isSubmitting}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw size={16} />
            Sıfırla
          </button>
          <button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Kaydediliyor...
              </>
            ) : (
              'Değişiklikleri Kaydet'
            )}
          </button>
        </div>
      </div>

      {/* Form Sections */}
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-6">Hero Bölümü</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Başlık</label>
              <input
                {...register('hero.title')}
                className="w-full rounded-md border-gray-300"
              />
              {errors.hero?.title && (
                <p className="text-sm text-red-600 mt-1">{errors.hero.title.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Açıklama</label>
              <textarea
                {...register('hero.description')}
                rows={3}
                className="w-full rounded-md border-gray-300"
              />
              {errors.hero?.description && (
                <p className="text-sm text-red-600 mt-1">{errors.hero.description.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Arka Plan Görseli</label>
              <ImageUpload
                currentImage={watch('hero.image')}
                onUpload={(url) => setValue('hero.image', url)}
              />
            </div>
          </div>
        </div>

        {/* Service Categories */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Hizmet Kategorileri</h2>
            <button
              type="button"
              onClick={() => {
                const newCategory = {
                  id: Date.now().toString(),
                  title: '',
                  description: '',
                  icon: ''
                }
                setValue('categories', [...watch('categories'), newCategory])
              }}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100"
            >
              <Plus size={16} />
              Yeni Kategori Ekle
            </button>
          </div>

          <DraggableContent
            items={watch('categories')}
            onDragEnd={(result) => {
              if (!result.destination) return
              
              const items = Array.from(watch('categories'))
              const [reorderedItem] = items.splice(result.source.index, 1)
              items.splice(result.destination.index, 0, reorderedItem)

              setValue('categories', items)
            }}
            renderItem={(category, index, provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <div {...provided.dragHandleProps} className="cursor-move text-gray-400 hover:text-gray-600">
                    <GripVertical size={20} />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newCategories = watch('categories').filter((_, i) => i !== index)
                      setValue('categories', newCategories)
                    }}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Başlık</label>
                    <input
                      type="text"
                      value={category.title}
                      onChange={(e) => {
                        const newCategories = [...watch('categories')]
                        newCategories[index] = { ...category, title: e.target.value }
                        setValue('categories', newCategories)
                      }}
                      className="w-full rounded-md border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Açıklama</label>
                    <textarea
                      value={category.description}
                      onChange={(e) => {
                        const newCategories = [...watch('categories')]
                        newCategories[index] = { ...category, description: e.target.value }
                        setValue('categories', newCategories)
                      }}
                      rows={2}
                      className="w-full rounded-md border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">İkon</label>
                    <input
                      type="text"
                      value={category.icon || ''}
                      onChange={(e) => {
                        const newCategories = [...watch('categories')]
                        newCategories[index] = { ...category, icon: e.target.value }
                        setValue('categories', newCategories)
                      }}
                      className="w-full rounded-md border-gray-300"
                      placeholder="Emoji veya ikon kodu"
                    />
                  </div>
                </div>
              </div>
            )}
          />
        </div>

        {/* Pest Types */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          {/* Zararlı türleri yönetimi */}
        </div>

        {/* Process Steps */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          {/* Süreç adımları yönetimi */}
        </div>

        {/* Features */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          {/* Özellikler yönetimi */}
        </div>

        {/* Hizmet Türleri */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Hizmet Türleri</h2>
            <button
              type="button"
              onClick={() => {
                const newService = {
                  id: Date.now().toString(),
                  title: '',
                  description: '',
                  image: '',
                  slug: '',
                  faqs: [],
                  faqCategories: []
                }
                setValue('serviceTypes', [...watch('serviceTypes'), newService])
              }}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100"
            >
              <Plus size={16} />
              Yeni Hizmet Ekle
            </button>
          </div>

          <DraggableContent
            items={watch('serviceTypes')}
            onDragEnd={(result) => {
              if (!result.destination) return
              
              const items = Array.from(watch('serviceTypes'))
              const [reorderedItem] = items.splice(result.source.index, 1)
              items.splice(result.destination.index, 0, reorderedItem)

              setValue('serviceTypes', items)
            }}
            renderItem={(service, index, provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <div {...provided.dragHandleProps} className="cursor-move text-gray-400 hover:text-gray-600">
                    <GripVertical size={20} />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newServices = watch('serviceTypes').filter((_, i) => i !== index)
                      setValue('serviceTypes', newServices)
                    }}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Başlık</label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => {
                        const newServices = [...watch('serviceTypes')]
                        newServices[index] = { 
                          ...service, 
                          title: e.target.value,
                          slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                        }
                        setValue('serviceTypes', newServices)
                      }}
                      className="w-full rounded-md border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Açıklama</label>
                    <textarea
                      value={service.description}
                      onChange={(e) => {
                        const newServices = [...watch('serviceTypes')]
                        newServices[index] = { ...service, description: e.target.value }
                        setValue('serviceTypes', newServices)
                      }}
                      rows={3}
                      className="w-full rounded-md border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Görsel</label>
                    <ImageUpload
                      currentImage={service.image}
                      onUpload={(url) => {
                        const newServices = [...watch('serviceTypes')]
                        newServices[index] = { ...service, image: url }
                        setValue('serviceTypes', newServices)
                      }}
                    />
                  </div>

                  {/* SSS Yönetimi */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-medium">SSS Kategorileri</label>
                      <button
                        type="button"
                        onClick={() => {
                          const newCategory = {
                            id: Date.now().toString(),
                            title: '',
                            faqs: []
                          }
                          const currentCategories = watch(`serviceTypes.${index}.faqCategories`) || []
                          setValue(`serviceTypes.${index}.faqCategories`, [...currentCategories, newCategory])
                        }}
                        className="text-sm text-emerald-600 hover:text-emerald-700"
                      >
                        + Yeni Kategori Ekle
                      </button>
                    </div>

                    {(service.faqCategories || []).map((category, categoryIndex) => (
                      <div key={category.id} className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <input
                            type="text"
                            value={category.title}
                            onChange={(e) => {
                              const newCategories = [...(watch(`serviceTypes.${index}.faqCategories`) || [])]
                              newCategories[categoryIndex] = { ...category, title: e.target.value }
                              setValue(`serviceTypes.${index}.faqCategories`, newCategories)
                            }}
                            placeholder="Kategori başlığı"
                            className="flex-1 mr-4 px-3 py-2 border rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newCategories = watch(`serviceTypes.${index}.faqCategories`).filter((_, i) => i !== categoryIndex)
                              setValue(`serviceTypes.${index}.faqCategories`, newCategories)
                            }}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Kategori içindeki SSS'ler */}
                        <div className="pl-4 border-l-2 border-gray-200">
                          <div className="flex justify-end mb-2">
                            <button
                              type="button"
                              onClick={() => {
                                const newFaq = {
                                  id: Date.now().toString(),
                                  question: '',
                                  answer: ''
                                }
                                const currentFaqs = watch(`serviceTypes.${index}.faqCategories.${categoryIndex}.faqs`) || []
                                setValue(`serviceTypes.${index}.faqCategories.${categoryIndex}.faqs`, [...currentFaqs, newFaq])
                              }}
                              className="text-sm text-emerald-600 hover:text-emerald-700"
                            >
                              + Yeni Soru Ekle
                            </button>
                          </div>

                          {/* SSS Listesi */}
                          {(category.faqs || []).map((faq, faqIndex) => (
                            <div key={faq.id} className="bg-gray-50 p-4 rounded-md mb-4">
                              <div className="flex justify-end mb-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newFaqs = (watch(`serviceTypes.${index}.faqCategories.${categoryIndex}.faqs`) || [])
                                      .filter((_, i) => i !== faqIndex)
                                    setValue(`serviceTypes.${index}.faqCategories.${categoryIndex}.faqs`, newFaqs)
                                  }}
                                  className="text-gray-400 hover:text-red-600"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium mb-1">Soru</label>
                                  <input
                                    type="text"
                                    value={faq.question}
                                    onChange={(e) => {
                                      const newFaqs = [...(watch(`serviceTypes.${index}.faqCategories.${categoryIndex}.faqs`) || [])]
                                      newFaqs[faqIndex] = { ...faq, question: e.target.value }
                                      setValue(`serviceTypes.${index}.faqCategories.${categoryIndex}.faqs`, newFaqs)
                                    }}
                                    className="w-full rounded-md border-gray-300"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1">Cevap</label>
                                  <textarea
                                    value={faq.answer}
                                    onChange={(e) => {
                                      const newFaqs = [...(watch(`serviceTypes.${index}.faqCategories.${categoryIndex}.faqs`) || [])]
                                      newFaqs[faqIndex] = { ...faq, answer: e.target.value }
                                      setValue(`serviceTypes.${index}.faqCategories.${categoryIndex}.faqs`, newFaqs)
                                    }}
                                    rows={3}
                                    className="w-full rounded-md border-gray-300"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* Form Footer */}
      {isDirty && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-end gap-2">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              <RotateCcw size={16} />
              Sıfırla
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                'Değişiklikleri Kaydet'
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  )
} 