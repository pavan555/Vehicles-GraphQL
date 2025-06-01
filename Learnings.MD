GraphQL  Rough notes

## Type Definitions

## Types ->
* Schema definition language
* 6 kinds of named type definitions

### 1. Object Type
* GraphQL schema’s basic component type is **_Object_**, which represents what kind of object you can fetch from ur service and what fields it has.
* _query, mutation, subscription_
* Every GraphQL Schema must support “query” , _the entry point for root operation type is called “Query” by default._
> * **Arguments**: 
>  * Unlike other programming languages, GraphQL only supports named arguments.

### 2. Leaf Node types:
Types are assumed to be nullable and singular by default in GraphQL
> Scalar -> Int, String, Float, Boolean, ID
### 3. Enum -> predefined set of finite values


#### type modifiers
    Non null -> !
    list -> []

### 4. interface type
> abstract type, other types will implement this and write their own definition
  ```graphql 
      interface Vehicle {
           name: String!,
           model: String!,
           wheels: Int!,
      }
   ```

### 5. Union Type, 
> abstract type
> 
> shouldn’t be interface or union, it should be concrete graphql object type
   union Car| Bike | Truck | LargeTruck | Person

### 6. input type 
> to update data/create data

> Scalars are used to provide simple data in the leaf nodes, to provide compelx data objects  (useful when creating data)  we use input type
```graphql
input VehicleData {
    name: String!,
    model: String!,
    wheels: Int!,
    price: Float!
}
```

#### Descriptions 
client can see this, we can add these by """     """ (multi-line) or " " (single line) (markdown syntax)

#### comments
can be added by us using # and can't be seen by client

The __typename field is a special meta-field that automatically exists on every Object type and resolves to the name of that type, providing a way to differentiate between data types on the client.

    

     directive ->  (Need clarity)
		In certain instances where field arguments are insufficient or certain common behaviors must be replicated in multiple locations, directives allow us to modify parts of a GraphQL schema or operation by using an @ character followed by the directive’s name.
		Type system directives
        allow us to annotate the types, fields, and arguments in a schema so that they may be validated or executed differently.



## Unlike Rest, GraphQL doesn’t return all the data, it will return only what requested

Since GraphQL is a powerful tool for client to request  data what they need. So we need to define the leaf nodes in the query should be of type scalar.
We have to define what we want in GraphQL, so the requested data should be scalar (the leaf nodes should be scalar)

GraphQL lets client to fetch lots of related data at once instead of making multiple calls/multiple round trip calls like REST.


## GraphQL Query
### Fields
A selection set is primarily composed of fields. A field describes one discrete piece of information available to request within a selection set. At its simplest, GraphQL is about asking for specific fields on objects

GraphQL document always start with root type Query, from there onwards we must specify the selected set of fields all the way upto leaf nodes which are of type Scalar or Enum.


> GraphQL Request -> The response from the GraphQL Server will be as below
```json
{
  "data": {}, //actual result will be inside data
  "errors": {} // if there are any errors the errors will be in this key
}
```
Example
```graphql
query {
    hero {
        name
        friends {
            age
            name
        }
    }

}
```

Result:
```json
{
  "data": {
    "hero": {
      "name": "Pavan",
      "friends": [
        {
          "name": "Sarath",
          "age": 27
        },
        {
          "name": "Sandeep",
          "age": 27
        }
      ]
    }
  }
}
```


### Arguments:
Along with selection of fields, we can also pass arguments  for every field and nested object types and leaf nodes also.

> Each Operation will have types either query, mutation or subscription and each operation may or may not have the operation name, if there is a name it will be helpful in debugging purposes

### Aliases
If we want to return the response with different key, we can use Aliases, what it differs from normal aliasing is we can actually perform different set of queries on same fields using aliases.

Example:
```graphql
query {
    pavan: age(name="PAVAN"),
    s1: age(name="S1"),
}
```
Result:
```json
{
  "data": {
    "pavan": 24,
    "s1": 22
  }
}
```

### Variables

What if we want to pass a dynamic arguments to a field or leaf node, we can use variables for that purpose.

We can actually construct a query string with the dynamic value and pass that query string to server, but it’s not ideal.
GraphQL has a first class way to factor dynamic values out of the query and pass them as separate dictionary, These values are called variables.

When we’re working with variables we need to the following 3 steps.
1. Wherever we need variable we should declare it as **_$variableName_** (i.e. Replace static variables in the query  with this)
2. This **_$variableName_** should be declared in the query as one of accepted variables.
3. Pass **_variableName_**: value in the separate , transport specific variables dictionary (usually JSON)

Example
```graphql
query carDetails($engineType: EngineType, $wheels:Int!=4) {
    car(engineType: $engineType){
        name
        ownedBy
        wheels(wheels: $wheels)
    }
}

```
**Variabels**
```json
{
  "engineType": "PETROL"
}
```
RESULT
```json
{
  "data": [
    {
      "name": "Fortuner",
      "ownedBy": "pavan",
      "wheels": 4
    },
    {
      "name": "Innova",
      "ownedBy": "sandeep",
      "wheels": 4
    }
  ]
}
```

All declared variables must be either Scaler, Enum or Input Object Types. 

So if we want to pass complex input object type we need to know that type that’s declared in server.

Variables definitions can be optional, if variable is required we should pass ! (Non-null) specifier.
We can also pass default variables at the variables declaration in the query. If any variables are passed as the variables dictionary, they will override the defaults.


### Fragments

Reusable units in graphQL are called as fragments, fragments lets you build a set of fields and then include in the queries when needed.
* A fragment is a reusable selection set of fields that can be used as needed in multiple queries

Example:
```graphql
query vehicleDetails($engineType: EngineType! = PETROL){

    cars: vehicle(wheels: 4) {
        ...carFields
    },
    bikes: vehicle(wheels: 2) {
        ...vehicleFields
    }

    trucks: vehicle(wheels: 6){
        __typename
        ... on Truck { # --> Inline fragments (anonymous fragments)
            logs
        }
        ... on Vehicle{
            name
            engineType(type: $engineType)
        }
    }
}

fragment vehicleFields on Vehicle { # --> named fragments (or just fragments)
    name,
    wheels,
    engineType(type: $engineType)
}

fragment carFields on Car {
    __typename,
    ...vehicleFields
}

```
You can see how the above query would be pretty repetitive if we weren’t able to use fragments


### Meta fields
1. GraphQL returns object type using the meta fields in the query __typename.
2. All the fields names that starts with __ (underscore underscore) are reserved by GraphQL.
3. GraphQL provides __schema, __type, __typename meta fields.




## GraphQL Mutation

The process of manipulating data is known as Mutation. 

Mutation  is one of the object types of GraphQL. This is the entry point for root type mutation.

Manipulation Operations Includes: CREATE, UPDATE, DELETE.

In REST, any request might cause manipulations or side-effects, but in general convention, we shouldn’t use GET method to modify the data.

> GraphQL is also similar, technically any field resolver could be implemented to cause side effects , but GraphQL specifications says that The resolution of fields other than top level mutation fields must always be side effect free and idempotent.
> > For any SPEC complaint GraphQL schemas, only top level mutation is allowed to cause side effects.


### Create New Data

Server
```graphql
enum Vehicle {
    CAR
    TRUCK
    BIKE
}

input ReviewInput{
    stars: Int!,
    comment: String!
}

type Mutation {
    addReviewForVehicle(vehicle: Vehicle, review: ReviewInput!): Review
}
```
Client Query
```graphql
mutation CreateReview($vehicle: Vehicle, $review: ReviewInput) {
    addReviewForVehicle(vehicle: $vehicle, review: $review){
        id,
        stars,
        comment
    }
}
```

Separate JSON Dictionary for Variables:

```json
{
  "vehicle": "CAR",
  "review": {
    "stars": 5,
    "comment": "awesome"
  }
}
```
Like queries, if mutation field returns a object type, we must specify selection set of it’s fields. 

it’s conventional to specify an output type that relates to whatever is modified during the mutation. This can be useful for clients that need to fetch the new state of an object after an update.

Result
```json
{
  "data": {
    "id": "asda234-134asdf-dsfg234e",
    "stars": 5,
    "comment": "awesome"
  }
}
```
As similar to above, we will use update and delete methods also. The resolver functions will then create/update/delete the data according to their spec.

For creation/update operations ->
  * conventionally we need to return created/update field type such that client can select whatever he wants.
  * As similar to this delete also returns id of the deleted object or return the deletion object itself or boolean saying whether success or not.


### Purpose Built Mutations
1. To update properties in REST we will use an endpoint with PATCH method with the updated data.
2. With GraphQL, we can simply create a new field, that will be specific mutation to that field like updateName, updateAge.
3. Purpose built mutations help us make schema more expressive by allowing input types of field arguments non null types. 
4. (A generic mutation can contain many nullable data like updatePerson can accept name, age, gender…etc, many can be null, it’s not a specific update). Determining the schema like this will helps us avoid extra runtime logic to check appropriate data is sent or not.

#### Multiple Mutation fields in mutation
A mutation can contain multiple fields, just like a query. 
While multiple query operations will run in parallel, mutation fields only runs sequentially.

**The below will run sequentially one after the other, if one failed, it won’t be procedeed to next. It will throw error from that operation and exits.**
```graphql
mutation {
    firstVehicle: deleteOp(id: "1001"),
    secondVehicle: deleteOp(id: "2002")
}
```
Result:
```json
{
  "data": {
    "firstVehicle": "1001",
    "secondVehicle": "2002"
  }
}
```


### Resolver Function From Query Key

Every Resolver function from query key will have three arguments
1. parent —>  parent fetched data will be passed down to child’s resolvers.
2. args => named arguments object -> {arg1: value1, arg2: value2}
3. context —> context passed when server is initialised
    - [ ] need clarification 

