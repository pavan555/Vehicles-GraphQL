import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import typeDefs from "./typeDefinitions.js";
import {categories, reviews, vehicles} from "./db.js";
import {Query} from "./resolvers/Query.js";
import {Category} from "./resolvers/Category.js";
import {Bike, Car} from "./resolvers/Car.js";
import {Vehicle} from "./resolvers/Vehicle.js";
import {VehicleSearch} from "./resolvers/VehicleSearch.js";
import {Mutation} from "./resolvers/Mutation.js";
import {GraphQLError, Kind} from 'graphql';

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Category,
        Vehicle,
        Car,
        Bike,
        VehicleSearch,
        Mutation,
        Date: {
            __serialize(value) {
                console.log("valu --->>e", value)
                return value.toISOString(); // Serialize Date to ISO string
            },
            __parseValue(value) {
                console.log("value", value)
                return new Date(value); // Parse ISO string to Date
            },
            __parseLiteral(ast) {
                console.log("valasdsfdue", ast)
                if (ast.kind === 'StringValue') {
                    return new Date(ast.value); // Parse AST string to Date
                }
                return null; // Invalid AST kind
            },
            __name: "Date",
            __description: "Custom Date scalar type for handling date values",
            __specifiedByURL: "https://graphql.org/learn/schema/#scalar-types"
        },
        URL: {
            __name: "URL",
            __description: "Custom scalar type for handling URL values",
            __serialize: (outputValue) => {
                return outputValue.toString();
            },
            __parseValue(inputValue) {
                console.log("inputValue", inputValue);
                try{
                    return new URL(inputValue);
                }catch (e) {
                    console.error("Invalid URL format:", inputValue, e);
                }
                throw new GraphQLError("Invalid URL format");
            },
            __parseLiteral (ast) {
                console.log("ast", ast);
                if (ast.kind === Kind.STRING) {
                    console.log("This", this)
                    // return this.parseValue(ast.value);
                }console.log("This---->", this)
                return null; // Invalid AST kind
            }
        },
        IPAddress: {
            __name: "IPAddress",
            __description: "This is a custom scalar in which you can pass IP Address",
            __parseValue(inputValue) {
                var regex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
                if (regex.test(inputValue)) {
                    return inputValue;
                }
                throw new GraphQLError("Invalid IP Address");
            },
            __parseLiteral(ast) {
                console.log("AST", ast)
                if (ast.kind === Kind.STRING) {
                    return this.__parseValue(ast.value)
                }
                return null;
            }
        }
    },
});

const server = startStandaloneServer(apolloServer, {
    listen: {port: 4000}, context: () => ({
        categories,
        vehicles,
        reviews
    })
}).then(({url}) => {
    console.log(`🚀  Server ready at: ${url}`);
}).catch((e) => {
    console.log("error in server", e);
});

console.log("SERVER,", server)