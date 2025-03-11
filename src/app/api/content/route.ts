import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

const contentPath = path.join(process.cwd(), 'src/data/site-content.json')

export async function GET() {
  try {
    const content = await readFile(contentPath, 'utf8')
    return NextResponse.json(JSON.parse(content))
  } catch (error) {
    console.error('Error reading content:', error)
    return NextResponse.json(
      { error: 'Failed to read content' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { section, data } = await request.json()
    const content = JSON.parse(await readFile(contentPath, 'utf8'))
    
    content[section] = data
    await writeFile(contentPath, JSON.stringify(content, null, 2))
    
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    )
  }
} 