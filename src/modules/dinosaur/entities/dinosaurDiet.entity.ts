import { DinosaurDiet as GraphQLDinosaurDiet } from '@generated/graphql'
import { DatedEntity } from '@modules/common/entities/dated.entity'
import { DeepPartial } from '@types'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DinosaurEntity } from './dinosaur.entity'

@Entity('dinosaur_diet')
export class DinosaurDietEntity extends DatedEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public name!: string

  @OneToMany(
    type => DinosaurEntity,
    entity => entity.diet,
  )
  public dinosaurs!: DinosaurEntity[]

  public get baseGraphQLObject(): DeepPartial<GraphQLDinosaurDiet> {
    return {
      id: this.id.toString(),
      name: this.name,
    }
  }
}
