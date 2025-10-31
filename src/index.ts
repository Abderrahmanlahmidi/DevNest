import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { userTypeDefs } from "./graphql/schemas/user.schema.ts";
import { userResolvers } from "./graphql/resolvers/user.resolver.ts";
import {skillResolvers} from "./graphql/resolvers/skill.resolver.ts";
import {skillTypeDefs} from "./graphql/schemas/skill.schema.ts";
import {projectResolvers} from "./graphql/resolvers/project.resolver.ts";
import {projectTypeDefs} from "./graphql/schemas/project.schema.ts";
import {experienceTypeDefs} from "./graphql/schemas/experience.schema.ts";
import {experienceResolvers} from "./graphql/resolvers/experience.resolver.ts";
import {competenceResolvers} from "./graphql/resolvers/comptence.resolver.ts";
import {competenceTypeDefs} from "./graphql/schemas/comptence.schema.ts";
import { getUserFromToken } from "./middleware/authMiddleware.ts";
import {connectDB} from "./config/db.ts";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
    const app = express();

    const baseTypeDefs = gql`
    type Query {
      _empty: String
    }

    type Mutation {
      _empty: String
    }
  `;

    const server = new ApolloServer({
        typeDefs: [baseTypeDefs, userTypeDefs, skillTypeDefs, projectTypeDefs, experienceTypeDefs, competenceTypeDefs],
        resolvers: [userResolvers, skillResolvers, projectResolvers, experienceResolvers, competenceResolvers],
        context: ({ req }) => {
            const token = req.headers.authorization?.split(" ")[1];
            const user = getUserFromToken(token);
            return { user };
        },
    });

    await server.start();
    server.applyMiddleware({ app });
    await connectDB()

    const PORT = process.env.PORT;

    app.listen(PORT, () =>
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );
}

startServer();
