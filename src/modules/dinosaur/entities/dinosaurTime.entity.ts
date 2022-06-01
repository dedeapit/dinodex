import { DinosaurTime as GraphQLDinosaurTime } from '@generated/graphql'
import { DatedEntity } from '@modules/common/entities/dated.entity'
import { DeepPartial } from '@types'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DinosaurEntity } from './dinosaur.entity'

@Entity('dinosaur_time')
export class DinosaurTimeEntity extends DatedEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public name!: string

  @OneToMany(
    type => DinosaurEntity,
    entity => entity.time,
  )
  public dinosaurs!: DinosaurEntity[]

  public get baseGraphQLObject(): DeepPartial<GraphQLDinosaurTime> {
    return {
      id: this.id.toString(),
      name: this.name,
    }
  }
}
