"use client"
import { InstagramFeed } from '@/components/social/instagram'
import { FacebookFeed } from '@/components/social/facebook'

export default function SocialFeed() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <InstagramFeed />
      <FacebookFeed />
    </div>
  )
} 