import {
  parse,
  GraphQLSchema,
  buildASTSchema,
  getIntrospectionQuery,
  graphql,
} from "graphql";
import { z, ZodRawShape } from "zod";
import type {
  ToolCallback,
  ReadResourceCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
  CallToolResult,
  ReadResourceResult,
  Resource,
} from "@modelcontextprotocol/sdk/types.js";

export type ToolDefinition<Args extends ZodRawShape> = {
  name: string;
  description: string;
  paramsSchema: z.ZodObject<Args>;
  execute: ToolCallback<Args>;
};

export type ResourceDefinition = Resource & {
  readCallback: ReadResourceCallback;
};

export interface MCPOutput {
  resources: ResourceDefinition[];
  tools: ToolDefinition<any>[];
}

export function graphqlToMCP(schemaInput: string | GraphQLSchema): MCPOutput {
  let schema: GraphQLSchema;

  if (typeof schemaInput === "string") {
    const ast = parse(schemaInput);
    schema = buildASTSchema(ast);
  } else {
    schema = schemaInput;
  }

  const resources: ResourceDefinition[] = [];
  const tools: ToolDefinition<any>[] = [];

  // Add schema resource
  resources.push({
    name: "GraphQL Schema",
    uri: "graphql://schema",
    description: "The GraphQL schema introspection",
    mimeType: "application/json",
    readCallback: async (uri: URL): Promise<ReadResourceResult> => {
      const introspection = await graphql({
        schema,
        source: getIntrospectionQuery(),
      });
      return {
        contents: [
          {
            uri: uri.toString(),
            mimeType: "application/json",
            text: JSON.stringify(introspection.data, null, 2),
          },
        ],
      };
    },
  });

  // Add getSchema tool
  tools.push({
    name: "getSchema",
    description: "Fetch the GraphQL schema introspection",
    paramsSchema: z.object({}),
    execute: async (): Promise<CallToolResult> => {
      const introspection = await graphql({
        schema,
        source: getIntrospectionQuery(),
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(introspection.data, null, 2),
          },
        ],
        _meta: {},
      };
    },
  });

  // TODO: Parse schema to identify queries and mutations, and add corresponding resources and tools

  return { resources, tools };
}
