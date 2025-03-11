"use client"
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/validations/contact'
import { notify } from '@/utils/notifications'

interface Props {
  data: any
  onSave: (data: any) => void
}

interface WorkingHours {
  weekday: string
  weekend: string
}

interface ContactData {
  title: string
  description: string
  address: string
  phone: string
  email: string
  workingHours: WorkingHours
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
}

export default function ContactContent({ data, onSave }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: data
  })

  const onSubmit = async (formData: ContactFormData) => {
    try {
      await onSave(formData)
      notify.success('Değişiklikler kaydedildi')
    } catch (error) {
      notify.error('Bir hata oluştu')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">İletişim Bilgileri</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Başlık</label>
          <input
            type="text"
            {...register('title')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Açıklama</label>
          <textarea
            {...register('description')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Adres</label>
          <textarea
            {...register('address')}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefon</label>
          <input
            type="tel"
            {...register('phone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">E-posta</label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Çalışma Saatleri</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Hafta İçi</label>
          <input
            type="text"
            {...register('workingHours.weekday')}
            placeholder="Örn: 09:00 - 18:00"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hafta Sonu</label>
          <input
            type="text"
            {...register('workingHours.weekend')}
            placeholder="Örn: 10:00 - 16:00"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Sosyal Medya</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Facebook</label>
          <input
            type="url"
            {...register('socialMedia.facebook')}
            placeholder="https://facebook.com/..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Instagram</label>
          <input
            type="url"
            {...register('socialMedia.instagram')}
            placeholder="https://instagram.com/..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Twitter</label>
          <input
            type="url"
            {...register('socialMedia.twitter')}
            placeholder="https://twitter.com/..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
        >
          Kaydet
        </button>
      </div>
    </form>
  )
} 