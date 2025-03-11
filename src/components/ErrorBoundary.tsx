"use client"
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Bir Hata Oluştu
            </h2>
            <p className="text-gray-600 mb-4">
              Sayfayı yenilemeyi deneyin veya daha sonra tekrar ziyaret edin.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 