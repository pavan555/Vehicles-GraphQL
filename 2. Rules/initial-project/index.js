import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";

const typeDefs = `#graphql

  type Car {
    id: ID!
    color: String!
    make: String!
    engineType: String!
  }


 type Group {
   id: ID!,
   name: String!,
   description: String,
   image: Image,
   cars(skip: Int = 0, offset:Int = 10): [Car!]!,
   autoGroupFeatures: AutoGroupFeatures,
 }

  type Image{
    id: ID!,
    url: URL!
  }

  type AutoGroupFeatures {
    features: [GroupFeature!]!
    applyFeatures: [ApplyFeatureCondition!]!
  }

  enum ApplyFeatureCondition {
    ALL
    ANY
  }

  enum GroupFeature{
    ELECTRIC
    HYBRID
    DIESEL
    PETROL
    TURBO
    MANUAL_GEAR
    AUTOMATIC_GEAR
  }

  type Query {
    cars: [Car!]!
    groups: [Group!]!
    group(id: ID!): Group
  }
    type Mutation{
        addCar(color: String!, make: String!, engineType: String!): Car!
        addGroup(name: String!, description: String): Group!
        addCarToGroup(groupId: ID!, carId: ID!): Group!
    }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

startStandaloneServer(server, {listen: {port: 4000}})
    .then(({url}) => {
      console.log(`🚀  Server ready at ${url}`);
    });
