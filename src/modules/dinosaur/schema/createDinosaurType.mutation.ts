import { MutationResolvers } from '@generated/graphql'
import { ApolloError, gql } from 'apollo-server-express'
import { DinosaursService } from '../services/dinosaurs.service'

export const typeDefs = gql`
  input CreateDinosaurTypeInput {
    name: String!
  }

  extend type Mutation {
    createDinosaurType(input: CreateDinosaurTypeInput!): DinosaurType!
  }
`

export interface Dependencies {
  dinosaurService: DinosaursService
}

const createResolver = (
  deps: Dependencies,
): MutationResolvers['createDinosaurType'] => async (_, { input }) => {
  try {
    const dinosaurType = await deps.dinosaurService.createType({
      name: input.name,
    })

    return dinosaurType.baseGraphQLObject
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new ApolloError(err.message)
  }
}

export const createResolvers = (deps: Dependencies) => ({
  Mutation: {
    createDinosaurType: createResolver(deps),
  },
})
