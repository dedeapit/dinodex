import { Dinosaur as GraphQLDinosaur } from '@generated/graphql'
import { DatedEntity } from '@modules/common/entities/dated.entity'
import { DeepPartial } from '@types'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { DinosaurDietEntity } from './dinosaurDiet.entity'
import { DinosaurTimeEntity } from './dinosaurTime.entity'
import { DinosaurTypeEntity } from './dinosaurType.entity'

@Entity('dinosaur')
export class DinosaurEntity extends DatedEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public name!: string

  @Column({ type: 'int', nullable: true })
  public length?: number

  @Column({ type: 'int' })
  public typeId!: number

  @ManyToOne(
    type => DinosaurTypeEntity,
    entity => entity.dinosaurs,
  )
  public type!: DinosaurTypeEntity

  @Column({ type: 'int' })
  public dietId!: number

  @ManyToOne(
    type => DinosaurDietEntity,
    entity => entity.dinosaurs,
  )
  public diet!: DinosaurDietEntity

  @Column({ type: 'int' })
  public timeId!: number

  @ManyToOne(
    type => DinosaurTimeEntity,
    entity => entity.dinosaurs,
  )
  public time!: DinosaurTimeEntity

  public get baseGraphQLObject(): DeepPartial<GraphQLDinosaur> {
    return {
      id: this.id.toString(),
      name: this.name,
      type: this.type.baseGraphQLObject,
      length: this.length != null ? this.length : undefined,
      diet: this.diet.baseGraphQLObject,
      time: this.time.baseGraphQLObject,
    }
  }
}
