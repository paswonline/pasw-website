/**
 * CMS Abstraction Layer
 * Switches between MOCK (local JSON) and LIVE (Storyblok) data sources
 */

import type { 
  Event, 
  GalleryItem, 
  PageHistoria, 
  PageKontakt, 
  Homepage, 
  GlobalSettings 
} from '../types';

const CMS_MODE = import.meta.env.CMS_MODE || 'mock';
const STORYBLOK_TOKEN = import.meta.env.STORYBLOK_TOKEN || '';

/**
 * Fetch data from Storyblok
 */
async function fetchFromStoryblok(slug: string, version: 'draft' | 'published' = 'published') {
  if (!STORYBLOK_TOKEN) {
    console.warn('STORYBLOK_TOKEN not set, falling back to mock data');
    return null;
  }

  try {
    const url = `https://api.storyblok.com/v2/cdn/stories/${slug}?token=${STORYBLOK_TOKEN}&version=${version}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Storyblok API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.story;
  } catch (error) {
    console.error('Error fetching from Storyblok:', error);
    return null;
  }
}

/**
 * Fetch data from local JSON files
 */
async function fetchFromMock(filename: string) {
  try {
    const module = await import(`../../content/${filename}.json`);
    return module.default;
  } catch (error) {
    console.error(`Error loading mock data from content/${filename}.json:`, error);
    return null;
  }
}

/**
 * Get all events
 */
export async function getEvents(): Promise<Event[]> {
  if (CMS_MODE === 'live') {
    const story = await fetchFromStoryblok('events');
    // TODO: Transform Storyblok data to Event[] format
    return story?.content?.events || [];
  }
  
  const data = await fetchFromMock('events');
  return data?.events || [];
}

/**
 * Get single event by slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const events = await getEvents();
  return events.find(event => event.slug === slug) || null;
}

/**
 * Get upcoming events (next N events from today)
 */
export async function getUpcomingEvents(limit = 3): Promise<Event[]> {
  const events = await getEvents();
  const now = new Date();
  
  return events
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

/**
 * Get gallery items
 */
export async function getGallery(): Promise<GalleryItem[]> {
  if (CMS_MODE === 'live') {
    const story = await fetchFromStoryblok('gallery');
    return story?.content?.items || [];
  }
  
  const data = await fetchFromMock('gallery');
  return data?.items || [];
}

/**
 * Get Historia page content
 */
export async function getHistoria(): Promise<PageHistoria | null> {
  if (CMS_MODE === 'live') {
    const story = await fetchFromStoryblok('historia');
    return story?.content || null;
  }
  
  const data = await fetchFromMock('historia');
  return data;
}

/**
 * Get Kontakt page content
 */
export async function getKontakt(): Promise<PageKontakt | null> {
  if (CMS_MODE === 'live') {
    const story = await fetchFromStoryblok('kontakt');
    return story?.content || null;
  }
  
  const data = await fetchFromMock('kontakt');
  return data;
}

/**
 * Get Homepage content
 */
export async function getHomepage(): Promise<Homepage | null> {
  if (CMS_MODE === 'live') {
    const story = await fetchFromStoryblok('homepage');
    return story?.content || null;
  }
  
  const data = await fetchFromMock('homepage');
  return data;
}

/**
 * Get Global Settings
 */
export async function getGlobalSettings(): Promise<GlobalSettings | null> {
  if (CMS_MODE === 'live') {
    const story = await fetchFromStoryblok('global-settings');
    return story?.content || null;
  }
  
  const data = await fetchFromMock('global');
  return data;
}

