import { NextResponse } from 'next/server'
import { writeFile, readFile, readdir, stat } from 'fs/promises'
import path from 'path'

const mediaDir = path.join(process.cwd(), 'public', 'images')

export async function GET() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    const files = await readdir(uploadsDir)

    const mediaItems = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(uploadsDir, file)
        const stats = await stat(filePath)

        return {
          id: file,
          url: `/uploads/${file}`,
          name: file,
          type: getFileType(file),
          size: stats.size,
          createdAt: stats.birthtime.toISOString()
        }
      })
    )

    return NextResponse.json(mediaItems)
  } catch (error) {
    console.error('Error reading media:', error)
    return NextResponse.json(
      { error: 'Failed to read media' },
      { status: 500 }
    )
  }
}

function getFileType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  const documentExts = ['.pdf', '.doc', '.docx']

  if (imageExts.includes(ext)) return 'image'
  if (documentExts.includes(ext)) return 'document'
  return 'other'
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const fileName = `${Date.now()}-${file.name}`
    const filePath = path.join(mediaDir, fileName)
    
    await writeFile(filePath, buffer)
    
    return NextResponse.json({
      url: `/images/${fileName}`
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
  }
} 