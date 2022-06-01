import { DinosaurEntity } from '@modules/dinosaur/entities/dinosaur.entity'
import { DinosaurDietEntity } from '@modules/dinosaur/entities/dinosaurDiet.entity'
import { DinosaurTimeEntity } from '@modules/dinosaur/entities/dinosaurTime.entity'
import { DinosaurTypeEntity } from '@modules/dinosaur/entities/dinosaurType.entity'
import { QueryRunner } from 'typeorm'

export const createDinosaurs = async (queryRunner: QueryRunner) => {
  const dinosaurRepo = queryRunner.connection.getRepository(DinosaurEntity)

  const dinosaurs = [
    {
      id: 1,
      name: 'Ampelosaurus',
      type: {
        id: 1,
        name: 'sauropod',
      },
      length: 15,
      diet: {
        id: 1,
        name: 'herbivorous',
      },
      time: {
        id: 2,
        name: 'late cretaceous',
      },
    },
    {
      id: 2,
      name: 'Brachiosaurus',
      type: {
        id: 1,
        name: 'sauropod',
      },
      length: 30,
      diet: {
        id: 1,
        name: 'herbivorous',
      },
      time: {
        id: 3,
        name: 'late jurassic',
      },
    },
    {
      id: 3,
      name: 'Pelorosaurus',
      type: {
        id: 1,
        name: 'sauropod',
      },
      length: 25,
      diet: {
        id: 1,
        name: 'herbivorous',
      },
      time: {
        id: 1,
        name: 'early cretaceous',
      },
    },
    {
      id: 4,
      name: 'Giganotosaurus',
      type: {
        id: 2,
        name: 'large theropods',
      },
      length: 12,
      diet: {
        id: 2,
        name: 'carnivorous',
      },
      time: {
        id: 1,
        name: 'early cretaceous',
      },
    },
    {
      id: 5,
      name: 'Indosuchus',
      type: {
        id: 2,
        name: 'large theropods',
      },
      length: 7,
      diet: {
        id: 2,
        name: 'carnivorous',
      },
      time: {
        id: 2,
        name: 'late cretaceous',
      },
    },
    {
      id: 6,
      name: 'Spinosaurus',
      type: {
        id: 2,
        name: 'large theropods',
      },
      length: 18,
      diet: {
        id: 2,
        name: 'carnivorous',
      },
      time: {
        id: 2,
        name: 'late cretaceous',
      },
    },
    {
      id: 7,
      name: 'Tyrannosaurus',
      type: {
        id: 2,
        name: 'large theropods',
      },
      length: 12,
      diet: {
        id: 2,
        name: 'carnivorous',
      },
      time: {
        id: 2,
        name: 'late cretaceous',
      },
    },
    {
      id: 8,
      name: 'Bambiraptor',
      type: {
        id: 3,
        name: 'small theropods',
      },
      length: 1,
      diet: {
        id: 2,
        name: 'carnivorous',
      },
      time: {
        id: 2,
        name: 'late cretaceous',
      },
    },
    {
      id: 9,
      name: 'Erlikosaurus',
      type: {
        id: 3,
        name: 'small theropods',
      },
      length: 3,
      diet: {
        id: 3,
        name: 'omnivorous',
      },
      time: {
        id: 2,
        name: 'late cretaceous',
      },
    },
  ]

  const unsavedDinosaurs: DinosaurEntity[] = dinosaurs.map(dinosaur => {
    const newDinosaur = new DinosaurEntity()

    newDinosaur.id = dinosaur.id
    newDinosaur.name = dinosaur.name
    newDinosaur.type = dinosaur.type as DinosaurTypeEntity
    newDinosaur.length = dinosaur.length
    newDinosaur.diet = dinosaur.diet as DinosaurDietEntity
    newDinosaur.time = dinosaur.time as DinosaurTimeEntity

    return newDinosaur
  })

  return await dinosaurRepo.save(unsavedDinosaurs)
}
