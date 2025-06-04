export const Car = {
    categoryData: (parent, args, {categories}) => {
        console.log("parent ", parent, "args", args);
        return categories.find(c => c.id === parent.category);
    },
    reviews: (parent, args, {reviews}) => {
        console.log("parent ", parent, "args", args);
        return reviews.filter(r => r.productId === parent.id);
    }
}

export const Bike = {
    reviews: (parent, args, {reviews}) => {
        console.log("parent ", parent, "args", args);
        return reviews.filter(r => r.productId === parent.id);
    }
}