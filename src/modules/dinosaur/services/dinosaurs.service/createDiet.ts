import { DinosaurDietEntity } from '@modules/dinosaur/entities/dinosaurDiet.entity'
import { ApolloError } from 'apollo-server-express'
import { FindConditions, FindOneOptions } from 'typeorm'
import { DinosaursService } from '.'

interface Dependencies {
  saveDiet: (entity: DinosaurDietEntity) => Promise<DinosaurDietEntity>
  findOneDiet: (
    conditions: FindConditions<DinosaurDietEntity>,
    options?: FindOneOptions<DinosaurDietEntity>,
  ) => Promise<DinosaurDietEntity | undefined>
}

export const createDiet = (
  deps: Dependencies,
): DinosaursService['createDiet'] => {
  return async ({ name }) => {
    const dinosaurDiet = await deps.findOneDiet({
      name: name,
    })

    if (dinosaurDiet != null) {
      throw new ApolloError(`Name=${name} of dinosaur diet already used`)
    }

    const newDinosaurDiet = new DinosaurDietEntity()
    newDinosaurDiet.name = name

    return await deps.saveDiet(newDinosaurDiet)
  }
}
