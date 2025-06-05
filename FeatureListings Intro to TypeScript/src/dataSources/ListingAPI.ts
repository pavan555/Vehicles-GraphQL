import {RESTDataSource} from "@apollo/datasource-rest";
import {Amenities, CreateListingInput, Listing} from "../generated/types";
import {bold} from "@graphql-codegen/cli/typings/init/helpers";

export class ListingAPIS extends RESTDataSource {
    override baseURL = "https://rt-airlock-services-listing.herokuapp.com/";

    getFeatureLists(): Promise<Listing[]> {
        return this.get<Listing[]>('featured-listings');
    }

    getFeatureListById(id: string): Promise<Listing> {
        return this.get<Listing>(`listings/${id}`);
    }

    getAmenitiesByListingId(id: string): Promise<Amenities[]>{
        return this.get<Amenities[]>(`/listings/${id}/amenities`);
    }

    createListing(listing: CreateListingInput): Promise<Listing> {
        return this.post<Listing>('listings', {
            body: {
                listing
            }
        })
    }
}