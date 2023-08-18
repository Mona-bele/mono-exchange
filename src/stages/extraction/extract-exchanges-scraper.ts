import { circuitBreaker } from 'lib/circuit-breaker'
import { getQuotes } from 'application/system/get-quotes'
import { ExtractionStageContract } from 'application/contracts/extraction-contract'

export class ExtractExchangesScraper {
  async extract(): Promise<ExtractionStageContract> {
    const extractionContract: ExtractionStageContract = {
      data: [],
      isFailure: false,
    }

    const quotes = await getQuotes.execute()

    for (const quoteCode of quotes) {
      const [source] = quoteCode.split('-')

      const result = await circuitBreaker.fire(quoteCode)

      const existingDataIndex = extractionContract.data.findIndex(
        (data) => data[0] == source,
      )

      if (existingDataIndex !== -1) {
        extractionContract.data[existingDataIndex][1].push(result)
      } else {
        extractionContract.data.push([source, [result]])
      }
    }

    extractionContract.last_update = new Date().toString()

    if (circuitBreaker.stats.failures > 0) {
      Object.assign(extractionContract, {
        data: [],
        isFailure: true,
        fallback_error: {
          stage: 'EXTRACTION',
        },
      })

      return extractionContract
    }

    return extractionContract
  }
}
