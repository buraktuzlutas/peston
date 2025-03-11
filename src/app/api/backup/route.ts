import { NextResponse } from 'next/server'
import { createBackup } from '@/utils/backup'

export async function POST() {
  try {
    const result = await createBackup()
    
    if (result.success) {
      return NextResponse.json({ success: true, path: result.path })
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Backup failed' },
      { status: 500 }
    )
  }
} 