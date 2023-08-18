import { Database } from 'lib/database/database'

class FilterQuotes {
  async execute(quoteCode?: string) {
    const exchanges = await Database.get()

    if (quoteCode === undefined) {
      return exchanges
    }

    const [source, target] = quoteCode.split('-')
    const exchange = exchanges
      .filter((exchange) => exchange.source === source)
      .map((exchange) => ({
        source,
        quotes: exchange.quotes.filter((quote) => quote[0] === target),
      }))

    return exchange
  }
}

const filterQuote = new FilterQuotes()

export { filterQuote }
