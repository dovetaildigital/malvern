// src/lib/icons.ts

const iconModules = import.meta.glob('/public/assets/icons/phosphor/*.svg', {
  eager: true,
  query: 'url',
  import: 'default'
});

const icons: Record<string, string> = {};

for (const path in iconModules) {
  const file = path.split('/').pop() || '';
  const slug = file.replace(/\.svg$/, '');
  icons[slug] = iconModules[path] as string;
}

export { icons };