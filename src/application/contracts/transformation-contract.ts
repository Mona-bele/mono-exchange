type Quote = [string, string]

export type CurrencyData = {
  source: string
  quotes: Quote[]
}

export type TransformationStageContract = {
  data: CurrencyData[]
  last_update?: string
}
