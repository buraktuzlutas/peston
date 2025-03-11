import { NextResponse } from 'next/server'
import { sendEmail } from '@/utils/email'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // E-posta gönderme
    await sendEmail({
      to: process.env.CONTACT_EMAIL || 'info@peston.com',
      subject: 'Yeni İletişim Formu Mesajı',
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>Ad Soyad:</strong> ${data.name}</p>
        <p><strong>E-posta:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Telefon:</strong> ${data.phone}</p>` : ''}
        <p><strong>Mesaj:</strong></p>
        <p>${data.message}</p>
      `
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Error sending message' },
      { status: 500 }
    )
  }
} 