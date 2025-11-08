import { gql } from "apollo-server-express";

export const competenceTypeDefs = gql`
  type Competence {
    _id: ID!
    name: String!
    level: String
    category: String
    description: String
    userId: ID!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getUserCompetences(userId: ID!): [Competence!]!
    allCompetences:[Competence]
    competence(id: ID!): Competence
  }

  type Mutation {
    createCompetence(
      name: String!
      level: String
      category: String
      description: String
      userId: ID!
    ): Competence

    updateCompetence(
      id: ID!
      name: String
      level: String
      category: String
      description: String

    ): Competence

    deleteCompetence(id: ID!): Competence
  }
`;
