
export const Vehicle = {
    __resolveType(obj) {
        switch (obj.wheels) {
            case 2:
                return "Bike"
            case 3:
                return "Auto"
            case 4:
                return "Car"
            case 6:
                return "Truck"
            default:
                return null; // GraphQLError is thrown if no type is returned
        }
    }
}