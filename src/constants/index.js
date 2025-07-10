export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
];

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}