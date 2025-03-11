"use client"

import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-emerald-600">PESTON</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-700 transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/ilaclama-hizmetleri" className="text-gray-700 hover:text-emerald-700 transition-colors">
              İlaçlama Hizmetleri
            </Link>
            <Link href="/peyzaj-hizmetleri" className="text-gray-700 hover:text-emerald-700 transition-colors">
              Peyzaj Hizmetleri
            </Link>
            <Link href="/hakkimizda" className="text-gray-700 hover:text-emerald-700 transition-colors">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="text-gray-700 hover:text-emerald-700 transition-colors">
              İletişim
            </Link>
            <Link 
              href="/teklif-al" 
              className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors"
            >
              Teklif Al
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
              onClick={() => setIsOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/ilaclama-hizmetleri"
              className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
              onClick={() => setIsOpen(false)}
            >
              İlaçlama Hizmetleri
            </Link>
            <Link
              href="/peyzaj-hizmetleri"
              className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
              onClick={() => setIsOpen(false)}
            >
              Peyzaj Hizmetleri
            </Link>
            <Link
              href="/hakkimizda"
              className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
              onClick={() => setIsOpen(false)}
            >
              Hakkımızda
            </Link>
            <Link
              href="/iletisim"
              className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
              onClick={() => setIsOpen(false)}
            >
              İletişim
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 