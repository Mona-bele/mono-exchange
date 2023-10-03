import cron from 'node-cron'

import { runExchangesStagesPipeline } from 'main'

// Schedule the pipeline to run every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('[CRON]: Running scheduled task...');
  await runExchangesStagesPipeline()
  console.log('[CRON]: Scheduled task completed');
})
