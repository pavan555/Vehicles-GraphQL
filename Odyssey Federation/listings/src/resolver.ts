import {Resolvers} from "./generated/types";
import {validateSomeMethodsAvailable} from "./helpers";

export const resolvers: Resolvers = {
    Query: {
        hello: () => "Hello world",
        featuredListings: (parent, args, {dataSources}) => {
            return dataSources.listAPI.getFeatureLists();
        },
        featuredListing: (_, {id}, {dataSources}) => {
            return dataSources.listAPI.getFeatureListById(id);
        }
    },
    Mutation: {
        createListing: async (_, {listing}, {dataSources}) => {
            try {
                const listingResult = await dataSources.listAPI.createListing(listing);
                return {
                    code: 200,
                    success: true,
                    message: "Listing created successfully",
                    listing: listingResult
                }
            } catch (error) {
                return {
                    code: 500,
                    success: false,
                    message: error instanceof Error ? error.message : "An error occurred while creating the listing",
                    listing: null
                }
            }
        }
    },
    Listing: {
        amenities: ({id, amenities}, _, {dataSources}) => {
            return validateSomeMethodsAvailable(amenities) ? amenities : dataSources.listAPI.getAmenitiesByListingId(id)
        },
        listAmenities: ({id, amenities}, _, {dataSources}, info) => {
            return dataSources.listAPI.getAmenitiesById(id);
        }
    },
}
