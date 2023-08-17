# Realtime Currency Scraper

A service to pulls exchange data from google finance on realtime and store into a local database to be consumed in our main app.

## Features

- [x] Create service to extract these data and via circuit breaker check if the connection is up or not.

- [x] Transform these data based on a model defined by us and send to the next stage

- [x] Apply cron jobs to run the pipeline every 2 hour without break.

- [x] If the connection was breaked along pull process, notify about the error and skip all following steps returning only the latest exchange extracted for the API with an extraction_status
