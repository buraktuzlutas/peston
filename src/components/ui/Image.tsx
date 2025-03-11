"use client"
import NextImage, { ImageProps } from 'next/image'
import { useState } from 'react'

interface Props extends ImageProps {
  fallbackSrc?: string
}

const Image = ({ fallbackSrc = '/images/placeholder.jpg', ...props }: Props) => {
  const [error, setError] = useState(false)

  // Don't render if no src is provided
  if (!props.src) return null

  return (
    <NextImage
      {...props}
      src={error ? fallbackSrc : props.src}
      onError={() => setError(true)}
      alt={props.alt || 'Image'}
    />
  )
}

export default Image 