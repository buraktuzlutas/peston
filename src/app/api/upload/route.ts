import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Dosya adını oluştur
    const timestamp = Date.now()
    const originalName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-')
    const fileName = `${timestamp}-${originalName}`
    
    // Uploads klasörünü oluştur (yoksa)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (error) {
      // Klasör zaten varsa hata verme
    }
    
    // Dosya yolunu oluştur
    const filePath = path.join(uploadsDir, fileName)
    
    // Dosyayı kaydet
    await writeFile(filePath, buffer)
    
    // URL'i döndür
    const url = `/uploads/${fileName}`
    return NextResponse.json({ url })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    )
  }
}

export const config = {
  api: {
    bodyParser: false
  }
} 