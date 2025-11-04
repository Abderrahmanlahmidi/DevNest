import { gql } from "apollo-server-express";
import { userTypeDefs } from "./userTypeDefs";

const baseTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [baseTypeDefs, userTypeDefs];
