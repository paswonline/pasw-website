# Storyblok Component Schemas

This directory contains JSON schema definitions for Storyblok components used in the PASW website.

## How to Import to Storyblok

1. Log in to your Storyblok space
2. Navigate to **Block Library** in the sidebar
3. Click **+ New** to create a new component
4. For each schema file in this directory:
   - Click on the **JSON** tab in the component editor
   - Copy the entire contents of the schema file
   - Paste it into the JSON editor
   - Click **Save**

## Components

### Content Types (Pages)
- `event.json` - Individual event/news post
- `galleryItem.json` - Gallery image item
- `pageHistoria.json` - Historia page (singleton)
- `pageKontakt.json` - Kontakt page (singleton)
- `homepage.json` - Homepage (singleton)
- `globalSettings.json` - Global site settings (singleton)

## Important Notes

- After importing, make sure to set the correct **Component Type** (nestable, universal, or content type)
- For singleton pages (homepage, pageHistoria, etc.), create only ONE story using that component
- Enable **Preview URLs** in Settings > Visual Editor to test content changes live

## Preview URL Configuration

In Storyblok Settings > Visual Editor, add the following preview URLs:

- **Default**: `http://localhost:4321/`
- **Events**: `http://localhost:4321/aktualnosci/{slug}`
- **Historia**: `http://localhost:4321/historia`
- **Kontakt**: `http://localhost:4321/kontakt`
- **Galeria**: `http://localhost:4321/galeria`

For production, replace `http://localhost:4321` with your Vercel domain.

