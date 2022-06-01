import { MigrationInterface, QueryRunner } from 'typeorm'
import * as helpers from './helpers'

export class DataSeed1625933012727 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await helpers.createDinosaurTypes(queryRunner)
    await helpers.createDinosaurDiets(queryRunner)
    await helpers.createDinosaurTimes(queryRunner)
    await helpers.createDinosaurs(queryRunner)
  }

  public async down(_: QueryRunner): Promise<any> {}
}
