import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import schema from './graphql/schema';
import router from './routers';

// Database setup
mongoose.Promise = global.Promise; // Using Promise library
mongoose.connect('mongodb://localhost/reactUniversally', {
  useMongoClient: true,
}); // '.../auth' - name of the database

const server = express();
server.use(bodyParser.json({ type: '*/*' }));
server.use(cors({ origin: 'http://localhost:3000' }));

server.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
  }),
);

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);
router.auth(server);

const port = 1338;
server.listen(port, () => {
  console.log('API Listening on', port);
});
