import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

/**
 * An abstract class for entities that contains
 * `createdDate` and `updatedDate` properties.
 */
export abstract class DatedEntity {
  @CreateDateColumn({ type: 'timestamp' })
  public readonly createdDateTime!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  public readonly updatedDateTime!: Date
}
