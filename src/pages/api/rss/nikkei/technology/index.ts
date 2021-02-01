import { RssWorJpFetchController } from '@/interfaces/controllers/api/rss'
import type { NextApiRequest, NextApiResponse } from 'next'

export default (_: NextApiRequest, res: NextApiResponse): void => {
  const controller = new RssWorJpFetchController(res, 'nikkei/technology.rdf', [
    'テクノロジー',
  ])
  controller.rssFetch()
}
