"use client"
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  src: string
  alt: string
  fallbackSrc?: string
  [key: string]: any
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  ...props
}: Props) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      priority={props.priority || false}
      quality={props.quality || 75}
    />
  )
} 