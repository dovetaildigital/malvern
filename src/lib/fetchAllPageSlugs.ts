import { gql, GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(import.meta.env.WP_GRAPHQL_URL);

const AllPageSlugsQuery = gql`
  query AllPageSlugs {
    pages(first: 1000) {
      nodes {
        uri
      }
    }
  }
`;



export async function fetchAllPageSlugs(): Promise<string[]> {
  try {
    const data = await client.request<{
      pages: { nodes: { uri: string }[] };
    }>(AllPageSlugsQuery);
    console.log('Fetched node URIs:', data.pages.nodes.map(n => n.uri));

    return data.pages.nodes
      .map((node) => node.uri?.replace(/^\/|\/$/g, '')) // Strip leading/trailing slashes
      .filter(Boolean); // Remove null/empty
  } catch (err) {
    console.error('Error fetching all page slugs:', err);
    return [];
  }
}
