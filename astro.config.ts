// astro.config.ts
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { motion } from 'framer-motion';

export default defineConfig({
  integrations: [tailwind(), react()],
});
