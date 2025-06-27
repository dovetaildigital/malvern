// src/utils/normalizeUrl.ts
export function normalizeUrl(raw: string, apiBase: string): string {
    try {
      const base = new URL(apiBase);
      const full = new URL(raw, apiBase);
      // only strip if origins match exactly
      if (full.origin === base.origin) {
        return full.pathname + full.search + full.hash;
      }
    } catch {
      // if parsing fails, just return the original
    }
    return raw;
  }
  