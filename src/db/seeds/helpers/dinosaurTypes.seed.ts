import { DinosaurTypeEntity } from '@modules/dinosaur/entities/dinosaurType.entity'
import { QueryRunner } from 'typeorm'

export const createDinosaurTypes = async (queryRunner: QueryRunner) => {
  const dinosaurTypeRepo = queryRunner.connection.getRepository(
    DinosaurTypeEntity,
  )

  const dinosaurTypes = [
    {
      id: 1,
      name: 'sauropod',
    },
    {
      id: 2,
      name: 'large theropod',
    },
    {
      id: 3,
      name: 'small theropods',
    },
  ]

  const unsavedDinosaurTypes: DinosaurTypeEntity[] = dinosaurTypes.map(
    dinosaurType => {
      const newDinosaurType = new DinosaurTypeEntity()

      newDinosaurType.id = dinosaurType.id
      newDinosaurType.name = dinosaurType.name

      return newDinosaurType
    },
  )

  return await dinosaurTypeRepo.save(unsavedDinosaurTypes)
}
