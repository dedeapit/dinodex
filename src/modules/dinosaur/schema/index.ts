import merge from 'lodash.merge'
import * as createDinosaurMutation from './createDinosaur.mutation'
import * as createDinosaurDietMutation from './createDinosaurDiet.mutation'
import * as createDinosaurTimeMutation from './createDinosaurTime.mutation'
import * as createDinosaurTypeMutation from './createDinosaurType.mutation'
import * as dinosaurType from './dinosaur.type'
import * as dinosaurByIdQuery from './dinosaurById.query'
import * as dinosaurDietType from './dinosaurDiet.type'
import * as dinosaurDietsQuery from './dinosaurDiets.query'
import * as dinosaursQuery from './dinosaurs.query'
import * as dinosaurTimeType from './dinosaurTime.type'
import * as dinosaurTimesQuery from './dinosaurTimes.query'
import * as dinosaurTypeType from './dinosaurType.type'
import * as dinosaurTypesQuery from './dinosaurTypes.query'
import * as searchTypeDietTimeQuery from './searchTypeDietTime.query'

export const typeDefs = [
  dinosaurType.typeDefs,
  dinosaurTypeType.typeDefs,
  dinosaurDietType.typeDefs,
  dinosaurTimeType.typeDefs,

  dinosaursQuery.typeDefs,
  dinosaurByIdQuery.typeDefs,
  dinosaurTypesQuery.typeDefs,
  dinosaurDietsQuery.typeDefs,
  dinosaurTimesQuery.typeDefs,
  searchTypeDietTimeQuery.typeDefs,

  createDinosaurMutation.typeDefs,
  createDinosaurTypeMutation.typeDefs,
  createDinosaurDietMutation.typeDefs,
  createDinosaurTimeMutation.typeDefs,
]

export type ResolverDependencies = dinosaursQuery.Dependencies &
  dinosaurByIdQuery.Dependencies &
  dinosaurTypesQuery.Dependencies &
  dinosaurDietsQuery.Dependencies &
  dinosaurTimesQuery.Dependencies &
  searchTypeDietTimeQuery.Dependencies &
  createDinosaurMutation.Dependencies &
  createDinosaurTypeMutation.Dependencies &
  createDinosaurDietMutation.Dependencies &
  createDinosaurTimeMutation.Dependencies

export const createResolvers = (deps: ResolverDependencies) =>
  merge(
    dinosaursQuery.createResolvers(deps),
    dinosaurByIdQuery.createResolvers(deps),
    dinosaurTypesQuery.createResolvers(deps),
    dinosaurDietsQuery.createResolvers(deps),
    dinosaurTimesQuery.createResolvers(deps),
    searchTypeDietTimeQuery.createResolvers(deps),
    createDinosaurMutation.createResolvers(deps),
    createDinosaurTypeMutation.createResolvers(deps),
    createDinosaurDietMutation.createResolvers(deps),
    createDinosaurTimeMutation.createResolvers(deps),
  )
