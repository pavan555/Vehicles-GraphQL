import {getFilteredVehiclesBasedOnFilterObject} from "./Category.js";

export const Query = {
    hello: () => "Hello world!",
    name: () => ["Pavan", "Kumar"],
    age: () => "25",
    gender: () => "MALE",
    d1: () => "Hello world!",
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