"use client"
import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { tr } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'

interface CalendarProps {
  onSelect?: (date: Date) => void
  disabledDays?: any // DayPicker supports various formats for disabled days
}

export function Calendar({ onSelect, disabledDays = [] }: CalendarProps) {
  const [selected, setSelected] = useState<Date>()

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelected(date)
      onSelect?.(date)
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        disabled={disabledDays}
        locale={tr}
        className="mx-auto"
        modifiers={{
          disabled: disabledDays,
        }}
        modifiersStyles={{
          disabled: { textDecoration: 'line-through' },
        }}
      />
    </div>
  )
} 