import { httpRequest } from "./axios"
import { CircuitBreakerAdapter } from "../application/adapters/circuit-breaker.adapter"

const circuitBreakerOptions = {
  // timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 5000,
}

async function scraperExchangesServiceAsync(quote_code: string) {
  const exchangeResult = await httpRequest.get<string>(`/${quote_code}`, {
    headers: {
      "Content-Type": "text/html"
    }
  })
  return exchangeResult.data
}

const circuitBreaker = CircuitBreakerAdapter.create(
  scraperExchangesServiceAsync, circuitBreakerOptions
)

export { circuitBreaker }