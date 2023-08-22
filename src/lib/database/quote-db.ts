import path from 'path'
import fs from 'node:fs/promises'

type Quote = string[]

export abstract class QuoteDB {
  static $quotes: Quote = []
  static $filePath: string = path.join(__dirname, 'quotes.json')

  static async insert(quoteCode: string) {
    const quotes = await this.get()
    this.$quotes = quotes

    if (this.$quotes.find((quote) => quote === quoteCode)) {
      throw new Error('Quote already exists!')
    }

    this.$quotes.push(quoteCode)

    const convertToString = JSON.stringify(this.$quotes, null, 2)

    await fs.writeFile(this.$filePath, convertToString)
  }

  static async verifyFileExists() {
    try {
      await fs.stat(this.$filePath)
    } catch {
      this.$quotes = [
        'EUR-USD',
        'EUR-AOA',
        'USD-EUR',
        'USD-AOA',
        'AOA-USD',
        'AOA-EUR',
      ]
      const convertToString = JSON.stringify(this.$quotes, null, 2)
      await fs.writeFile(this.$filePath, convertToString)
    }
  }

  static async get() {
    try {
      const fileContents = await fs.readFile(this.$filePath, 'utf-8')
      const quotes = JSON.parse(fileContents) as Quote

      return quotes
    } catch {
      return []
    }
  }
}
