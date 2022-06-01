import {
  DinosaurDiet as GraphQLDinosaurDiet,
  DinosaurTime as GraphQLDinosaurTime,
  DinosaurType as GraphQLDinosaurType,
  SearchResult as GraphQLSearchResult,
} from '@generated/graphql'
import { DinosaurDietEntity } from '@modules/dinosaur/entities/dinosaurDiet.entity'
import { DinosaurTimeEntity } from '@modules/dinosaur/entities/dinosaurTime.entity'
import { DinosaurTypeEntity } from '@modules/dinosaur/entities/dinosaurType.entity'
import { FindConditions, FindOneOptions } from 'typeorm'
import { DinosaursService } from '.'

interface Dependencies {
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

export const searchTypeDietTime = (
  deps: Dependencies,
): DinosaursService['searchTypeDietTime'] => {
  return async search => {
    const searchResult = [] as GraphQLSearchResult[]
    const dinosaurType = await deps.findOneType({
      name: search,
    })
    if (dinosaurType != null) {
      searchResult.push((dinosaurType as unknown) as GraphQLDinosaurType)
      searchResult[searchResult.length - 1].__typename = 'DinosaurType'
    }
    const dinosaurDiet = await deps.findOneDiet({
      name: search,
    })
    if (dinosaurDiet != null) {
      searchResult.push((dinosaurDiet as unknown) as GraphQLDinosaurDiet)
      searchResult[searchResult.length - 1].__typename = 'DinosaurDiet'
    }
    const dinosaurTime = await deps.findOneTime({
      name: search,
    })
    if (dinosaurTime != null) {
      searchResult.push((dinosaurTime as unknown) as GraphQLDinosaurTime)
      searchResult[searchResult.length - 1].__typename = 'DinosaurTime'
    }

    return searchResult
  }
}
