import { QueryResolvers } from '@generated/graphql'
import { ApolloError, gql } from 'apollo-server-express'
import { DinosaursService } from '../services/dinosaurs.service'

export const typeDefs = gql`
  extend type Query {
    dinosaurTypes: [DinosaurType]
  }
`

export interface Dependencies {
  dinosaurService: DinosaursService
}

const createResolver = (
  deps: Dependencies,
): QueryResolvers['dinosaurTypes'] => async () => {
  try {
    const dinosaurTypes = await deps.dinosaurService.findDinosaurTypes()

    return dinosaurTypes.map(dinosaurType => dinosaurType.baseGraphQLObject)
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new ApolloError(err.message)
  }
}

export const createResolvers = (deps: Dependencies) => ({
  Query: {
    dinosaurTypes: createResolver(deps),
  },
})
