import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema.graphql",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./context#DataSourceContext",
        federation: true,
        mappers: {
          Listing: "./models#ListingResponse"  // mapping listing response type (i.e. shared keys from listing subgraph) to __resolveReference of review subgraph
        }
      },
    },
  },
};

export default config;