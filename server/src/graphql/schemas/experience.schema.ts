import { gql } from "apollo-server-express";

export const experienceTypeDefs = gql`
  type Experience {
    _id: ID!
    title: String!
    company: String
    startDate: String
    endDate: String
    description: String
    location: String
    type: String
    userId: ID!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getUserExperiences(userId: ID!): [Experience!]!
    allExperiences:[Experience]
    experience(id: ID!): Experience
  }

  type Mutation {
    createExperience(
      title: String!
      company: String
      startDate: String
      endDate: String
      description: String
      location: String
      type: String
      userId: ID!
    ): Experience

    updateExperience(
      id: ID!
      title: String
      company: String
      startDate: String
      endDate: String
      description: String
      location: String
      type: String
    ): Experience

    deleteExperience(id: ID!): Experience
  }
`;
