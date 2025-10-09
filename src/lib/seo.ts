/**
 * SEO and Schema.org utilities
 */

import type { GlobalSettings } from '../types';

/**
 * Generate LocalBusiness schema.org JSON-LD
 */
export function generateLocalBusinessSchema(settings: GlobalSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: settings.siteName,
    description: 'Pszczyńska Akademia Sztuk Walki - treningi kung-fu, jiu-jitsu, systema i walki wręcz dla dzieci, młodzieży i dorosłych',
    url: import.meta.env.SITE_URL || 'https://pasw.pl',
    telephone: settings.phone,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: settings.city,
      postalCode: settings.postalCode,
      addressCountry: 'PL',
    },
    ...(settings.lat && settings.lng ? {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: settings.lat,
        longitude: settings.lng,
      },
    } : {}),
    sameAs: [
      settings.facebookUrl,
      settings.instagramUrl,
      settings.youtubeUrl,
    ].filter(Boolean),
  };
}

/**
 * Generate Event schema.org JSON-LD
 */
export function generateEventSchema(event: {
  title: string;
  date: string;
  description?: string;
  location?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    ...(event.description ? { description: event.description } : {}),
    ...(event.location ? {
      location: {
        '@type': 'Place',
        name: event.location,
      },
    } : {}),
  };
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, locale = 'pl-PL'): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Format date with time
 */
export function formatDateTime(dateString: string, locale = 'pl-PL'): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length = 150): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

