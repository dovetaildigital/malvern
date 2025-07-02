import type { SeoSettings } from '@/types/graphql-types'

export interface SeoResolved {
  title: string
  description: string
  canonical?: string
  noindex: boolean
  image?: {
    url: string
    alt?: string
  }
}

export function resolveSeo({
  seo,
  global,
  fallbackTitle,
  titleSuffix = ''
}: {
  seo?: SeoSettings | null
  global: SeoSettings
  fallbackTitle: string
  titleSuffix?: string
}): SeoResolved {
  const title = seo?.seoTitle || global.seoTitle || fallbackTitle
  const description = seo?.seoDescription || global.seoDescription || ''
  const canonical = seo?.seoCanonical || global.seoCanonical
  const noindex = seo?.seoIndex ?? global.seoIndex ?? false

  const imageNode = seo?.seoImage?.node || global.seoImage?.node

  return {
    title: titleSuffix ? `${title}${titleSuffix}` : title,
    description: description ?? '',
    canonical: canonical ?? undefined,
    noindex,
    image: imageNode?.sourceUrl
      ? {
          url: imageNode.sourceUrl,
          alt: imageNode.altText ?? ''
        }
      : undefined
  }
}
