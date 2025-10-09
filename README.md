# Pszczyńska Akademia Sztuk Walki (PASW) - Website

Profesjonalna strona internetowa dla Pszczyńskiej Akademii Sztuk Walki zbudowana z Astro, TypeScript, Tailwind CSS i integracją z Storyblok CMS.

## 🚀 Funkcje

- ✅ **Szybka i nowoczesna** - Zbudowana w Astro dla maksymalnej wydajności
- ✅ **CMS-editable** - Integracja z Storyblok dla łatwej edycji treści
- ✅ **Tryb MOCK** - Działa lokalnie bez CMS (dane z plików JSON)
- ✅ **W pełni responsywna** - Pięknie wygląda na każdym urządzeniu
- ✅ **Dostępność (a11y)** - WCAG 2.1, nawigacja klawiaturą, screen readery
- ✅ **SEO-optimized** - Meta tagi, Open Graph, schema.org, sitemap
- ✅ **Cloudinary ready** - Opcjonalna optymalizacja obrazów
- ✅ **TypeScript** - Pełne typowanie dla bezpieczeństwa kodu

## 📋 Wymagania

- Node.js 18+ 
- npm lub yarn

## 🏁 Szybki start (MOCK mode)

```bash
# 1. Instalacja zależności
npm install

# 2. Uruchomienie w trybie deweloperskim
npm run dev

# Otwórz http://localhost:4321
```

To wszystko! Strona działa z danymi mock (pliki JSON w katalogu `content/`).

## 🔧 Konfiguracja

### Zmienne środowiskowe

Utwórz plik `.env` w głównym katalogu (możesz skopiować `.env.example`):

```env
# Tryb CMS: 'mock' dla lokalnych danych, 'live' dla Storyblok
CMS_MODE=mock

# Storyblok (tylko gdy CMS_MODE=live)
STORYBLOK_TOKEN=

# Cloudinary (opcjonalne)
CLOUDINARY_CLOUD_NAME=

# URL strony (dla SEO i sitemap)
SITE_URL=http://localhost:4321
```

## 📁 Struktura projektu

```
/
├── public/              # Pliki statyczne (obrazy, favicon)
├── src/
│   ├── components/      # Komponenty Astro/React
│   │   ├── home/       # Sekcje strony głównej
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── ...
│   ├── layouts/        # Layouty stron
│   ├── lib/            # Utilities i helpery
│   │   ├── cms.ts     # Abstrakcja CMS (MOCK/LIVE)
│   │   ├── cloudinary.ts
│   │   └── seo.ts
│   ├── pages/          # Routing Astro
│   ├── styles/         # Style globalne
│   └── types.ts        # TypeScript types
├── content/            # Mock JSON data
├── storyblok-schemas/  # Schematy komponentów Storyblok
└── README.md
```

## 🎨 Strony

- `/` - Strona główna (Hero, USPs, Highlights, Wydarzenia, Galeria, CTA)
- `/aktualnosci` - Lista wydarzeń/aktualności
- `/aktualnosci/[slug]` - Szczegóły wydarzenia
- `/galeria` - Galeria zdjęć z lightbox
- `/historia` - Historia Akademii z YouTube embed
- `/kontakt` - Formularz kontaktowy + lokalizacje
- `/polityka-prywatnosci` - Polityka prywatności (szablon)
- `/robots.txt` - Dla robotów wyszukiwarek
- `/sitemap.xml` - Mapa strony

## 🎯 Przejście na Storyblok (LIVE mode)

### 1. Utwórz space w Storyblok

1. Zarejestruj się na [storyblok.com](https://www.storyblok.com/)
2. Utwórz nowy Space
3. Wybierz region (Europe zalecane dla Polski)

### 2. Importuj schematy komponentów

1. Otwórz **Block Library** w Storyblok
2. Dla każdego pliku w `storyblok-schemas/`:
   - Kliknij **+ New**
   - Przejdź na zakładkę **JSON**
   - Skopiuj całą zawartość pliku schema
   - Wklej do edytora JSON
   - Zapisz

**Kolejność importu** (zagnieżdżone komponenty najpierw):
1. `usp.json`
2. `highlight.json`
3. `testimonial.json`
4. `milestone.json`
5. `contactLocation.json`
6. `homepage.json`
7. `event.json`
8. `galleryItem.json`
9. `pageHistoria.json`
10. `pageKontakt.json`
11. `globalSettings.json`

### 3. Utwórz content

W Storyblok Content:

1. Utwórz **Global Settings** (singleton)
2. Utwórz **Homepage** (singleton)
3. Utwórz **Historia** (singleton)
4. Utwórz **Kontakt** (singleton)
5. Dodaj **Events** (wiele)
6. Dodaj **Gallery Items** (wiele)

Możesz użyć danych z plików `content/*.json` jako inspiracji.

### 4. Pobierz Public API Token

1. Settings > Access Tokens
2. Skopiuj **Public** token (zaczyna się od `...`)
3. **Nigdy** nie używaj Preview tokena w produkcji!

### 5. Zaktualizuj .env

```env
CMS_MODE=live
STORYBLOK_TOKEN=twój_public_token_tutaj
SITE_URL=https://twojastrona.vercel.app
```

### 6. Restart dev server

```bash
npm run dev
```

Teraz strona pobiera dane z Storyblok! 🎉

## 📦 Build i Deploy

### Lokalny build

```bash
npm run build
npm run preview
```

### Deploy na Vercel

1. Połącz repo z [Vercel](https://vercel.com)
2. Dodaj zmienne środowiskowe:
   - `CMS_MODE=live`
   - `STORYBLOK_TOKEN=...`
   - `CLOUDINARY_CLOUD_NAME=...` (opcjonalne)
   - `SITE_URL=https://twojastrona.vercel.app`
3. Deploy!

Vercel automatycznie wykryje projekt Astro i użyje odpowiednich ustawień.

### Preview URLs w Storyblok

W Storyblok Settings > Visual Editor dodaj:

- **Default**: `https://twojastrona.vercel.app/`
- **Wydarzenia**: `https://twojastrona.vercel.app/aktualnosci/{slug}`

Dla local dev użyj `http://localhost:4321`.

## 🖼️ Obrazy

### Lokalne obrazy

Umieść pliki w `public/images/` i używaj w JSON:

```json
"cover": "moje-zdjecie.jpg"
```

### Cloudinary (opcjonalne)

1. Utwórz konto na [cloudinary.com](https://cloudinary.com)
2. Dodaj `CLOUDINARY_CLOUD_NAME` do `.env`
3. Uploaduj obrazy do Cloudinary
4. Użyj Public ID w JSON:

```json
"cover": "pasw/events/event-1"
```

Obrazy będą automatycznie optymalizowane (WebP, responsive, lazy loading).

## 🎨 Customizacja

### Kolory i czcionki

Edytuj `tailwind.config.js`:

```js
colors: {
  base: '#0B0D10',      // Tło
  primary: '#E53935',   // Kolor główny (czerwony)
  accent: '#FFFFFF',    // Akcent (biały)
}
```

### Zmiana treści w MOCK mode

Edytuj pliki JSON w `content/`:
- `homepage.json` - Strona główna
- `events.json` - Wydarzenia
- `gallery.json` - Galeria
- `historia.json` - Historia
- `kontakt.json` - Kontakt
- `global.json` - Ustawienia globalne

## ♿ Accessibility (a11y)

Strona spełnia standardy WCAG 2.1:

- ✅ Nawigacja klawiaturą (Tab, Enter, Escape, strzałki)
- ✅ Focus indicators (widoczne fokus)
- ✅ Skip to content link
- ✅ ARIA labels i role
- ✅ Semantyczny HTML
- ✅ Kontrast kolorów ≥ 4.5:1
- ✅ Alt text dla obrazów
- ✅ Labels dla formularzy
- ✅ Prefers-reduced-motion support

## 🔍 SEO

- ✅ Meta tags (title, description)
- ✅ Open Graph (Facebook, Twitter)
- ✅ Canonical URLs
- ✅ schema.org/LocalBusiness JSON-LD
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Semantic HTML

## 📱 Features

### Header
- Sticky (chowa się przy scrollu w dół)
- Mobile drawer menu
- Keyboard accessible
- Auto-highlight aktywnej strony

### YouTube Embed
- Click-to-play (nie ładuje JS od razu)
- youtube-nocookie.com dla prywatności
- Poster image (thumbnail)
- Lazy loading

### Gallery
- Masonry grid (2/3/4 kolumny)
- Lightbox z nawigacją klawiaturą
- Lazy loading obrazów
- Captions

### Contact Form
- Walidacja HTML5
- RODO checkbox
- Placeholder dla backend integration
- TODO: Dodać Resend/hCaptcha

## 🛠️ Scripts

```bash
npm run dev          # Dev server (port 4321)
npm run build        # Production build
npm run preview      # Preview production build
npm run astro        # Run Astro CLI
```

## 📝 TODO (opcjonalne rozszerzenia)

- [ ] Integracja formularza z backend (Resend, FormSpree, itp.)
- [ ] hCaptcha dla formularza
- [ ] Blog/Newsy (rozszerzona sekcja Aktualności)
- [ ] i18n (wielojęzyczność)
- [ ] Dark mode toggle
- [ ] Google Analytics / Plausible
- [ ] Newsletter signup
- [ ] Wyszukiwarka

## 📄 Licencja

Projekt stworzony dla Pszczyńskiej Akademii Sztuk Walki.

## 🆘 Wsparcie

W razie problemów:

1. Sprawdź `.env` - czy wszystkie zmienne są ustawione
2. Sprawdź console w przeglądarce (F12)
3. Sprawdź logi serwera w terminalu
4. Przebuduj node_modules: `rm -rf node_modules && npm install`

## 🎉 Gotowe!

Masz pytania? Napisz do nas!

---

**Zbudowano z ❤️ dla PASW**
