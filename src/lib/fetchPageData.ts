import { GraphQLClient } from 'graphql-request';
import {
  GetPageDocument,
  type GetPageQuery,
  type GetPageQueryVariables,
} from '@/queries/GetPage.generated';
import { PageIdType } from '@/types/graphql-types';

const client = new GraphQLClient(import.meta.env.WP_GRAPHQL_URL);

export async function fetchPageData(
  id: string | number,
  idType: PageIdType = PageIdType.DATABASE_ID
): Promise<GetPageQuery['page']> {
  const variables: GetPageQueryVariables = {
    id: String(id),
    idType,
  };

  const { page } = await client.request<GetPageQuery>(GetPageDocument, variables);

  console.log('GraphQL page data fetched:', JSON.stringify(page, null, 2)); // <-- Add this log

  return page;
}
