/**
 * robots.txt generation
 */
import type { APIRoute } from 'astro';

const robots = `
User-agent: *
Allow: /

Sitemap: ${import.meta.env.SITE_URL || 'https://pasw.pl'}/sitemap.xml
`.trim();

export const GET: APIRoute = () => {
  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

