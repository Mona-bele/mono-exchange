# Realtime Currency Scraper

A service that extracts exchange data from Google Finance in real time and stores it in a local database to be consumed in our main application.

## Features

- [x] Create a service to extract this data and, using a circuit breaker, check whether the connection is active or not..

- [x] Transform this data based on a model defined by us and send it to the next stage

- [x]  Apply cron tasks to run the pipeline every 2 hours without interruption.

- [x] If the connection has been interrupted during the extraction process, notify the error and skip all the following steps, returning only the last exchange extracted to the API with an extraction_status
