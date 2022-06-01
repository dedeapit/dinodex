import { DinosaurDietEntity } from '@modules/dinosaur/entities/dinosaurDiet.entity'
import { QueryRunner } from 'typeorm'

export const createDinosaurDiets = async (queryRunner: QueryRunner) => {
  const dinosaurDietRepo = queryRunner.connection.getRepository(
    DinosaurDietEntity,
  )

  const dinosaurDiets = [
    {
      id: 1,
      name: 'herbivorous',
    },
    {
      id: 2,
      name: 'carnivorous',
    },
    {
      id: 3,
      name: 'omnivorous',
    },
  ]

  const unsavedDinosaurDiets: DinosaurDietEntity[] = dinosaurDiets.map(
    dinosaurDiet => {
      const newDinosaurDiet = new DinosaurDietEntity()

      newDinosaurDiet.id = dinosaurDiet.id
      newDinosaurDiet.name = dinosaurDiet.name

      return newDinosaurDiet
    },
  )

  return await dinosaurDietRepo.save(unsavedDinosaurDiets)
}
