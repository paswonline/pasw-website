# 🔧 Usunięcie zewnętrznego skryptu z `<head>`

## Problem

W źródle strony (`view-source`) na początku `<head>` pojawia się zewnętrzny skrypt:
```html
<script type='text/javascript' src='https://www.pasw.com.pl/AAHfUxyulhun9c49OG8vzRbkZK_9Z0ODbzN8dyvYb7w90dh14xV6e4oWaY-odJPQ-xTwer4VuZe7Zm-XEzio8k_ekb9fTzP_ZL4Pkhea-66svGpvw-Zy6V3sTaLBvwn_0ltlEdk_7f2ae1MFjMJqD32qRFUWjBOn7Wt6koFPObU='></script>
```

Ten skrypt jest **wstrzykiwany przez serwer/hosting** i nie pochodzi z kodu źródłowego Astro.

## Dlaczego to problem?

1. **Blokuje renderowanie** - skrypt synchroniczny w `<head>` opóźnia wyświetlanie strony
2. **Pogarsza LCP** - opóźnia załadowanie najważniejszej treści
3. **Pogarsza INP** - może blokować interakcje użytkownika
4. **Nieprofesjonalny wygląd** - bardzo długi, nieczytelny URL w `<head>`
5. **SEO** - Google może ocenić jako "code smell"

## Rozwiązania

### Opcja 1: Usunięcie na poziomie serwera/hostingu (ZALECANE)

**Skontaktuj się z administratorem serwera/hostingu** i poproś o:

1. **Usunięcie skryptu** - jeśli nie jest konieczny
2. **Przeniesienie do body z `defer`** - jeśli musi zostać:
   ```html
   <script src="..." defer></script>
   ```
3. **Wyłączenie automatycznego wstrzykiwania** - jeśli to opcja hostingu

**Gdzie szukać:**
- Panel administracyjny hostingu (np. cPanel, Plesk)
- Ustawienia bezpieczeństwa / monitoring
- Ustawienia "Custom Scripts" / "Header/Footer Scripts"
- .htaccess (jeśli Apache)
- Konfiguracja serwera (nginx.conf, apache.conf)

### Opcja 2: Usunięcie przez transform HTML (Astro)

Jeśli nie możesz kontrolować serwera, możesz użyć Astro transform, ale **to może być ryzykowne** jeśli skrypt jest potrzebny funkcjonalnie.

**Dodaj do `astro.config.mjs`:**

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL || 'https://pasw.com.pl',
  vite: {
    plugins: [tailwindcss()]
  },
  // Transform HTML to remove/move external scripts
  integrations: [
    {
      name: 'remove-external-scripts',
      hooks: {
        'astro:config:setup': ({ addWatchFile }) => {},
        'astro:build:done': ({ dir }) => {},
      }
    }
  ]
});
```

**LUB użyj middleware (Astro 3+):**

Utwórz `src/middleware.ts`:
```ts
export async function onRequest(context, next) {
  const response = await next();
  const html = await response.text();
  
  // Remove external scripts from head
  const cleaned = html.replace(
    /<script[^>]*src=['"]https:\/\/www\.pasw\.com\.pl\/[^'"]*['"][^>]*><\/script>/gi,
    ''
  );
  
  return new Response(cleaned, {
    status: response.status,
    headers: response.headers,
  });
}
```

### Opcja 3: Zidentyfikuj źródło skryptu

Sprawdź:
- **Cloudflare** - może dodawać skrypty bezpieczeństwa
- **CDN** - może mieć własne skrypty
- **Firewall/WAF** - może dodawać monitoring
- **Analytics** - może być stary tracking
- **Backup/Monitoring** - może być automatyczny backup script

## Weryfikacja

Po usunięciu/przeniesieniu skryptu:

1. **Sprawdź view-source:**
   ```bash
   curl -s https://pasw.com.pl | head -20
   ```
   Powinno zaczynać się od `<html>` → `<head>` → meta tags, **bez** długiego script tagu

2. **Lighthouse:**
   - Performance nie powinien się pogorszyć
   - LCP powinien być < 2.5s
   - INP powinien być < 200ms

3. **Console przeglądarki:**
   - Brak błędów związanych z brakującym skryptem
   - Funkcjonalność strony działa normalnie

## Status

- ✅ Kod źródłowy Astro **nie zawiera** tego skryptu
- ⚠️ Skrypt jest **wstrzykiwany przez serwer/hosting**
- 📝 Dodano komentarze w kodzie wskazujące na problem
- 🔧 Wymagana interwencja na poziomie serwera/hostingu

## Kontakt

Jeśli potrzebujesz pomocy z identyfikacją źródła skryptu lub jego usunięciem, skontaktuj się z:
- Administratorem serwera/hostingu
- Deweloperem odpowiedzialnym za deployment
- Wsparciem technicznym hostingu

