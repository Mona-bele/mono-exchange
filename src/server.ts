import cron from 'node-cron'

import { z } from 'zod'
import { fastify } from 'fastify'
import { runExchangesStagesPipeline } from 'main'
import { getQuotes } from 'application/system/get-quotes'
import { filterQuote } from 'application/system/filter-quotes'
import { registerQuoteCode } from 'application/system/register-quote-code'
import { env } from 'env'

const app = fastify()

app.get('/', async (_, reply) => {
  reply.status(200).send({
    version: "0.0.1",
    message: 'Welcome to mono exchange api'
  })
})

app.get('/exchanges/:quoteCode?', async (req, reply) => {
  try {
    const getQuotesQuerySchema = z.object({
      quoteCode: z
        .string()
        .optional()
        .transform((quoteCode) => quoteCode?.toUpperCase()),
    })

    const { quoteCode } = getQuotesQuerySchema.parse(req.params)

    const exchange = await filterQuote.execute(quoteCode)
    return exchange
  } catch (error: any) {
    reply.status(400).send(error.message)
  }
})

app.post('/quote/create', async (req, reply) => {
  try {
    const createQuoteCodeSchema = z.object({
      quoteCode: z
        .string()
        .refine((value) => /^[A-Z]{3}-[A-Z]{3}$/.test(value), {
          message: 'O par de moedas deve estar no formato "AAA-BBB"',
        }),
    })

    const { quoteCode } = createQuoteCodeSchema.parse(req.body)
    await registerQuoteCode.execute(quoteCode)

    reply.status(201).send()
  } catch (error: any) {
    reply.status(400).send(error.message)
  }
})

app.get('/quotes', async () => {
  const quotes = await getQuotes.execute()
  return {
    quotes,
  }
})


app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`[SERVER]: Http server is running at ${env.PORT}`)
   
    // Schedule the pipeline to run every 2 hours
    cron.schedule('0 */2 * * *', async () => {
      await runExchangesStagesPipeline()
      console.log('[PIPELINE]: scheduled completed')
    })
  })
