import {Amenities} from "./generated/types";

const hasOwnPropertyName = (amenity: Amenities): boolean => {
    return Object.prototype.hasOwnProperty.call(amenity, 'name');
}

export const validateSomeMethodsAvailable = (amenities: Amenities[]) => {
    return amenities.some(hasOwnPropertyName)
}