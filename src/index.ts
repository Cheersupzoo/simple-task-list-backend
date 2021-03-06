import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { ListResolver } from "./schema/resolvers/List";
import * as path from "path";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

(async () => {
  // Create GraphQL server
  const schema = await buildSchema({
    resolvers: [ListResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    cors: {
      origin: "*",
      credentials: true,
    },
    introspection: true,
  });

  // Start the server
  const { url } = await server.listen(process.env.PORT || 4000);
  /* tslint:disable-next-line */
  console.log(`Server is running, GraphQL Playground available at ${url}`);
})();
