
import { v4 as uuidv4 } from 'uuid';

const types = ["CAR", "TRUCK", "BIKE"];
export const Mutation = {
    addVehicle: (parent, {vehicle}, {vehicles, categories}) => {
        const {category, type, wheels = 2, make, model, capacity, logs} = vehicle;
        if (!categories.find(cat => cat.id === category)) {
            throw new Error("Category not found");
        }

        if(!types.includes(type)) {
            throw new Error("Invalid vehicle type");
        }

        const newVehicle = {
            id: uuidv4(),
            type,
            wheels,
            category,
            make,
            model,
            capacity,
            logs,
            onSale: vehicle.onSale,
        };
        vehicles.push(newVehicle);
        return newVehicle;
    },

    addCategory: (parent, {name}, {categories}) => {

        if (categories.find(cat => cat.name === name)) {
            throw new Error("Category already exists");
        }

        const newCategory = {
            id: uuidv4(),
            name,
        };
        categories.push(newCategory);
        return newCategory;
    },

    addReview: (parent, {reviewData, productId}, {reviews, vehicles}) => {
        if(!vehicles.find(v => v.id===productId)) {
            throw new Error("Vehicle not found");
        }
        const newReview = {
            id: uuidv4(),
            ...reviewData,
            productId,
        };
        reviews.push(newReview);
        return newReview
    },
    // Purpose Built Mutations
    updateReviewComment:(parent, {id, comment}, {reviews}) => {
        const reviewIdx = reviews.findIndex(r => r.id === id);
        if(reviewIdx === -1) {
            throw new Error(`Review not found with id ${id}`);
        }

        const updatedReview = {
            ...reviews[reviewIdx],
            comment,
        };

        reviews[reviewIdx] = updatedReview;
        return updatedReview;
    },
    deleteReview: (parent, {id},  {reviews}) => {
        const reviewIdx = reviews.findIndex(r => r.id === id);
        if(reviewIdx === -1) {
            throw new Error(`Review not found with id ${id}`);
        }

        const deletedReview = reviews[reviewIdx];
        reviews.splice(reviewIdx, 1);
        return deletedReview;
    }
}