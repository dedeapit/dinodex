import { DinosaurTypeEntity } from '@modules/dinosaur/entities/dinosaurType.entity'
import { ApolloError } from 'apollo-server-express'
import { FindConditions, FindOneOptions } from 'typeorm'
import { DinosaursService } from '.'

interface Dependencies {
  saveType: (entity: DinosaurTypeEntity) => Promise<DinosaurTypeEntity>
  findOneType: (
    conditions: FindConditions<DinosaurTypeEntity>,
    options?: FindOneOptions<DinosaurTypeEntity>,
  ) => Promise<DinosaurTypeEntity | undefined>
}

export const createType = (
  deps: Dependencies,
): DinosaursService['createType'] => {
  return async ({ name }) => {
    const dinosaurType = await deps.findOneType({
      name,
    })

    if (dinosaurType != null) {
      throw new ApolloError(`Name=${name} of dinosaur type already used`)
    }

    const newDinosaurType = new DinosaurTypeEntity()
    newDinosaurType.name = name

    return await deps.saveType(newDinosaurType)
  }
}
