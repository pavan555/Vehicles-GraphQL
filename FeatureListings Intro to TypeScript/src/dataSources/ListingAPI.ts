import {RESTDataSource} from "@apollo/datasource-rest";
import {Amenities, CreateListingInput, Listing} from "../generated/types";
import DataLoader from "dataloader";

export class ListingAPIS extends RESTDataSource {
    override baseURL = "https://rt-airlock-services-listing.herokuapp.com/";

    private batchLoader = new DataLoader(
        async (listingIds: string[]): Promise<Amenities[][]> => {
            console.log("Making batch request for amenities with IDs:", listingIds);
            const amenities = await this.get<Amenities[][]>(`/amenities/listings`, {
                params: {
                    ids: listingIds.join(',')
                }
            });
            console.log('Batching Amenities:', amenities);
            return amenities;
        }
    )

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

    getAmenitiesById(id: string): Promise<Amenities[]> {
        console.log("Fetching amenities for listing ID:", id);
        return this.batchLoader.load(id);
    }
    
}