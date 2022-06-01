import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Dinosaur {
    id: ID!
    name: String!
    type: DinosaurType!
    length: Int
    diet: DinosaurDiet!
    time: DinosaurTime!
  }
`
