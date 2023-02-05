import { ApolloServer, gql } from "apollo-server"; //package.json에서    "type": "module" 를 추가해야지만 import 사용가능

const typeDefs = gql`
  type Query {
    text: String
    hello: String
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
