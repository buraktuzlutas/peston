import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section Loading */}
      <div className="relative h-[70vh]">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
        </div>
      </div>

      {/* Features Loading */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center space-y-4">
                <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                <Skeleton className="h-6 w-2/3 mx-auto" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 