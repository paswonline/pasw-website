/**
 * SEO and Schema.org utilities
 */

import type { GlobalSettings } from '../types';

/**
 * Generate comprehensive Organization and SportsActivityLocation schema.org JSON-LD
 */
export function generateLocalBusinessSchema(settings: GlobalSettings): object {
  const siteUrl = import.meta.env.SITE_URL || 'https://pasw.pl';
  const baseAddress = {
    '@type': 'PostalAddress',
    streetAddress: settings.address,
    addressLocality: settings.city,
    postalCode: settings.postalCode,
    addressCountry: 'PL',
  };

  // Organization schema (parent entity)
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.siteName,
    url: siteUrl,
    logo: `${siteUrl}/images/pasw_logo.svg`,
    address: baseAddress,
    telephone: settings.phone,
    email: settings.email,
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

  // SportsActivityLocation schema (business location)
  const sportsLocation = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: settings.siteName,
    description: 'Pszczyńska Akademia Sztuk Walki - treningi kung-fu, jiu-jitsu, systema i walki wręcz dla dzieci, młodzieży i dorosłych w Pszczynie',
    url: siteUrl,
    telephone: settings.phone,
    email: settings.email,
    address: baseAddress,
    ...(settings.lat && settings.lng ? {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: settings.lat,
        longitude: settings.lng,
      },
    } : {}),
    // Opening hours (example - adjust based on actual schedule)
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '17:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'City',
      name: 'Pszczyna',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: settings.siteName,
    },
  };

  // Return both schemas as an array
  return [organization, sportsLocation];
}

/**
 * Generate Event schema.org JSON-LD
 */
export function generateEventSchema(event: {
  title: string;
  date: string;
  description?: string;
  location?: string;
  slug?: string;
  cover?: string;
}) {
  const siteUrl = import.meta.env.SITE_URL || 'https://pasw.pl';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    ...(event.description ? { description: event.description } : {}),
    ...(event.slug ? { url: `${siteUrl}/aktualnosci/${event.slug}` } : {}),
    ...(event.location ? {
      location: {
        '@type': 'Place',
        name: event.location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Pszczyna',
          addressCountry: 'PL',
        },
      },
    } : {}),
    ...(event.cover ? {
      image: event.cover.startsWith('http') ? event.cover : `${siteUrl}${event.cover}`,
    } : {}),
    organizer: {
      '@type': 'Organization',
      name: 'Pszczyńska Akademia Sztuk Walki',
      url: siteUrl,
    },
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

