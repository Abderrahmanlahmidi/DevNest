import { gql } from "apollo-server-express";

export const skillTypeDefs = gql`
  type Skill {
    _id: ID!
    name: String!
    level: Int
    category: String
    description: String
    icon: String
    userId: ID!
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    userSkills(userId: ID!): [Skill!]!
  }

  extend type Mutation {
    createSkill(
      name: String!
      level: Int
      category: String
      description: String
      icon: String
      userId: ID!
    ): Skill!

    updateSkill(
      id: ID!
      name: String
      level: Int
      category: String
      description: String
      icon: String
    ): Skill!

    deleteSkill(id: ID!): Skill!
  }
`;
