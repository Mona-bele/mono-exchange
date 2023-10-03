module.exports = {
  apps: [
    {
      name: 'server',
      script: 'build/server.js',
      exec_mode: 'cluster',
    },
    {
      name: 'cron-job',
      script: 'build/cron.js',
      cron_restart: '0 */2 * * *',
      exec_mode: 'cluster',
    },
  ],
}
