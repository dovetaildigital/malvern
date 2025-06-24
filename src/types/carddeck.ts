// src/types/carddeck.ts
import type { IconSlug } from './buttons';

export interface CardDeckItem {
    cardDeckIcon: IconSlug | null;
    cardDeckHeadline: string | null;
    cardDeckDescription: string | null;
}

export interface CardDeckProps {
    cardDeckItem: CardDeckItem[] | null;
}