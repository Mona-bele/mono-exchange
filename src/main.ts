import { Observable, from } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { LoadExchangesIntoJson } from 'stages/load/load-exchanges-into-json'
import { ExtractExchangesScraper } from './stages/extraction/extract-exchanges-scraper'
import { TransformationStageContract } from 'application/contracts/transformation-contract'
import { TransformationExchangesStage } from 'stages/transformation/transformation-exchanges-stage'

export async function runExchangesStagesPipeline() {
  try {
    const extractionStage = new ExtractExchangesScraper()
    const extractedData = await extractionStage.extract()

    const observable = new Observable<TransformationStageContract>(
      (observer) => {
        const transformationStage = new TransformationExchangesStage(
          extractedData,
        )
        const exchangesTransformed = transformationStage.transform()
        observer.next(exchangesTransformed)
        observer.complete()
      },
    )

    observable
      .pipe(
        switchMap((exchangesTransformed: TransformationStageContract) => {
          const loadStage = new LoadExchangesIntoJson(exchangesTransformed)
          return from(loadStage.load())
        }),
      )
      .subscribe({
        error: (error) => console.error('Pipeline error:', error),
        complete: () => console.log('Pipeline completed successfully'),
      })
  } catch (error) {
    console.error('Error during initialization:', error)
  }
}

;(async () => {
  await runExchangesStagesPipeline()
})()
