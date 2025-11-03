/**
 * sitemap.xml generation
 */
import type { APIRoute } from 'astro';
import { getEvents } from '../lib/cms';

export const GET: APIRoute = async () => {
  const siteUrl = import.meta.env.SITE_URL || 'https://pasw.pl';
  const events = await getEvents();

  // Static pages
  const staticPages = [
    '',
    '/aktualnosci',
    '/filmy',
    '/historia',
    '/nasze-sekcje',
    '/polityka-prywatnosci',
  ];

  // Dynamic event pages
  const eventPages = events.map((event) => `/aktualnosci/${event.slug}`);

  const allPages = [...staticPages, ...eventPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page}</loc>
    <changefreq>${page === '' ? 'daily' : page.includes('/aktualnosci/') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.includes('/aktualnosci/') ? '0.7' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

