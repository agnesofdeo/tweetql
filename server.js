import { ApolloServer, gql } from "apollo-server"; //package.json에서    "type": "module" 를 추가해야지만 import 사용가능
let tweets = [
  {
    id: "1",
    text: "first one!",
    userId: "2",
  },
  {
    id: "2",
    text: "second one",
    userId: "1",
  },
];

let users = [
  {
    id: "1",
    firstName: "Nico",
    lastName: "las",
  },
  { id: "2", firstName: "Elon", lastName: "Musk" },
];
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resorvers = {
  Query: {
    tweet() {
      console.log("I'm called");
      console.loot(root);
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      console.log("allUsers called!");
      return users;
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false; // 존재하지 않는 id로 테스트 하면 false
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true; // 존재하는 id면 true로 받고 실제로 tweets는 정리
    },
  },
  User: {
    firstName({ firstName }) {
      return firstName;
    },
    fullName() {
      console.log("fullName called!");
      return "hello";
    },
  },
  Tweet: {
    author({ userId }) {
      return users.find((user) => user.id === userId);
    },
  },
};
const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
