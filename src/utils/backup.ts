import { writeFile, readFile } from 'fs/promises'
import path from 'path'

export async function createBackup() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupDir = path.join(process.cwd(), 'backups')
    
    // site-content.json yedekle
    const contentPath = path.join(process.cwd(), 'src/data/site-content.json')
    const content = await readFile(contentPath, 'utf8')
    
    const backupPath = path.join(backupDir, `site-content-${timestamp}.json`)
    await writeFile(backupPath, content)
    
    return {
      success: true,
      path: backupPath
    }
  } catch (error) {
    console.error('Backup error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
} 