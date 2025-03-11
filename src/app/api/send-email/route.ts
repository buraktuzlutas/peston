import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Email transport konfigürasyonu
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    // Email içeriği oluşturma
    const mekanTipi = {
      konut: 'Konut',
      ofis: 'Ofis',
      apartman: 'Apartman',
      site: 'Site',
      bahce: 'Bahçe - Arazi',
      depo: 'Depo - Sığınak - Otopark',
      kafe: 'Kafe ve Restoran'
    }[formData.mekanTipi]

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'buraktuzlutas@gmail.com',
      subject: 'Yeni İlaçlama Teklif Talebi',
      html: `
        <h2>İlaçlama Teklif Talebi</h2>
        
        <h3>Mekan Bilgileri</h3>
        <p>Mekan Tipi: ${mekanTipi}</p>
        <p>Alan: ${formData.alan} m²</p>
        ${formData.mekanTipi === 'apartman' ? `
          <p>Kat Sayısı: ${formData.katSayisi}</p>
          <p>Daire Sayısı: ${formData.daireSayisi}</p>
        ` : ''}

        <h3>Konum Bilgileri</h3>
        <p>Şehir: ${formData.sehir}</p>
        <p>İlçe: ${formData.ilce}</p>

        <h3>İşlem Detayları</h3>
        <p>Haşere Türü: ${formData.hasereTuru}</p>
        <p>Periyodik İşlem: ${formData.periyodik ? 'Evet' : 'Hayır'}</p>

        <h3>Randevu Bilgileri</h3>
        <p>Tarih: ${formData.randevuTarihi}</p>
        <p>Saat: ${formData.randevuSaati}</p>

        <h3>İndirim Bilgileri</h3>
        ${formData.indirimTipi ? `<p>İndirim Türü: ${formData.indirimTipi}</p>` : ''}
        ${formData.periyodik ? '<p>Periyodik İşlem İndirimi: %8</p>' : ''}

        ${formData.eskiMusteri ? `
          <h3>Eski Müşteri Bilgileri</h3>
          <p>Telefon: ${formData.musteriTel}</p>
        ` : ''}
      `
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email gönderme hatası:', error)
    return NextResponse.json({ error: 'Email gönderilemedi' }, { status: 500 })
  }
} 