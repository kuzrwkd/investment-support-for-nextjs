import FeedParser from 'feedparser'
import { Services } from '@/domains/services/base'
import { Response } from 'node-fetch'
import { RssData } from './types'
import dayjs from 'dayjs'

export class FeedParserServices extends Services {
  /**
   * rssフィードのパース
   * @param rss
   * @param categories
   * @param callback
   */
  public static feedParser(
    rss: Promise<Response>,
    categories: string[],
    callback: (value: RssData[]) => void
  ): void {
    const feedparser: FeedParser = new FeedParser({})
    const items: RssData[] = []

    rss
      .then(async (res) => {
        if (res.status !== 200) {
          throw new Error(`Bad status code. "${res.status}" url: ${res.url}`)
        } else {
          res.body
            .pipe(feedparser)
            .on('readable', () => {
              let item: FeedParser.Item

              while ((item = feedparser.read())) {
                items.push({
                  title: item.title,
                  date: item.date,
                  link: item.link,
                  author: item.author,
                  categories: categories,
                })
              }
            })
            .on('error', (error) => {
              console.error(error)
            })
            .on('end', () => {
              callback(items)
            })
        }
      })
      .catch((error) => {
        console.error(error)
        callback(items)
      })
  }

  public static squeezeFeed(data: RssData[]): RssData[] {
    return data
      .filter(
        (element, index, self) =>
          self.findIndex(
            (e) => e.title === element.title || e.link === element.link
          ) === index
      )
      .sort((a, b) =>
        dayjs(String(a.date)).isAfter(dayjs(String(b.date))) ? -1 : 1
      )
  }
}
