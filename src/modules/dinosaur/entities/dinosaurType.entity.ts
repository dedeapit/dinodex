import { DinosaurType as GraphQLDinosaurType } from '@generated/graphql'
import { DatedEntity } from '@modules/common/entities/dated.entity'
import { DeepPartial } from '@types'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { DinosaurEntity } from './dinosaur.entity'

@Entity('dinosaur_type')
export class DinosaurTypeEntity extends DatedEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public name!: string

  @OneToOne(
    type => DinosaurEntity,
    dinosaur => dinosaur.type,
  )
  public dinosaurs!: DinosaurEntity[]

  public get baseGraphQLObject(): DeepPartial<GraphQLDinosaurType> {
    return {
      id: this.id.toString(),
      name: this.name,
    }
  }
}
