// src/types/calloutblock.ts
import type { IconSlug } from './buttons';

export interface CalloutItem {
    calloutIcon: IconSlug | null;
    calloutHeadline: string | null;
    calloutDescription: string | null;
}

export interface CalloutBlockProps {
    calloutItem: CalloutItem[] | null;
}