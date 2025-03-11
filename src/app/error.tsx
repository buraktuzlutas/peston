'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Bir Hata Oluştu</h2>
        <p className="text-gray-600">
          Üzgünüz, bir hata oluştu. Lütfen tekrar deneyin.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
          >
            Tekrar Dene
          </button>
          <Link
            href="/"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
} 