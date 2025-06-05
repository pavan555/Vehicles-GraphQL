import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone";
import {ListingAPIS} from "./dataSources/ListingAPI";
import * as fs from "node:fs";
import gql from "graphql-tag";
import * as path from "node:path";
import {DataSourcesContext} from "./context";
import {resolvers} from "./resolver";


const typeDefs = gql(fs.readFileSync(path.resolve(__dirname, '../src/schema.graphql'), 'utf-8'));


// Create an instance of ApolloServer with the type definitions and resolvers
const server = new ApolloServer<DataSourcesContext>({typeDefs, resolvers});


// Start the server and listen on port 4000
startStandaloneServer(server, {
    listen: {port: 4000},
    context: async () => {
        const {cache} = server;
        return {
            dataSources: {
                listAPI: new ListingAPIS({cache})
            }
        }
    }
})
    .then(({url}) => {
        console.log(`🚀 Server ready at ${url}`);
    }).catch((error) => {
    console.error("Error starting server:", error);
});