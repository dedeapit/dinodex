import {
  QueryResolvers,
  SearchResult as GraphQLSearchResult,
} from '@generated/graphql'
import { ApolloError, gql } from 'apollo-server-express'
import { DinosaursService } from '../services/dinosaurs.service'

export const typeDefs = gql`
  union SearchResult = DinosaurType | DinosaurDiet | DinosaurTime

  extend type Query {
    searchTypeDietTime(search: String!): [SearchResult!]!
  }
`

export interface Dependencies {
  dinosaurService: DinosaursService
}

const createResolver = (
  deps: Dependencies,
): QueryResolvers['searchTypeDietTime'] => async (_, { search }) => {
  try {
    const searchResult = await deps.dinosaurService.searchTypeDietTime(search)

    return searchResult
  } catch (err) {
    if (err instanceof ApolloError) throw err
    throw new ApolloError(err.message)
  }
}

export const createResolvers = (deps: Dependencies) => ({
  SearchResult: {
    __resolveType(obj: GraphQLSearchResult) {
      return obj.__typename
    },
  },
  Query: {
    searchTypeDietTime: createResolver(deps),
  },
})
