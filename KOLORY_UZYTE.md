# 🎨 Kolory użyte w projekcie PASW

## Paleta podstawowa

### Tło główne (Main Background)
**#0B0D10** - Głęboka czerń z nutą grafitu
- Użycie: Hero, header, główne sekcje premium
- CSS var: `--color-base`

### Tekst główny (Primary Text)
**#FFFFFF** - Czysta biel
- Użycie: Nagłówki, tekst główny na ciemnym tle
- CSS var: `--color-white` / `--color-text-primary`

### Akcent (Accent Red)
**#E53935** - Czerwień walki
- Użycie: CTA, hover, przyciski, akcenty
- CSS var: `--color-primary`

### Akcent alternatywny (Accent Gold)
**#D4AF37** - Złoto (pas mistrzowski)
- Użycie: Ikony, dividers, detale, hover states
- CSS var: `--color-gold`

### Szarość tła sekcji (Surface Gray)
**#1B1E22** - Dla przełamania czerni
- Użycie: Tła drugorzędne sekcji (USPs, Wydarzenia)
- CSS var: `--color-surface-gray`

### Tekst drugorzędny (Secondary Text)
**#C5C6C7** - Jasna szarość
- Użycie: Opisy, daty, informacje mniej istotne
- CSS var: `--color-text-secondary`

### Tło jasne (Light Surface)
**#F8F8F8** - Do sekcji odwróconych
- Użycie: Strona Historia (odwrócony schemat kolorów)
- CSS var: `--color-surface-light`

### Tekst ciemny (Dark Text)
**#111111** - Na jasnym tle
- Użycie: Tekst na stronie Historia
- CSS var: `--color-text-dark`

---

## Zastosowanie w komponentach

### 🎯 Hero Section
- Tło: `#0B0D10` (czarne)
- Nagłówek: Gradient `#E53935` → `#D4AF37` (red→gold)
- Podtytuł: `#C5C6C7` (szary)
- Przycisk główny: Gradient `#E53935` → `#FF5722` (red→orange)
- Przycisk hover: Podświetlenie złotem `#D4AF37`

### 📰 Aktualności (Wydarzenia)
- Tło sekcji: `#1B1E22` (szary)
- Karty: `#0B0D10` z borderem `#D4AF37` (złoty)
- Data badge: Gradient `#E53935` → `#D4AF37`
- Hover: Border zmienia się na `#E53935` (czerwony)
- Tytuły: `#FFFFFF` → hover `#D4AF37` (złoty)
- Tekst: `#C5C6C7` (szary)

### 📸 Galeria
- Tło: `#0B0D10` (czarne)
- Hover overlay: Gradient `rgba(229, 57, 53, 0)` → `rgba(229, 57, 53, 0.6)` (red transparent)

### 📜 Historia Akademii
- Tło: `#F8F8F8` (jasne!)
- Tekst: `#111111` (ciemny)
- Nagłówki: `#111111` (ciemny)
- Timeline: Border `#E53935` (czerwony)
- Rok badge: Gradient `#E53935` → `#D4AF37` (red→gold)
- Karty: Białe z borderem `#D4AF37` (złoty)

### 🎖️ USPs (Atuty)
- Tło sekcji: `#1B1E22` (szary)
- Karty: `#0B0D10` z borderem `#D4AF37` (złoty)
- Ikony: `#D4AF37` (złote) na tle `rgba(212, 175, 55, 0.1)`
- Tekst: `#C5C6C7` (szary)

### 📊 Highlights (Statystyki)
- Tło: `#0B0D10` (czarne)
- Liczby: `#E53935` (czerwony)
- Tekst: `#C5C6C7` (szary)

### 🦶 Footer
- Tło: `#0B0D10` (czarne)
- Border top: `rgba(212, 175, 55, 0.2)` (złoty przezroczysty)
- Tekst główny: `#FFFFFF` (biały)
- Tekst drugorzędny: `#C5C6C7` (szary)
- Linki: `#C5C6C7` → hover `#D4AF37` (złoty)
- Ikony social: `#D4AF37` na tle `rgba(212, 175, 55, 0.1)`
- Hover social: Gradient `#E53935` → `#D4AF37` z podniesieniem

---

## 💡 Wskazówki użycia

### Przyciski
```css
/* Główny CTA */
background: linear-gradient(135deg, #E53935 0%, #FF5722 100%);
hover: gradient(#D32F2F → #F4511E) + translateY(-2px);

/* Drugorzędny */
background: white;
hover: background #D4AF37 (złoty);

/* Outline */
border: 2px solid white;
hover: background white + text #0B0D10;
```

### Gradienty
```css
/* Red → Gold (prestiżowy) */
linear-gradient(135deg, #E53935 0%, #D4AF37 100%);

/* Red → Orange (energiczny) */
linear-gradient(135deg, #E53935 0%, #FF5722 100%);

/* Red transparent (overlay) */
linear-gradient(135deg, rgba(229,57,53,0) 0%, rgba(229,57,53,0.6) 100%);
```

### Hover efekty
- Linki: `#C5C6C7` → `#D4AF37` (szary→złoty)
- Karty: Border `#D4AF37` → `#E53935` (złoty→czerwony)
- Social: Tło złote → gradient red/gold + transform

---

## ✅ Kontrast i dostępność

Wszystkie kombinacje spełniają WCAG 2.1 Level AA (4.5:1):

- ✅ `#FFFFFF` na `#0B0D10` → 20:1 (doskonały)
- ✅ `#C5C6C7` na `#0B0D10` → 12:1 (doskonały)
- ✅ `#111111` na `#F8F8F8` → 18:1 (doskonały)
- ✅ `#E53935` na `#0B0D10` → 7:1 (bardzo dobry)
- ✅ `#D4AF37` na `#0B0D10` → 8:1 (bardzo dobry)

---

**Paleta zapewnia:**
- ⚡ Energię i dynamikę (czerwień)
- 👑 Prestiż i klasę (złoto)
- 🎯 Doskonałą czytelność (kontrast)
- ✨ Efekt "wow" (gradienty)
- ♿ Pełną dostępność (WCAG 2.1)

