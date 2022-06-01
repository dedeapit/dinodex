import { QueryResolvers } from '@generated/graphql'
import { ApolloError, gql } from 'apollo-server-express'
import { DinosaursService } from '../services/dinosaurs.service'

export const typeDefs = gql`
  extend type Query {
    dinosaurTimes: [DinosaurTime]
  }
`

export interface Dependencies {
  dinosaurService: DinosaursService
}

const createResolver = (
  deps: Dependencies,
): QueryResolvers['dinosaurTimes'] => async () => {
  try {
    const dinosaurTimes = await deps.dinosaurService.findDinosaurTimes()

    return dinosaurTimes.map(dinosaurTime => dinosaurTime.baseGraphQLObject)
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new ApolloError(err.message)
  }
}

export const createResolvers = (deps: Dependencies) => ({
  Query: {
    dinosaurTimes: createResolver(deps),
  },
})
