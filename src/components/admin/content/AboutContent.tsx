"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ImageUpload } from '../ui/ImageUpload'
import { notify } from '@/utils/notifications'

interface Props {
  data: any
  onSave: (data: any) => void
}

export default function AboutContent({ data, onSave }: Props) {
  const [formData, setFormData] = useState(data || {
    title: '',
    content: '',
    vision: '',
    mission: '',
    team: []
  })

  useEffect(() => {
    if (data) setFormData(data)
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    notify.success('Değişiklikler kaydedildi')
  }

  const addTeamMember = () => {
    setFormData({
      ...formData,
      team: [
        ...formData.team,
        {
          id: Date.now().toString(),
          name: '',
          position: '',
          image: ''
        }
      ]
    })
  }

  const removeTeamMember = (id: string) => {
    setFormData({
      ...formData,
      team: formData.team.filter((member: any) => member.id !== id)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Genel Bilgiler</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Başlık</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">İçerik</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vizyon</label>
          <textarea
            value={formData.vision}
            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Misyon</label>
          <textarea
            value={formData.mission}
            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Ekip Üyeleri</h2>
          <button
            type="button"
            onClick={addTeamMember}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
          >
            Ekip Üyesi Ekle
          </button>
        </div>

        {formData.team.map((member: any, index: number) => (
          <div key={member.id} className="border p-4 rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Ekip Üyesi {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeTeamMember(member.id)}
                className="text-red-600 hover:text-red-700"
              >
                Sil
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => {
                  const newTeam = [...formData.team]
                  newTeam[index] = { ...member, name: e.target.value }
                  setFormData({ ...formData, team: newTeam })
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Pozisyon</label>
              <input
                type="text"
                value={member.position}
                onChange={(e) => {
                  const newTeam = [...formData.team]
                  newTeam[index] = { ...member, position: e.target.value }
                  setFormData({ ...formData, team: newTeam })
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fotoğraf</label>
              <ImageUpload
                currentImage={member.image}
                onUpload={(url) => {
                  const newTeam = [...formData.team]
                  newTeam[index] = { ...member, image: url }
                  setFormData({ ...formData, team: newTeam })
                }}
              />
            </div>
          </div>
        ))}
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