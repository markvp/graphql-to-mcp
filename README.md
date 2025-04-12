# graphql-to-mcp

`graphql-to-mcp` is a library designed to parse a GraphQL schema and expose its resources, tools, and prompts for use in a ModelContextProvider (MCP) server. This package simplifies the integration of GraphQL schemas into MCP servers by automatically identifying queries, mutations, and schema details, and converting them into MCP-compatible resources and tools.

## Features

- **Schema Resource**: Exposes the GraphQL schema as a resource.
- **Query and Mutation Tools**: Automatically generates tools for each query and mutation in the schema.
- **Custom Prompts**: Supports generating prompts based on the schema.
- **MCP Integration**: Outputs resources and tools in a format compatible with MCP servers.

## Installation

Install the package using npm:

```bash
npm install graphql-to-mcp
```

## Usage

Here is an example of how to use `graphql-to-mcp`:

```typescript
import { graphqlToMCP } from 'graphql-to-mcp';
import { buildSchema } from 'graphql';

const schemaSDL = `
  type Query {
    hello: String
  }
`;

const schema = buildSchema(schemaSDL);
const { resources, tools } = graphqlToMCP(schema);

console.log(resources);
console.log(tools);
```

## API

### `graphqlToMCP(schema: string | GraphQLSchema): MCPOutput`

Parses a GraphQL schema and returns an object containing:

- `resources`: A map of resources identified from the schema.
- `tools`: A map of tools generated for queries and mutations.

### MCPOutput

```typescript
interface MCPOutput {
  resources: Record<string, ResourceDefinition>;
  tools: ToolDefinition<any>[];
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Acknowledgments

This library is built to integrate GraphQL schemas seamlessly into MCP servers, enabling efficient and standardized resource and tool management.
