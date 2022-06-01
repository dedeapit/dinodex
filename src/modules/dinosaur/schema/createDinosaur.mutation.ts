import { MutationResolvers } from '@generated/graphql'
import { ApolloError, gql } from 'apollo-server-express'
import { DinosaursService } from '../services/dinosaurs.service'

export const typeDefs = gql`
  input CreateDinosaurInput {
    name: String!
    typeId: ID!
    length: Int
    dietId: ID!
    timeId: ID!
  }

  extend type Mutation {
    createDinosaur(input: CreateDinosaurInput!): Dinosaur!
  }
`

export interface Dependencies {
  dinosaurService: DinosaursService
}

const createResolver = (
  deps: Dependencies,
): MutationResolvers['createDinosaur'] => async (_, { input }) => {
  try {
    const { name, typeId, length, dietId, timeId } = input
    const dinosaur = await deps.dinosaurService.create({
      name,
      typeId: parseInt(typeId),
      length: length != null ? length : undefined,
      dietId: parseInt(dietId),
      timeId: parseInt(timeId),
    })

    return dinosaur.baseGraphQLObject
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new ApolloError(err.message)
  }
}

export const createResolvers = (deps: Dependencies) => ({
  Mutation: {
    createDinosaur: createResolver(deps),
  },
})
