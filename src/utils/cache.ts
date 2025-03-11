import { cache } from 'react'
import { getContent } from './content'

export const getContentCached = cache(async () => {
  return await getContent()
}) 