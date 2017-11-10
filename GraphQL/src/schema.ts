import { graphql, buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import emoji from './emoji';

export const schema = buildSchema(`
  type Emoji {
    no: ID!
    code: String!
    char: String!
    name: String!
    date: String!
    keywords: [String!]!
  }
  type Query {
    emojis: [Emoji!]!
    relatedEmoji(keyword: String!): [Emoji!]!
  }
  type Mutation {
    createNewEmoji(input: EmojiInput): Emoji
    updateEmoji(id: ID!, input: EmojiInput): Emoji
    deleteEmoji(id: ID!): [Emoji]
  }
  input EmojiInput {
    code: String!
    char: String!
    name: String!
    date: String!
    keywords: [String!]!
  }
`);


export const rootValue = {
  emojis: () => Object.keys(emoji).map(id => emoji[id]),
  // relatedEmoji: ({ keyword }) => Object.keys(emoji)
  //   .map(id => emoji[id])
  //   .filter(emoji => emoji['keywords'].includes(keyword) ? emoji : null),
  // createNewEmoji: ({ input }) => {
  //   const newEmoji = emoji[Object.keys(emoji).length + 1] = input;
  //   const id = Object.keys(emoji).length;
  //   newEmoji['no'] = id;
  //   return newEmoji;
  // },
  // updateEmoji: ({ id, input }) => {
  //   emoji[id] = input;
  //   emoji[id]['no'] = id;
  //   return emoji[id];
  // },
  // deleteEmoji: ({ id }) => {
  //   delete emoji[id];
  //   return Object.keys(emoji).map(id => emoji[id]);
  // }
}