"use client"
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { TimeSelect } from '@/components/ui/time-select'

export default function Appointment() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()

  // Örnek olarak hafta sonlarını devre dışı bırakalım
  const disabledDays = [
    { from: new Date(2024, 0, 1), to: new Date(2024, 0, 1) }, // Yılbaşı
    { dayOfWeek: [0, 6] }, // Pazar ve Cumartesi
  ]

  // Örnek olarak bazı saatleri devre dışı bırakalım
  const disabledTimes = ["12:00", "12:30", "13:00"] // Öğle arası

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Randevu Al</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Tarih Seçin</h2>
          <Calendar 
            onSelect={setSelectedDate}
            disabledDays={disabledDays}
          />
        </div>

        {selectedDate && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Saat Seçin</h2>
            <TimeSelect
              onSelect={setSelectedTime}
              disabledTimes={disabledTimes}
              startTime="09:00"
              endTime="17:00"
              interval={30}
            />
          </div>
        )}

        {selectedDate && selectedTime && (
          <div className="bg-emerald-50 p-4 rounded-lg">
            <p className="font-medium text-emerald-800">
              Seçilen Randevu: {selectedDate.toLocaleDateString('tr-TR')} - {selectedTime}
            </p>
            <button
              className="mt-4 w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
              onClick={() => {
                // Burada randevu kaydetme işlemi yapılacak
                alert('Randevunuz kaydedildi!')
              }}
            >
              Randevuyu Onayla
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 