import {vehicles} from "../db.js";

export const Category = {
    products: (parent, {filterSearch}, {vehicles, reviews}) => {
        console.log("parent ", parent);
        // Assuming 'vehicles' is an array of vehicle objects
        let filteredVehicles = vehicles.filter(v => v.category === parent.id);
        return getFilteredVehiclesBasedOnFilterObject(filterSearch, {vehicles: filteredVehicles, reviews});
    }
}

export const getFilteredVehiclesBasedOnFilterObject = (filterSearch, {vehicles, reviews}) => {
    let filteredVehicles = vehicles;
    // For simplicity, returning the first vehicle
    if(Object.keys(filterSearch || {}).length !== 0) {
        const {onSale, avgRating} = filterSearch || {};
        if(["true", "false"].includes(onSale.toString())) {
            filteredVehicles = vehicles.filter(v => v.onSale === onSale)
        }
        if(avgRating) {
            const ratings = reviews.reduce((acc, review) => {
                acc[review.productId] = (acc[review.productId] || []).concat(review.rating);
                return acc;
            }, {});

            filteredVehicles = filteredVehicles.filter(v => {
                const productReviews = ratings[v.id] || [];
                const averageRating = (productReviews.reduce((sum, rating) => sum + rating) / productReviews.length) || 0;
                console.log("Average Rating for", v.id, v.model, "is", averageRating);
                return averageRating >= avgRating;
            });
        }
    }
    return filteredVehicles;
}