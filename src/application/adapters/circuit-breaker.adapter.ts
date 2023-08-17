import CircuitBreaker from 'opossum'

type Callback = (quote_code: string) => Promise<string>;

export abstract class CircuitBreakerAdapter {
  static create(action: Callback, options: object) {
    return new CircuitBreaker(action, options)
  }
}