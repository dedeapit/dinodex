import { DinosaurEntity } from '@modules/dinosaur/entities/dinosaur.entity'
import { DinosaurDietEntity } from '@modules/dinosaur/entities/dinosaurDiet.entity'
import { DinosaurTimeEntity } from '@modules/dinosaur/entities/dinosaurTime.entity'
import { DinosaurTypeEntity } from '@modules/dinosaur/entities/dinosaurType.entity'
import { ApolloError } from 'apollo-server-express'
import { FindConditions, FindOneOptions } from 'typeorm'
import { DinosaursService } from '.'

export interface CreateParams {
  name: string
  typeId: number
  length: number | undefined
  dietId: number
  timeId: number
}

interface Dependencies {
  save: (entity: DinosaurEntity) => Promise<DinosaurEntity>
  findOne: (
    conditions: FindConditions<DinosaurEntity>,
    options?: FindOneOptions<DinosaurEntity>,
  ) => Promise<DinosaurEntity | undefined>
  findOneType: (
    conditions: FindConditions<DinosaurTypeEntity>,
    options?: FindOneOptions<DinosaurTypeEntity>,
  ) => Promise<DinosaurTypeEntity | undefined>
  findOneDiet: (
    conditions: FindConditions<DinosaurDietEntity>,
    options?: FindOneOptions<DinosaurDietEntity>,
  ) => Promise<DinosaurDietEntity | undefined>
  findOneTime: (
    conditions: FindConditions<DinosaurTimeEntity>,
    options?: FindOneOptions<DinosaurTimeEntity>,
  ) => Promise<DinosaurTimeEntity | undefined>
}

export const create = (deps: Dependencies): DinosaursService['create'] => {
  return async ({ name, typeId, length, dietId, timeId }) => {
    const dinosaur = await deps.findOne({
      name,
    })

    if (dinosaur != null) {
      throw new ApolloError(`Name=${name} of dinosaur already used`)
    }

    const dinosaurType = await deps.findOneType({
      id: typeId,
    })

    if (dinosaurType == null) {
      throw new ApolloError('Dinosaur type not found')
    }

    const dinosaurDiet = await deps.findOneDiet({
      id: dietId,
    })

    if (dinosaurDiet == null) {
      throw new ApolloError('Dinosaur diet not found')
    }

    const dinosaurTime = await deps.findOneTime({
      id: timeId,
    })

    if (dinosaurTime == null) {
      throw new ApolloError('Dinosaur time not found')
    }

    const newDinosaur = new DinosaurEntity()
    newDinosaur.name = name
    newDinosaur.type = dinosaurType
    newDinosaur.length = length
    newDinosaur.diet = dinosaurDiet
    newDinosaur.time = dinosaurTime

    return await deps.save(newDinosaur)
  }
}
