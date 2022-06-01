import { QueryResolvers } from '@generated/graphql'
import { ApolloError, gql } from 'apollo-server-express'
import { DinosaursService } from '../services/dinosaurs.service'

export const typeDefs = gql`
  extend type Query {
    dinosaurs: [Dinosaur!]!
  }
`

export interface Dependencies {
  dinosaurService: DinosaursService
}

const createResolver = (
  deps: Dependencies,
): QueryResolvers['dinosaurs'] => async () => {
  try {
    const dinosaurs = await deps.dinosaurService.findDinosaurs({
      relations: ['type', 'diet', 'time'],
    })

    return dinosaurs.map(dinosaur => dinosaur.baseGraphQLObject)
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new ApolloError(err.message)
  }
}

export const createResolvers = (deps: Dependencies) => ({
  Query: {
    dinosaurs: createResolver(deps),
  },
})
