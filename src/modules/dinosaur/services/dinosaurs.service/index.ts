import { SearchResult as GraphQLSearchResult } from '@generated/graphql'
import { DinosaurEntity } from '@modules/dinosaur/entities/dinosaur.entity'
import { DinosaurDietEntity } from '@modules/dinosaur/entities/dinosaurDiet.entity'
import { DinosaurTimeEntity } from '@modules/dinosaur/entities/dinosaurTime.entity'
import { DinosaurTypeEntity } from '@modules/dinosaur/entities/dinosaurType.entity'
import { Connection, FindConditions, FindOneOptions } from 'typeorm'
import { create, CreateParams } from './create'
import { createDiet } from './createDiet'
import { createTime } from './createTime'
import { createType } from './createType'
import { searchTypeDietTime } from './searchTypeDietTime'

export interface DinosaursService {
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
  findDinosaurs: (
    options?: FindOneOptions<DinosaurEntity>,
  ) => Promise<DinosaurEntity[]>
  findDinosaurTypes: (
    options?: FindOneOptions<DinosaurTypeEntity>,
  ) => Promise<DinosaurTypeEntity[]>
  findDinosaurDiets: (
    options?: FindOneOptions<DinosaurDietEntity>,
  ) => Promise<DinosaurDietEntity[]>
  findDinosaurTimes: (
    options?: FindOneOptions<DinosaurTimeEntity>,
  ) => Promise<DinosaurTimeEntity[]>
  searchTypeDietTime: (search: string) => Promise<GraphQLSearchResult[]>
  create: (input: CreateParams) => Promise<DinosaurEntity>
  createType: (params: { name: string }) => Promise<DinosaurTypeEntity>
  createDiet: (params: { name: string }) => Promise<DinosaurDietEntity>
  createTime: (params: { name: string }) => Promise<DinosaurTimeEntity>
}

export const createDinosaursService = (
  connection: Connection,
): DinosaursService => {
  const dinosaurRepo = connection.getRepository(DinosaurEntity)
  const dinosaurTypeRepo = connection.getRepository(DinosaurTypeEntity)
  const dinosaurDietRepo = connection.getRepository(DinosaurDietEntity)
  const dinosaurTimeRepo = connection.getRepository(DinosaurTimeEntity)

  const findOne: DinosaursService['findOne'] = (conditions, options) =>
    dinosaurRepo.findOne(conditions, options)

  const findOneType: DinosaursService['findOneType'] = (conditions, options) =>
    dinosaurTypeRepo.findOne(conditions, options)

  const findOneDiet: DinosaursService['findOneDiet'] = (conditions, options) =>
    dinosaurDietRepo.findOne(conditions, options)

  const findOneTime: DinosaursService['findOneTime'] = (conditions, options) =>
    dinosaurTimeRepo.findOne(conditions, options)

  const findDinosaurs: DinosaursService['findDinosaurs'] = options =>
    dinosaurRepo.find(options)

  const findDinosaurTypes: DinosaursService['findDinosaurTypes'] = options =>
    dinosaurTypeRepo.find(options)

  const findDinosaurDiets: DinosaursService['findDinosaurDiets'] = options =>
    dinosaurDietRepo.find(options)

  const findDinosaurTimes: DinosaursService['findDinosaurTimes'] = options =>
    dinosaurTimeRepo.find(options)

  return {
    findOne,
    findOneType,
    findOneDiet,
    findOneTime,
    findDinosaurs,
    findDinosaurTypes,
    findDinosaurDiets,
    findDinosaurTimes,
    searchTypeDietTime: searchTypeDietTime({
      findOneType: (conditions, options) =>
        dinosaurTypeRepo.findOne(conditions, options),
      findOneDiet: (conditions, options) =>
        dinosaurDietRepo.findOne(conditions, options),
      findOneTime: (conditions, options) =>
        dinosaurTimeRepo.findOne(conditions, options),
    }),
    create: params =>
      connection.transaction(manager => {
        const dinosaurRepo = manager.getRepository(DinosaurEntity)
        const dinosaurTypeRepo = manager.getRepository(DinosaurTypeEntity)
        const dinosaurDietRepo = manager.getRepository(DinosaurDietEntity)
        const dinosaurTimeRepo = manager.getRepository(DinosaurTimeEntity)

        return create({
          save: entity => dinosaurRepo.save(entity),
          findOne: (conditions, options) =>
            dinosaurRepo.findOne(conditions, options),
          findOneType: (conditions, options) =>
            dinosaurTypeRepo.findOne(conditions, options),
          findOneDiet: (conditions, options) =>
            dinosaurDietRepo.findOne(conditions, options),
          findOneTime: (conditions, options) =>
            dinosaurTimeRepo.findOne(conditions, options),
        })(params)
      }),
    createType: createType({
      saveType: entity => dinosaurTypeRepo.save(entity),
      findOneType: (conditions, options) =>
        dinosaurTypeRepo.findOne(conditions, options),
    }),
    createDiet: createDiet({
      saveDiet: entity => dinosaurDietRepo.save(entity),
      findOneDiet: (conditions, options) =>
        dinosaurDietRepo.findOne(conditions, options),
    }),
    createTime: createTime({
      saveTime: entity => dinosaurTimeRepo.save(entity),
      findOneTime: (conditions, options) =>
        dinosaurTimeRepo.findOne(conditions, options),
    }),
  }
}
