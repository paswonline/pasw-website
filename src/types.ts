// Core content types for PASW

export interface Event {
  title: string;
  slug: string;
  date: string;
  cover?: string;
  excerpt: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
  tags?: ('szkolenia' | 'zawody' | 'ogłoszenie')[];
}

export interface GalleryItem {
  image: string;
  caption?: string;
  alt?: string;
}

export interface Milestone {
  year: number;
  title: string;
  description: string;
}

export interface PageHistoria {
  title: string;
  body: string;
  videoUrl?: string;
  milestones: Milestone[];
}

export interface ContactLocation {
  city: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface PageKontakt {
  heading: string;
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl?: string;
  hours?: string;
  locations: ContactLocation[];
}

export interface USP {
  icon: string;
  title: string;
  description: string;
}

export interface Highlight {
  metricLabel: string;
  metricValue: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface Homepage {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimaryLabel: string;
  heroCtaPrimaryUrl: string;
  heroCtaSecondaryLabel: string;
  heroCtaSecondaryUrl: string;
  usps: USP[];
  highlights: Highlight[];
  showUpcomingEvents: boolean;
  miniGalleryLimit: number;
  testimonials: Testimonial[];
  bigCtaTitle: string;
  bigCtaSubtitle: string;
  bigCtaButtonLabel: string;
  bigCtaButtonUrl: string;
}

export interface GlobalSettings {
  siteName: string;
  logo?: string;
  primaryColor: string;
  accentColor: string;
  address: string;
  city: string;
  postalCode: string;
  lat?: number;
  lng?: number;
  phone: string;
  email: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  type?: 'website' | 'article';
}

