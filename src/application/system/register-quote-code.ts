import { QuoteDB } from '../../lib/database/quote-db'

export class RegisterQuoteCode {
  async execute(quoteCode: string) {
    await QuoteDB.insert(quoteCode)
  }
}

const registerQuoteCode = new RegisterQuoteCode()

export { registerQuoteCode }
