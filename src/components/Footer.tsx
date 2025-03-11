import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Peston. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 