import { DinosaurTimeEntity } from '@modules/dinosaur/entities/dinosaurTime.entity'
import { ApolloError } from 'apollo-server-express'
import { FindConditions, FindOneOptions } from 'typeorm'
import { DinosaursService } from '.'

interface Dependencies {
  saveTime: (entity: DinosaurTimeEntity) => Promise<DinosaurTimeEntity>
  findOneTime: (
    conditions: FindConditions<DinosaurTimeEntity>,
    options?: FindOneOptions<DinosaurTimeEntity>,
  ) => Promise<DinosaurTimeEntity | undefined>
}

export const createTime = (
  deps: Dependencies,
): DinosaursService['createTime'] => {
  return async ({ name }) => {
    const dinosaurTime = await deps.findOneTime({
      name: name,
    })

    if (dinosaurTime != null) {
      throw new ApolloError(`Name=${name} of dinosaur time already used`)
    }

    const newDinosaurTime = new DinosaurTimeEntity()
    newDinosaurTime.name = name

    return await deps.saveTime(newDinosaurTime)
  }
}
