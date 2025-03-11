import { readFileSync } from 'fs'
import path from 'path'

export async function getContent() {
  try {
    // Server-side'da doğrudan dosyadan oku
    if (typeof window === 'undefined') {
      const contentPath = path.join(process.cwd(), 'src/data/site-content.json')
      const content = readFileSync(contentPath, 'utf8')
      return JSON.parse(content)
    }
    
    // Client-side'da API'den al
    const response = await fetch('/api/content')
    if (!response.ok) throw new Error('Failed to fetch content')
    return await response.json()
  } catch (error) {
    console.error('Error fetching content:', error)
    return {
      general: {
        logo: '',
        companyName: '',
        phone: '',
        email: '',
        address: '',
        socialMedia: {
          facebook: '',
          instagram: '',
          twitter: ''
        }
      },
      homepage: {
        hero: { title: '', description: '', image: '' },
        features: [],
        sections: []
      },
      services: {
        ilaclama: { title: '', description: '', items: [] },
        peyzaj: { title: '', description: '', items: [] }
      },
      about: {
        title: '',
        content: '',
        vision: '',
        mission: '',
        team: []
      },
      contact: {
        title: '',
        description: '',
        address: '',
        phone: '',
        email: '',
        workingHours: {
          weekday: '',
          weekend: ''
        },
        socialMedia: {
          facebook: '',
          instagram: '',
          twitter: ''
        }
      }
    }
  }
} 