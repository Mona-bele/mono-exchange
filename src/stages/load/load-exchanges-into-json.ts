import { Database } from 'lib/database/database'
import { TransformationStageContract } from 'application/contracts/transformation-contract'

export class LoadExchangesIntoJson {
  constructor(private exchangesTransformed: TransformationStageContract) {}

  async load() {
    await Database.insert_bulk(this.exchangesTransformed.data)
  }
}
