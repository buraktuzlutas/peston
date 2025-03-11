"use client"
import { useState } from 'react'

interface TimeSelectProps {
  onSelect?: (time: string) => void
  disabledTimes?: string[]
  startTime?: string // Format: "HH:mm"
  endTime?: string // Format: "HH:mm"
  interval?: number // minutes
}

export function TimeSelect({
  onSelect,
  disabledTimes = [],
  startTime = "09:00",
  endTime = "18:00",
  interval = 30
}: TimeSelectProps) {
  const [selected, setSelected] = useState<string>()

  const generateTimeSlots = () => {
    const slots: string[] = []
    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)
    
    let currentHour = startHour
    let currentMinute = startMinute

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMinute <= endMinute)
    ) {
      const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`
      slots.push(timeString)

      currentMinute += interval
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60)
        currentMinute = currentMinute % 60
      }
    }

    return slots
  }

  const handleSelect = (time: string) => {
    setSelected(time)
    onSelect?.(time)
  }

  const timeSlots = generateTimeSlots()

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-4 gap-2">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => handleSelect(time)}
            disabled={disabledTimes.includes(time)}
            className={`
              p-2 rounded-md text-sm font-medium
              ${selected === time
                ? 'bg-emerald-600 text-white'
                : disabledTimes.includes(time)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  )
} 