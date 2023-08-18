import cron from 'node-cron'

import { z } from 'zod'
import { fastify } from 'fastify'
import { runExchangesStagesPipeline } from 'main'
import { FilterQuotes } from 'application/system/filter-quotes'

const app = fastify()

app.get('/exchanges/:quoteCode?', async (req) => {
  const getQuotesQuerySchema = z.object({
    quoteCode: z
      .string()
      .optional()
      .transform((quoteCode) => quoteCode?.toUpperCase()),
  })

  const { quoteCode } = getQuotesQuerySchema.parse(req.params)

  const filterQuotes = new FilterQuotes()
  const exchange = await filterQuotes.execute(quoteCode)

  return exchange
})

app.listen(
  {
    port: 3333,
  },
  () => {
    console.log('Server is running!')
    // Schedule the pipeline to run every 3 minutes
    cron.schedule('*/3 * * * *', async () => {
      await runExchangesStagesPipeline()
      console.log('Pipeline scheduled')
    })
  },
)
