import { gql } from "apollo-server-express";

export const userTypeDefs: any = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    createdAt: String!
    updatedAt: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    register(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    login(email: String!, password: String!): AuthPayload
  }
`;
