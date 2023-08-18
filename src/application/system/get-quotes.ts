import { QuoteDB } from 'lib/database/quote-db'

class GetQuotes {
  async execute() {
    const quotes = await QuoteDB.get()
    return quotes
  }
}

const getQuotes = new GetQuotes()

export { getQuotes }
