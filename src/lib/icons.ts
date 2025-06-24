// src/lib/icons.ts

const iconModules = import.meta.glob('@/assets/icons/phosphor/*.svg', {
  eager: true,
  as: 'url'
});

const icons: Record<string, string> = {};

for (const path in iconModules) {
  const file = path.split('/').pop() || '';
  const slug = file.replace(/\.svg$/, '');
  icons[slug] = iconModules[path] as string;
}

export { icons }; // ← This line is essential
