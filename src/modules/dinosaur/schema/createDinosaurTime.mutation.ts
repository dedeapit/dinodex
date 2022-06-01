import { MutationResolvers } from '@generated/graphql'
import { ApolloError, gql } from 'apollo-server-express'
import { DinosaursService } from '../services/dinosaurs.service'

export const typeDefs = gql`
  input CreateDinosaurTimeInput {
    name: String!
  }

  extend type Mutation {
    createDinosaurTime(input: CreateDinosaurTimeInput!): DinosaurTime!
  }
`

export interface Dependencies {
  dinosaurService: DinosaursService
}

const createResolver = (
  deps: Dependencies,
): MutationResolvers['createDinosaurTime'] => async (_, { input }) => {
  try {
    const dinosaurType = await deps.dinosaurService.createTime({
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
    createDinosaurTime: createResolver(deps),
  },
})
