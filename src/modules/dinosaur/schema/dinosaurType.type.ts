import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type DinosaurType {
    id: ID!
    name: String!
  }
`
