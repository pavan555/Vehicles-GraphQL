import {getFilteredVehiclesBasedOnFilterObject} from "./Category.js";

export const Query = {
    hello: () => "Hello world!",
    name: () => ["Pavan", "Kumar"],
    age: () => "25",
    gender: () => "MALE",
    d1: () => "Hello world!",
    searchVehicle: (parent, {type}, {vehicles}) => {
        console.log("SEARCH VEHICLE", type, parent);
        return vehicles.filter(v => v.type === type);
    },
    updateVehicle: (parent, {vehicle}, {vehicles}) => {
        vehicles.push(vehicle);
        console.log("VEHICLES", vehicles);
        return vehicle;
    },
    categories: (parent, args, context) => context.categories,
    category: (parent, args, {categories}) => {
        const id = args.id;
        return categories.find(c => c.id === id);
    },
    vehicles: (parent, {filterSearch}, {vehicles, reviews}) => {
        console.log("args", filterSearch);
        return getFilteredVehiclesBasedOnFilterObject(filterSearch, {vehicles, reviews});
    }
}