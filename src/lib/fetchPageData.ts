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

  try {
    const data = await client.request<GetPageQuery>(GetPageDocument, variables);
    return data.page;
  } catch (error: any) {
    console.error('❌ GraphQL request failed');
    if (error.response) {
      console.error('Response error:', JSON.stringify(error.response, null, 2));
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
}
