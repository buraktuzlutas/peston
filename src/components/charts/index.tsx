"use client"
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor?: string | string[]
    backgroundColor?: string | string[]
    borderWidth?: number
  }[]
}

export function LineChart({ data }: { data: ChartData }) {
  return (
    <div className="w-full h-[300px]">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top' as const,
            },
          },
        }}
      />
    </div>
  )
}

export function BarChart({ data }: { data: ChartData }) {
  return (
    <div className="w-full h-[300px]">
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top' as const,
            },
          },
        }}
      />
    </div>
  )
} 