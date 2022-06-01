import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type DinosaurTime {
    id: ID!
    name: String!
  }
`
