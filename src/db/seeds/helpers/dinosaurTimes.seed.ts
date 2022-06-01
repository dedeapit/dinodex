import { DinosaurTimeEntity } from '@modules/dinosaur/entities/dinosaurTime.entity'
import { QueryRunner } from 'typeorm'

export const createDinosaurTimes = async (queryRunner: QueryRunner) => {
  const dinosaurTimeRepo = queryRunner.connection.getRepository(
    DinosaurTimeEntity,
  )

  const dinosaurTimes = [
    {
      id: 1,
      name: 'early cretaceous',
    },
    {
      id: 2,
      name: 'late cretaceous',
    },
    {
      id: 3,
      name: 'late jurassic',
    },
  ]

  const unsavedDinosaurTimes: DinosaurTimeEntity[] = dinosaurTimes.map(
    dinosaurTime => {
      const newDinosaurTime = new DinosaurTimeEntity()

      newDinosaurTime.id = dinosaurTime.id
      newDinosaurTime.name = dinosaurTime.name

      return newDinosaurTime
    },
  )

  return await dinosaurTimeRepo.save(unsavedDinosaurTimes)
}
