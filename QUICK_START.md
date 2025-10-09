# 🚀 Quick Start - PASW Website

## ✅ Wszystko gotowe!

Twoja strona jest już skonfigurowana i gotowa do użycia w trybie **MOCK** (lokalne dane JSON).

## 📋 Co zostało zrobione

### 1. Struktura projektu
- ✅ Astro + TypeScript + Tailwind CSS
- ✅ Wszystkie strony: Home, Aktualności, Galeria, Historia, Kontakt
- ✅ Responsywny design z efektem "wow"
- ✅ Pełna dostępność (WCAG 2.1)
- ✅ SEO (meta tags, OG, schema.org, sitemap)

### 2. Komponenty
- ✅ Header ze sticky navigation
- ✅ Footer z kontaktem
- ✅ Hero z animacjami (desktop only)
- ✅ USPs, Highlights, Wydarzenia
- ✅ Galeria z lightbox
- ✅ YouTube embed (privacy-friendly)
- ✅ Formularz kontaktowy

### 3. Mock Data (content/)
- ✅ `homepage.json` - Treści strony głównej
- ✅ `events.json` - 4 przykładowe wydarzenia
- ✅ `gallery.json` - 12 pozycji galerii
- ✅ `historia.json` - Historia Akademii + milestones
- ✅ `kontakt.json` - 26 lokalizacji treningowych
- ✅ `global.json` - Ustawienia globalne

### 4. Integracja Storyblok
- ✅ 11 schematów komponentów w `storyblok-schemas/`
- ✅ Abstrakcja CMS w `lib/cms.ts`
- ✅ Przełączanie MOCK ↔ LIVE przez `.env`

## 🎯 Pierwsze kroki

### 1. Sprawdź, czy działa

Serwer deweloperski już działa na **http://localhost:4321**

Otwórz przeglądarkę i zobacz stronę!

### 2. Edytuj treści (MOCK mode)

Otwórz i edytuj pliki w katalogu `content/`:

```bash
content/
├── homepage.json    # Strona główna
├── events.json      # Wydarzenia
├── gallery.json     # Galeria
├── historia.json    # Historia
├── kontakt.json     # Kontakt
└── global.json      # Ustawienia globalne
```

Zapisz plik → odśwież przeglądarkę → zmiany widoczne! 🎉

### 3. Dodaj własne zdjęcia

Umieść zdjęcia w `public/images/`:

```bash
public/images/
├── hero-bg.jpg
├── event-1.jpg
├── event-2.jpg
└── gallery-1.jpg
```

Następnie zaktualizuj ścieżki w plikach JSON:

```json
{
  "cover": "event-1.jpg"
}
```

## 🎨 Customizacja

### Kolory

Edytuj `src/styles/global.css`:

```css
@theme {
  --color-base: #0B0D10;      /* Tło (ciemne) */
  --color-primary: #E53935;   /* Czerwony (PASW) */
  --color-accent: #FFFFFF;    /* Biały */
}
```

### Czcionki

Domyślnie:
- **Inter** - tekst
- **Bebas Neue** - nagłówki

Możesz zmienić w `src/styles/global.css`.

## 📱 Responsive Design

Strona jest w pełni responsywna:
- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)
- ✅ Large (1920px+)

## ♿ Accessibility

- ✅ Nawigacja klawiaturą (Tab, Enter, Esc)
- ✅ Focus indicators
- ✅ Skip to content
- ✅ ARIA labels
- ✅ Alt text dla obrazów
- ✅ Prefers-reduced-motion

Sprawdź w DevTools > Lighthouse!

## 🔄 Przejście na Storyblok (później)

Gdy będziesz gotowy, zobacz **README.md** sekcja "Przejście na Storyblok".

Kroki:
1. Utwórz konto Storyblok
2. Zaimportuj schematy z `storyblok-schemas/`
3. Dodaj content
4. Pobierz Public API Token
5. Ustaw `CMS_MODE=live` w `.env`
6. Restart serwera

## 🚀 Deploy na Vercel

1. Push kod na GitHub
2. Połącz z Vercel
3. Dodaj zmienne środowiskowe
4. Deploy!

Szczegóły w **README.md**.

## 📞 Kontakt & Wsparcie

Masz pytania? Sprawdź:
- **README.md** - Pełna dokumentacja
- **storyblok-schemas/README.md** - Instrukcje Storyblok

## 🎉 To wszystko!

Twoja strona jest gotowa do edycji i testowania.

**Następne kroki:**
1. Zastąp placeholder content swoimi treściami
2. Dodaj prawdziwe zdjęcia
3. Przetestuj na urządzeniach mobilnych
4. Kiedy będziesz gotowy → przejdź na Storyblok LIVE

---

**Zbudowano dla Pszczyńskiej Akademii Sztuk Walki ❤️**

Powodzenia! 🥋

