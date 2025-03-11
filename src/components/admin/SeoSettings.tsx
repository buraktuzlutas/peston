interface SeoProps {
  title: string
  description: string
  image: string
  onChange: (seo: { title: string; description: string; image: string }) => void
}

export function SeoSettings({ title, description, image, onChange }: SeoProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">SEO Başlığı</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onChange({ title: e.target.value, description, image })}
          className="w-full rounded-md border-gray-300"
          maxLength={60}
        />
        <p className="text-sm text-gray-500 mt-1">
          {title.length}/60 karakter
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Meta Açıklama</label>
        <textarea
          value={description}
          onChange={(e) => onChange({ title, description: e.target.value, image })}
          className="w-full rounded-md border-gray-300"
          maxLength={160}
          rows={3}
        />
        <p className="text-sm text-gray-500 mt-1">
          {description.length}/160 karakter
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Sosyal Medya Görseli</label>
        <ImageUpload
          currentImage={image}
          onUpload={(url) => onChange({ title, description, image: url })}
        />
        <p className="text-sm text-gray-500 mt-1">
          Önerilen boyut: 1200x630 piksel
        </p>
      </div>
    </div>
  )
} 