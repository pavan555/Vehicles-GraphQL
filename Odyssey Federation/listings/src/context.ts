import {ListingAPIS} from "./dataSources/ListingAPI";

export type DataSourcesContext = {
    dataSources: {
        listAPI: ListingAPIS
    }
}