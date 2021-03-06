import React from 'react'
import { RssData } from '@/domains/services/feedParser/types'

export type Props = {
  children?: React.ReactNode
  data: RssData[]
  itemSize?: number
  thumbnail?: 'small' | 'middle' | 'large' | 'not'
}
