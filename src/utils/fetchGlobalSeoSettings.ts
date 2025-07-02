import client from '@/lib/wp'
import { gql } from 'graphql-request'
import type { SeoSettings } from '@/types/graphql-types'

const query = gql`
  query GetGlobalSeo {
    globalSeoSettings {
      seoSettings {
        fieldGroupName
        seoTitle
        seoDescription
        seoCanonical
        seoIndex
        seoImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`

export async function fetchGlobalSeoSettings(): Promise<{ seoSettings: SeoSettings }> {
  const data = await client.request<{
    globalSeoSettings: { seoSettings: SeoSettings }
  }>(query)

  return data.globalSeoSettings
}
