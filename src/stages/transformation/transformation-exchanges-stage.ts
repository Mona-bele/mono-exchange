import cheerio from 'cheerio'
import {
  CurrencyData,
  TransformationStageContract,
} from 'application/contracts/transformation-contract'
import { ExtractionStageContract } from 'application/contracts/extraction-contract'

export class TransformationExchangesStage {
  constructor(private readonly extractedData: ExtractionStageContract) {}

  transform(): TransformationStageContract {
    if (!this.extractedData.isFailure) {
      const exchanges: CurrencyData[] = []

      this.extractedData.data.forEach(([source, data]) => {
        exchanges.push({
          source,
          quotes: [],
        })

        data.forEach((_exchange) => {
          const $ = cheerio.load(_exchange as string)
          const exchange = $('.YMlKec.fxKbKc').text()
          const quote = $('.PdOqHc').text().split('/')[1].trim().substring(0, 3)

          const exchangeIndex = exchanges.findIndex(
            (data) => data.source == source,
          )

          exchanges[exchangeIndex].quotes.push([quote, exchange])
        })
      })

      return {
        data: exchanges,
        last_update: new Date().toString(),
      }
    }

    return {
      data: [],
    }
  }
}
