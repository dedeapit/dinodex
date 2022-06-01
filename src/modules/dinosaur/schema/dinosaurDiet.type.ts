import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type DinosaurDiet {
    id: ID!
    name: String!
  }
`
