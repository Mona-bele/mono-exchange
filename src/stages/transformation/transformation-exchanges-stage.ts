import cheerio from 'cheerio'
import {
  CurrencyData,
  TransformationStageContract,
} from 'application/contracts/transformation-contract'
import { ExtractionStageContract } from 'application/contracts/extraction-contract'

export class TransformationExchangesStage {
  constructor(private readonly extractedData: ExtractionStageContract) {}

  transform(): TransformationStageContract {
    if (this.extractedData.data.length === 0) {
      throw new Error(
        `Something wrong on ${this.extractedData.fallback_error?.stage} stage`,
      )
    }

    const exchanges: CurrencyData[] = []

    this.extractedData.data.forEach(([source, data]) => {
      exchanges.push({
        source,
        quotes: [],
      })

      data.forEach((_exchange) => {
        const $ = cheerio.load(_exchange as string)

        const exchange = $('.YMlKec.fxKbKc').text()
        const quote = $('.PdOqHc').text()

        const exchangeIndex = exchanges.findIndex(
          (data) => data.source == source,
        )

        if (exchangeIndex !== -1) {
          if (exchange && quote) {
            quote.split('/')[1].trim().substring(0, 3)

            exchanges[exchangeIndex].quotes.push([quote, exchange])
          } else {
            exchanges.splice(exchangeIndex, 1)
          }
        }
      })
    })

    return {
      data: exchanges,
      last_update: new Date().toString(),
    }
  }
}
