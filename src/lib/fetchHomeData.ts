// src/lib/fetchHomeData.ts
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('http://localhost:10008/graphql');

const homeQuery = `
  query GetHomePage {
    page(id: "48", idType: DATABASE_ID) {
      title
      heroComponent {
        heroType
        heroTitle
        heroSubtitle
        heroCtas {
          ctaLabel
          ctaIcon
          ctaLink {
            url
            title
            target
          }
        }
        heroBackgroundType
        heroBackgroundImage {
          node {
            sourceUrl
            altText
          }
        }
        heroGradient
        heroImage {
          node {
            sourceUrl 
            altText
          }
        }
        heroTextTheme
        heroAnimationStyle
      }
      imageStack {
        imageStackItem {
          ... on ImageStackImageStackItemLayoutLayout {
            label
            image {
              node {
                id
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  }
`;

type StackItem = {
  label?: string;
  image: {
    node: {
      id: string;
      sourceUrl: string;
      altText?: string;
    };
  };
};

type ImageStackBlock = {
  __typename: 'ImageStackComponent';
  imageStackItems: StackItem[];
};

type HeroResponse = {
  page: {
    title: string;
    heroComponent: {
      heroType?: string[];
      heroTitle: string;
      heroSubtitle?: string;
      heroCtas?: {
        ctaLabel: string;
        ctaIcon?: string[];
        ctaLink: {
          url: string;
          title: string;
          target?: string;
        };
        icon?: string;
      }[];
      heroImage?: {
        node: {
          sourceUrl: string;
          altText?: string;
        };
      } | null;
      heroTextTheme?: string[];
      heroAnimationStyle?: string[];
    };
    imageStack?: {
      imageStackItem: StackItem[];
    };
  };
};

export async function fetchHomeData() {
  const data = await client.request<HeroResponse>(homeQuery);

  return {
    title: data.page.title,
    hero: data.page.heroComponent,
    contentBlocks: [
      {
        __typename: 'ImageStackComponent',
        imageStackItems: data.page.imageStack?.imageStackItem ?? [],
      }
    ]
  };
}