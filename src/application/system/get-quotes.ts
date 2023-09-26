import { QuoteDB } from '../../lib/database/quote-db'

class GetQuotes {
  async execute() {
    await QuoteDB.verifyFileExists()
    const quotes = await QuoteDB.get()
    return quotes
  }
}

const getQuotes = new GetQuotes()

export { getQuotes }
