import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(import.meta.env.WP_GRAPHQL_URL);

export default client;
