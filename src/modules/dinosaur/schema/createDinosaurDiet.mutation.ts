import { MutationResolvers } from '@generated/graphql'
import { ApolloError, gql } from 'apollo-server-express'
import { DinosaursService } from '../services/dinosaurs.service'

export const typeDefs = gql`
  input CreateDinosaurDietInput {
    name: String!
  }

  extend type Mutation {
    createDinosaurDiet(input: CreateDinosaurDietInput!): DinosaurDiet!
  }
`

export interface Dependencies {
  dinosaurService: DinosaursService
}

const createResolver = (
  deps: Dependencies,
): MutationResolvers['createDinosaurDiet'] => async (_, { input }) => {
  try {
    const dinosaurType = await deps.dinosaurService.createDiet({
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
    createDinosaurDiet: createResolver(deps),
  },
})
