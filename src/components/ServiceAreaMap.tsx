"use client"
import { GoogleMap, Marker, Circle } from '@react-google-maps/api'

export default function ServiceAreaMap() {
  return (
    <GoogleMap
      center={center}
      zoom={12}
    >
      <Circle
        center={center}
        radius={5000}
        options={serviceAreaOptions}
      />
    </GoogleMap>
  )
} 