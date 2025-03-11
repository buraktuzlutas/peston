import { z } from 'zod'

export const contactSchema = z.object({
  title: z.string().min(2, 'Başlık en az 2 karakter olmalıdır'),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalıdır'),
  address: z.string().min(10, 'Adres en az 10 karakter olmalıdır'),
  phone: z.string().regex(/^\+?[0-9\s-()]{10,}$/, 'Geçerli bir telefon numarası giriniz'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  workingHours: z.object({
    weekday: z.string().min(5, 'Çalışma saati giriniz'),
    weekend: z.string().min(5, 'Çalışma saati giriniz')
  }),
  socialMedia: z.object({
    facebook: z.string().url('Geçerli bir URL giriniz').optional(),
    instagram: z.string().url('Geçerli bir URL giriniz').optional(),
    twitter: z.string().url('Geçerli bir URL giriniz').optional()
  })
})

export type ContactFormData = z.infer<typeof contactSchema> 