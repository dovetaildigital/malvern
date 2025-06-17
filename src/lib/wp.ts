import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('http://localhost:10008/graphql'); // adjust if needed

export default client;
