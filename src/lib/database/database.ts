import path from 'path'
import fs from 'node:fs/promises'
import { CurrencyData } from 'application/contracts/transformation-contract'

export abstract class Database {
  static $filePath: string = path.join(__dirname, 'exchanges.json')

  static async insert_bulk(data: CurrencyData[]) {
    const convertToString = JSON.stringify(data, null, 2)

    await fs.writeFile(this.$filePath, convertToString)
    console.info('[SUCCESS]: Exchanges saved into json file successfully!')
  }

  static async get() {
    const fileContents = await fs.readFile(this.$filePath, 'utf-8')
    const exchanges = (JSON.parse(fileContents) as CurrencyData[]) ?? []

    return exchanges
  }
}
