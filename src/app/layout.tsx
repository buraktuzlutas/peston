import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@/components/Analytics'
import { defaultMetadata } from './metadata'

const inter = Inter({ subsets: ['latin'] })

export const metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
        <Toaster position="top-right" />
      </body>
    </html>
  )
} 