"use client"

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Mesajınız başarıyla gönderildi.')
        setFormData({ name: '', phone: '', message: '' })
      } else {
        throw new Error('Bir hata oluştu')
      }
    } catch (error) {
      alert('Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adınız Soyadınız
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefon
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mesajınız
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full p-2 border rounded-md"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors"
      >
        Gönder
      </button>
    </form>
  )
} 