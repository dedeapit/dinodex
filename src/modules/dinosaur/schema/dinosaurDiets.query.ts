import { QueryResolvers } from '@generated/graphql'
import { ApolloError, gql } from 'apollo-server-express'
import { DinosaursService } from '../services/dinosaurs.service'

export const typeDefs = gql`
  extend type Query {
    dinosaurDiets: [DinosaurDiet]
  }
`

export interface Dependencies {
  dinosaurService: DinosaursService
}

const createResolver = (
  deps: Dependencies,
): QueryResolvers['dinosaurDiets'] => async () => {
  try {
    const dinosaurDiets = await deps.dinosaurService.findDinosaurDiets()

    return dinosaurDiets.map(dinosaurDiet => dinosaurDiet.baseGraphQLObject)
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new ApolloError(err.message)
  }
}

export const createResolvers = (deps: Dependencies) => ({
  Query: {
    dinosaurDiets: createResolver(deps),
  },
})
