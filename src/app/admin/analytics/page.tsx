"use client"
import { LineChart, BarChart } from '@/components/charts'

const visitorData = {
  labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
  datasets: [
    {
      label: 'Ziyaretçi Sayısı',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
}

const serviceRequestData = {
  labels: ['İlaçlama', 'Peyzaj', 'Böcek İlaçlama', 'Bahçe Bakımı'],
  datasets: [
    {
      label: 'Hizmet Talepleri',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Ziyaretçi İstatistikleri</h3>
          <LineChart data={visitorData} />
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Hizmet Talepleri</h3>
          <BarChart data={serviceRequestData} />
        </div>
      </div>
    </div>
  )
} 