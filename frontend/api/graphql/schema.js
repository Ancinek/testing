import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type Post {
    id: ID!
    title: String
  }
  type User {
    id: ID!
    email: String
  }
  type Query {
    posts: [Post]
    users: [User]
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
