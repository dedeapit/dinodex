import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash.merge'
import {
  createResolvers as createDinosaurResolvers,
  ResolverDependencies as DinosaurDependencies,
  typeDefs as dinosaurTypeDefs,
} from './modules/dinosaur/schema'

const rootTypeDefs = gql`
  type Query {
    _root: Boolean
  }
  type Mutation {
    _root: Boolean
  }
`

const rootResolvers = {
  Query: {
    _root: () => false,
  },
  Mutation: {
    _root: () => false,
  },
}

export type SchemaDependencies = DinosaurDependencies

export const createSchema = (deps: SchemaDependencies) =>
  makeExecutableSchema({
    typeDefs: [rootTypeDefs, ...dinosaurTypeDefs],
    resolvers: merge(rootResolvers, createDinosaurResolvers(deps)),
  })
