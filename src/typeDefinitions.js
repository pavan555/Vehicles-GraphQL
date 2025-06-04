
export const typeDefs = `#graphql

type name {
    firstName: String!
    lastName: String!
}

type Data{
    queries: [Query]!
}

enum gender {
    MALE,
    FEMALE
}
enum VehicleType {
    CAR,
    BIKE,
    TRUCK
}
""" This is a vehicle type schema """
interface Vehicle {
    id: ID!
    type: VehicleType!,
    wheels: Int!
    category: ID!
    categoryData: Category
    reviews: [Review!]
    onSale: Boolean!
}


""" This is a car vehicle type schema """
type Car implements Vehicle {
    id: ID!
    type: VehicleType!
    wheels: Int!
    make: String!
    model: String!
    category: ID!
    categoryData: Category,
    reviews: [Review!],
    onSale: Boolean!
}
""" This is a Bike vehicle type schema """
type Bike implements Vehicle {
    id: ID!
    type: VehicleType!
    wheels: Int!
    model: String!
    category: ID!
    categoryData: Category,
    reviews: [Review!],
    onSale: Boolean!
}
type Truck implements Vehicle {
    id: ID!
    type: VehicleType! """ This is a Truck vehicle type schema """
    wheels: Int!
    capacity: Int!
    category: ID!
    categoryData: Category,
    reviews: [Review!]
    onSale: Boolean!
}

type LogTruck {
    id: ID!
    type: VehicleType!
    capacity: Int!
    category: ID!
    wheels: Int!
    logs: [String]! @deprecated(reason: "No longer supported logs"),
    reviews: [Review!]
    onSale: Boolean!
}

# This is a union type for searching vehicles
union VehicleSearch = Car | Bike | Truck | LogTruck

input vehicleEntry {
    category: ID!
    type: VehicleType!
    wheels: Int!
    make: String
    model: String
    capacity: Int
    logs: [String]
    onSale: Boolean = false
}

"""
This is category schema for Cars
"""
type Category {
    id: ID!,
    name: String! "category name which is Sedan, SUV, Sports etc"
    products(filterSearch: filterSearch): [VehicleSearch]
}
"""
This is review type
"""
type Review {
    id: ID!
    date: String!, 
    title: String!, 
    comment: String!,
    rating: Int!,
    productId: ID!
}

"""
This is input type for filtering vehicles 
"""
input filterSearch {
    onSale: Boolean!
    avgRating: Int
}

"""
This is the root query type, it contains all available queries
"""
type Query {
    hello: String,
    name: [String]!,
    age: Int!,
    gender: gender!
    d1: Data,
    categories: [Category!]!
    category(id: ID!):  Category,
    vehicles(filterSearch: filterSearch): [VehicleSearch!]!,
}

input ReviewData{
    title: String!,
    comment: String!,
    rating: Int!
}

type Mutation {
    addVehicle(vehicle: vehicleEntry!): VehicleSearch!
    addCategory(name: String!): Category!
    addReview(productId: ID!, reviewData: ReviewData!): Review!
    updateReviewComment(id: ID!, comment: String!): Review!,
    deleteReview(id: ID!): Review!
    updateDate(id: ID!,updateDate: UpdateDate ): URL
}

input UpdateDate{
    date: Date!, 
    url: URL!,
    iPAddress: IPAddress = "192.189123.2.1"
}
scalar Date @specifiedBy(url: "https://graphql.org/learn/schema/#scalar-types")
scalar URL @specifiedBy(url: "https://google.com")
scalar IPAddress

`

export default typeDefs;
