import { NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    const serviceType = formData.get('serviceType') as 'ilaclama' | 'peyzaj'
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const imageWidth = formData.get('imageWidth') as string
    const imageHeight = formData.get('imageHeight') as string
    const image = formData.get('image') as File

    // Görsel dosyasını kaydet
    if (image) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const timestamp = Date.now()
      const originalName = image.name
      const fileName = `${timestamp}-${originalName}`
      
      // Görseli kaydet
      const imagePath = path.join(process.cwd(), 'public', 'images', 'services', fileName)
      await writeFile(imagePath, buffer)

      // JSON dosyasını oku
      const servicesPath = path.join(process.cwd(), 'src', 'data', 'services.json')
      const servicesData = JSON.parse(await readFile(servicesPath, 'utf8'))

      // Yeni hizmeti ekle
      const newService = {
        id: id || String(timestamp),
        title,
        description,
        image: `/images/services/${fileName}`,
        imageWidth,
        imageHeight
      }

      if (id) {
        // Mevcut hizmeti güncelle
        const index = servicesData[serviceType].items.findIndex((item: any) => item.id === id)
        if (index !== -1) {
          servicesData[serviceType].items[index] = newService
        }
      } else {
        // Yeni hizmet ekle
        servicesData[serviceType].items.push(newService)
      }

      // JSON dosyasını güncelle
      await writeFile(servicesPath, JSON.stringify(servicesData, null, 2))
      
      return NextResponse.json({
        success: true,
        data: newService
      })
    }

    return NextResponse.json({
      success: false,
      error: 'No image provided'
    }, { status: 400 })

  } catch (error) {
    console.error('Error saving service:', error)
    return NextResponse.json({
      success: false,
      error: 'Server error'
    }, { status: 500 })
  }
}

// Servisleri getirmek için yeni endpoint
export async function GET() {
  try {
    const servicesPath = path.join(process.cwd(), 'src', 'data', 'services.json')
    const servicesData = JSON.parse(await readFile(servicesPath, 'utf8'))
    
    return NextResponse.json(servicesData)
  } catch (error) {
    return NextResponse.json({
      error: 'Error loading services'
    }, { status: 500 })
  }
} 