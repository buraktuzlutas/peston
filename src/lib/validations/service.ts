import { z } from 'zod'

export const serviceSchema = z.object({
  hero: z.object({
    title: z.string().min(1, 'Başlık gerekli'),
    description: z.string().min(1, 'Açıklama gerekli'),
    image: z.string().optional()
  }),
  categories: z.array(z.object({
    id: z.string(),
    title: z.string().min(1, 'Kategori başlığı gerekli'),
    description: z.string().min(1, 'Kategori açıklaması gerekli'),
    icon: z.string().optional()
  })),
  pestTypes: z.array(z.object({
    id: z.string(),
    title: z.string().min(1, 'Zararlı türü başlığı gerekli'),
    description: z.string().min(1, 'Zararlı türü açıklaması gerekli'),
    icon: z.string().optional()
  })),
  process: z.object({
    title: z.string().min(1, 'Süreç başlığı gerekli'),
    steps: z.array(z.object({
      id: z.string(),
      number: z.number().min(1, 'Adım numarası gerekli'),
      title: z.string().min(1, 'Adım başlığı gerekli'),
      description: z.string().min(1, 'Adım açıklaması gerekli'),
      icon: z.string().optional()
    }))
  }),
  features: z.object({
    title: z.string().min(1, 'Özellikler başlığı gerekli'),
    items: z.array(z.object({
      id: z.string(),
      title: z.string().min(1, 'Özellik başlığı gerekli'),
      description: z.string().min(1, 'Özellik açıklaması gerekli'),
      icon: z.string().optional()
    }))
  }),
  serviceTypes: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1, 'Başlık gerekli'),
      description: z.string().min(1, 'Açıklama gerekli'),
      image: z.string(),
      slug: z.string(),
      faqs: z.array(
        z.object({
          id: z.string(),
          question: z.string().min(1, 'Soru gerekli'),
          answer: z.string().min(1, 'Cevap gerekli')
        })
      ).optional().default([])
    })
  )
})

export type ServiceFormData = z.infer<typeof serviceSchema> 