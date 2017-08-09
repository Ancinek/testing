import {
  ApolloClient,
  createNetworkInterface, // <-- this line is new!
} from 'react-apollo';

// Create Apollo Client for integration with GraphQL
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql',
});

export default new ApolloClient({
  networkInterface,
});
