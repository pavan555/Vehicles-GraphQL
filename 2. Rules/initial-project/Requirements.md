### Requirements

Client requirements for the initial project include:
1. There are cars in the list
2. we need to group them 

Grouping is as follows:
1. Client can manually group cars by selecting them/automatically by a rule
2. The grouping can be done by:
   - Car brand
   - Car model
   - Car color
   - Car year
3. Each car can have multiple groups
4. Each group can have multiple cars
5. Client can filter cars by:
   - Car brand
   - Car model
   - Car color
   - Car year
   - Group which is created by the client
6. Client can publish/unpublish groups

Each Group can have the following properties:

1. Name -> String
2. Description -> HTML
3. Image -> URL

There are two types of groups:
1. Manual Group
   - Created by the client by selecting cars
2. Automatic Group
    - Created by the system based on the rules defined by the client
    - Array of features/rules.
    - Whether this features should be "OR" or "AND" based on the client selection

Each car can have multiple groups

Each group can have multiple cars