import cron from 'node-cron'
import { fastify } from 'fastify'
import { Database } from 'lib/database/database'
import { runExchangesStagesPipeline } from 'main'

const app = fastify()

app.get('/exchanges', async () => {
  const exchanges = await Database.get()

  return exchanges
})

app.listen(
  {
    port: 3333,
  },
  () => {
    console.log('Server is running!')
    // Schedule the pipeline to run every 2 hour
    cron.schedule('0 */2 * * *', async () => {
      await runExchangesStagesPipeline()
      console.log('Pipeline scheduled')
    })
  },
)
