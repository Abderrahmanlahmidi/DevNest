import { gql } from "apollo-server-express";

export const projectTypeDefs = gql`
  type Project {
    _id: ID!
    title: String!
    description: String
    technologies: String
    startDate: String
    status: String
    githubUrl: String
    liveUrl: String
    image: String
    userId: ID!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getUserProjects(userId: ID!): [Project!]!
  }

  type Mutation {
    createProject(
      title: String!
      description: String
      technologies: String
      startDate: String
      status: String
      githubUrl: String
      liveUrl: String
      image: String
      userId: ID!
    ): Project

    updateProject(
      id: ID!
      title: String
      description: String
      technologies: String
      startDate: String
      status: String
      githubUrl: String
      liveUrl: String
      image: String
    ): Project

    deleteProject(id: ID!): Project
  }
`;
