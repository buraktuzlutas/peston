"use client"
import { useState, useRef, useEffect } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface Props {
  onSelect: (emoji: string) => void
  buttonClassName?: string
}

export function EmojiPicker({ onSelect, buttonClassName }: Props) {
  const [showPicker, setShowPicker] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setShowPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className={buttonClassName || "p-2 text-gray-600 hover:text-emerald-600"}
      >
        😊
      </button>
      
      {showPicker && (
        <div 
          ref={pickerRef}
          className="absolute z-50 top-full right-0 mt-1"
        >
          <Picker
            data={data}
            onEmojiSelect={(emoji: any) => {
              onSelect(emoji.native)
              setShowPicker(false)
            }}
            theme="light"
            locale="tr"
          />
        </div>
      )}
    </div>
  )
} 