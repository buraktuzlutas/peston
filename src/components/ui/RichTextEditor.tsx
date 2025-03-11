"use client"
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, FileText } from 'lucide-react'
import { MediaLibrary } from '@/components/admin/MediaLibrary'
import { ImageUpload } from '@/components/ui/ImageUpload'
import TurndownService from 'turndown'
import { marked } from 'marked'

// TipTap bileşenlerini client-side'da dinamik olarak import et
const Editor = dynamic(
  () => import('@tiptap/react').then(mod => mod.Editor),
  { ssr: false }
)
const EditorContent = dynamic(
  () => import('@tiptap/react').then(mod => mod.EditorContent),
  { ssr: false }
)
const StarterKit = dynamic(() => import('@tiptap/starter-kit'), { ssr: false })
const Image = dynamic(() => import('@tiptap/extension-image'), { ssr: false })
const Link = dynamic(() => import('@tiptap/extension-link'), { ssr: false })

const turndown = new TurndownService()

interface Props {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: Props) {
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [isMarkdownMode, setIsMarkdownMode] = useState(false)
  const [markdownContent, setMarkdownContent] = useState('')

  const editor = Editor.useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false
      })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (!isMarkdownMode) {
        onChange(editor.getHTML())
      }
    }
  })

  const toggleMarkdownMode = () => {
    if (editor) {
      if (!isMarkdownMode) {
        // HTML'den Markdown'a çevir
        const markdown = turndown.turndown(editor.getHTML())
        setMarkdownContent(markdown)
      } else {
        // Markdown'dan HTML'e çevir
        const html = marked(markdownContent)
        editor.commands.setContent(html)
        onChange(html)
      }
      setIsMarkdownMode(!isMarkdownMode)
    }
  }

  if (!editor) return null

  return (
    <>
      <div className="border rounded-md overflow-hidden">
        <div className="bg-gray-50 border-b p-2 flex gap-2">
          {!isMarkdownMode && (
            <>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
              >
                <ListOrdered size={16} />
              </button>
              <button
                onClick={() => {
                  const url = window.prompt('URL giriniz:')
                  if (url) {
                    editor.chain().focus().setLink({ href: url }).run()
                  }
                }}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
              >
                <LinkIcon size={16} />
              </button>
              <button
                onClick={() => setShowMediaLibrary(true)}
                className="p-2 rounded hover:bg-gray-200"
              >
                <ImageIcon size={16} />
              </button>
            </>
          )}
          <button
            onClick={toggleMarkdownMode}
            className={`p-2 rounded hover:bg-gray-200 ${isMarkdownMode ? 'bg-gray-200' : ''}`}
            title={isMarkdownMode ? 'HTML Moduna Geç' : 'Markdown Moduna Geç'}
          >
            <FileText size={16} />
          </button>
        </div>
        
        {isMarkdownMode ? (
          <textarea
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            className="w-full p-4 min-h-[200px] font-mono"
            placeholder="Markdown yazın..."
          />
        ) : (
          <EditorContent editor={editor} className="prose max-w-none p-4" />
        )}
      </div>

      {showMediaLibrary && (
        <MediaLibrary
          onSelect={(url) => {
            editor?.chain().focus().setImage({ src: url }).run()
            setShowMediaLibrary(false)
          }}
          onClose={() => setShowMediaLibrary(false)}
        />
      )}
    </>
  )
} 