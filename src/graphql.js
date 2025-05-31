import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import typeDefs from "./typeDefinitions.js";
import {categories, reviews, vehicles} from "./db.js";
import {Query} from "./resolvers/Query.js";
import {Category} from "./resolvers/Category.js";
import {Car} from "./resolvers/Car.js";
import {Vehicle} from "./resolvers/Vehicle.js";
import {VehicleSearch} from "./resolvers/VehicleSearch.js";


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Category,
        Vehicle,
        Car,
        VehicleSearch
    }
})

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