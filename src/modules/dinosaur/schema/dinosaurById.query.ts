import { QueryResolvers } from '@generated/graphql'
import { ApolloError, gql } from 'apollo-server-express'
import { DinosaursService } from '../services/dinosaurs.service'

export const typeDefs = gql`
  extend type Query {
    dinosaurById(id: ID!): Dinosaur
  }
`

export interface Dependencies {
  dinosaurService: DinosaursService
}

const createResolver = (
  deps: Dependencies,
): QueryResolvers['dinosaurById'] => async (_, { id }) => {
  try {
    const dinosaur = await deps.dinosaurService.findOne(
      { id: parseInt(id) },
      { relations: ['type', 'diet', 'time'] },
    )

    if (dinosaur == null) {
      throw new ApolloError(`Dinosaur with id=${id} not found`)
    }

    return dinosaur.baseGraphQLObject
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new ApolloError(err.message)
  }
}

export const createResolvers = (deps: Dependencies) => ({
  Query: {
    dinosaurById: createResolver(deps),
  },
})
