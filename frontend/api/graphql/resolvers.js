import User from '../models/User';

const posts = [
  {
    id: 1,
    title: 'soccer',
  },
  {
    id: 2,
    title: 'baseball',
  },
];

const resolvers = {
  Query: {
    posts: () => posts,
    users: () => User.find({}, (err, users) => users),
  },
};
export default resolvers;
