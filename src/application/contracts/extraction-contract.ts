export type ExtractionStageContract = {
  data: [string, string[]][]
  isFailure: boolean
  last_update?: string
  fallback_error?: {
    stage: string
  }
}