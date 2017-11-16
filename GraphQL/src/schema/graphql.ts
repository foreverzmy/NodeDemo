import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} from 'graphql/type';

import User from './user';
import { userInfo } from 'os';

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User creator',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the user.'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the user.',
    },
    friends: {
      type: new GraphQLList(userType),
      description: 'The friends of the user, or an empty list if they have none.',
      resolve() { }
    }
  }
})