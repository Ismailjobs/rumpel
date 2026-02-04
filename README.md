# objekträumung

Professional service website for objekträumung – clearance and removal services in Vienna and Austria (Räumung Wien & Österreich).

## Stack

- **Root**: `concurrently` for running client and server together
- **Client** (`/client`): Next.js 14.2.18, TypeScript 5.3.3, Tailwind CSS 3.4.0, next-intl 3.5.0, Framer Motion, Lucide React
- **Server** (`/server`): Node.js, TypeScript, Express, MongoDB

## Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Install

From the project root, install each part (no postinstall – avoids EPERM/OneDrive issues):

```bash
npm install
cd client
npm install
cd ../server
npm install
cd ..
```

**If you get EPERM / "operation not permitted"** (common when the project is under OneDrive): close VS Code/Cursor, stop OneDrive sync for this folder temporarily, or move the project to a non-synced path (e.g. `C:\dev\RUMPEL`). Then run the install commands again.

### Environment

**Server** – create `server/.env`:

```
MONGODB_URI=mongodb://localhost:27017/entruempelung
PORT=4000
CLIENT_ORIGIN=http://localhost:3000
```

**Client** – create `client/.env.local` (optional):

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Run

- **Both** (client + server): from project root  
  `npm run dev`
- **Client only**: `npm run dev:client` (Next.js on port 3000)
- **Server only**: `npm run dev:server` (Express on port 4000)

### Build

From project root: `npm run build`

## Deploy (Production)

### Checklist before going live

1. **Environment (production)**

   **Client** – `client/.env.local` (or host env):

   - `NEXT_PUBLIC_SITE_URL=https://objektraeumung.at` (canonical, sitemap, OG)
   - `NEXT_PUBLIC_API_URL=https://api.objektraeumung.at` (veya backend’in gerçek URL’i)
   - İsteğe bağlı: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_MSVALIDATE` (Search Console / Bing)

   **Server** – `server/.env`:

   - `MONGODB_URI` → production MongoDB (örn. Atlas connection string)
   - `PORT` → backend port (örn. 4000)
   - `CLIENT_ORIGIN=https://objektraeumung.at` (CORS; sondaki slash yok)
   - `BREVO_USER` ve `BREVO_API_KEY` → Brevo SMTP (e-posta gönderimi)
   - `HCAPTCHA_SECRET_KEY` → hCaptcha secret (contact form)

2. **Build**

   ```bash
   npm run build
   ```

3. **Run**

   ```bash
   npm run start
   ```

   Veya client ve server’ı ayrı process/host’larda çalıştırın; `NEXT_PUBLIC_API_URL` ve `CLIENT_ORIGIN`’i buna göre ayarlayın.

4. **Docker**

   `docker-compose up --build` ile frontend **port 80**’te dışarıya açılır (80:3000). Site adresi: `http://sunucu-ip/`.

   `docker-compose.yml` production için:

   - `server` → `CLIENT_ORIGIN=https://objektraeumung.at`
   - `client` build arg / env → `NEXT_PUBLIC_SITE_URL` ve `NEXT_PUBLIC_API_URL` production değerleriyle verin.

   **Form artık her zaman aynı origin üzerinden gider:** Tarayıcı `POST /api/contact` (Next.js) yapar; Docker’da Next.js bu isteği `USE_BACKEND_PROXY=true` ve `INTERNAL_API_URL=http://server:4000` ile Express backend’e proxy eder. Böylece `localhost`/IP sorunu kalmaz. Sunucuda `server/.env` (BREVO, HCAPTCHA) tanımlı olsun; `env_file: - ./server/.env` ile yüklenir.

   **Hata: `KeyError: 'ContainerConfig'` (docker-compose 1.29.x):** Eski docker-compose bazen mevcut container’ı “recreate” ederken bu hatayı verir. **Çözüm 1** – Container’ları kaldırıp yeniden oluşturun:
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```
   Hata sürerse client image’ı da silin: `docker rmi rumpel_client 2>/dev/null; docker-compose up -d --build` (image adı `docker images` ile kontrol edin). **Çözüm 2** – Docker Compose V2 kullanın: `docker compose up -d --build` (tire yok).

5. **Kontrol**

   - `https://objektraeumung.at/robots.txt` ve `https://objektraeumung.at/sitemap.xml` (veya locale’li sitemap) açılıyor mu?
   - Kontaktformular: Backend’e istek gidiyor mu, e-posta geliyor mu?
   - Favicon: `/favicon.ico` 200 dönüyor mu?

### Form gönderimi / MongoDB logları

- **MongoDB logları (Connection accepted, Connection not authenticating, Connection ended)** hata değildir. Bunlar MongoDB’nin normal bilgi loglarıdır; backend MongoDB’ye bağlanıp işlem yaptığında bu mesajlar yazılır.
- **Form gerçekten hata veriyorsa** kontrol edin:
  - **Tarayıcı**: F12 → Network sekmesinde form submit’e tıklayın; `POST .../api/contact` isteği kırmızı mı (failed), status kodu ne? Console’da CORS veya başka hata var mı?
  - **Production’da API adresi**: Site `https://objektraeumung.at` üzerinden açılıyorsa, tarayıcıdaki JavaScript `NEXT_PUBLIC_API_URL` ile backend’e istek atar. Bu değer tarayıcının erişebileceği bir adres olmalı (örn. `https://objektraeumung.at` üzerinden reverse proxy ile `/api` backend’e yönlendiriliyorsa aynı domain; veya `https://api.objektraeumung.at`). `http://localhost:4000` sadece aynı makineden site açıldığında işe yarar.
  - **CORS**: Backend `CLIENT_ORIGIN` ile frontend origin’i kabul eder; production’da `CLIENT_ORIGIN=https://objektraeumung.at` (veya kullandığınız domain) olmalı.
  - **Env**: Backend’de `BREVO_USER`, `BREVO_API_KEY`, `HCAPTCHA_SECRET_KEY` (hCaptcha kullanıyorsanız) tanımlı mı?

## Features

- **i18n**: German (de) and English (en) via next-intl with `/[locale]/` routing
- **Theme**: Deep Navy (#0A1F44), White, Accent Orange (#FF6B00); Montserrat font
- **Hero**: Dual CTAs – “Kostenloses Angebot” and “WhatsApp Chat”
- **Services**: Haushaltsauflösung, Wohnungsräumung, Keller/Dachboden, Sperrmüllabholung, Büro/Geschäftsauflösung
- **SEO**: JSON-LD Local Business, Vienna districts (1.–23. Bezirk), dynamic metadata
- **Contact**: Form posts to `POST /api/contact` (sanitization, rate limiting, MongoDB)
- **Floating CTAs**: WhatsApp button and mobile “Call” bar

## Locations (Standorte) – geçici kapalı

Standorte / Locations özelliği şu an **kapalı**: menüde link yok, `/locations` ve `/locations/[slug]` adresleri ana sayfaya yönlendiriliyor.

### Tekrar açmak için

1. **Footer’da linki geri ekle**  
   `client/src/components/Footer.tsx` içinde, "Locations geçici kapalı" yorumunu kaldırıp aşağıdaki linki tekrar ekle (About ile Contact arasına):

   ```tsx
   <Link
     href="/locations"
     className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors"
   >
     <ArrowRight size={14} className="opacity-70" />
     {tNav("locations")}
   </Link>
   ```

2. **Locations sayfalarını aç**  
   Her iki dosyada `LOCATIONS_ENABLED` değerini `true` yap:

   - `client/src/app/[locale]/locations/page.tsx`  
     `const LOCATIONS_ENABLED = true;`
   - `client/src/app/[locale]/locations/[slug]/page.tsx`  
     `const LOCATIONS_ENABLED = true;`

3. **(İsteğe bağlı) Header’a link ekle**  
   Header’da Standorte linki yoktu; eklemek istersen `client/src/components/Header.tsx` içindeki `navLinks` dizisine şunu ekle:

   ```tsx
   { key: "locations", href: "/locations" },
   ```

   Mobil menüde de aynı linki göstermek için, hamburger menüdeki nav bölümüne `<Link href="/locations" …>{t("locations")}</Link>` ekle.

### Tekrar kapatmak için

- Footer’daki locations linkini yorum satırı yap veya sil.
- Her iki locations sayfasında `LOCATIONS_ENABLED = false` yap.

---

## WhatsApp

Replace the placeholder number in `client/src/lib/constants.ts`:

- `WHATSAPP_NUMBER`: digits only, e.g. `43123456789`
- Link format: `https://wa.me/[NUMBER]?text=Anfrage_Entrümpelung`

## Project structure

```
/client
  /src
    /app/[locale]       # Next.js app router + locale
    /components         # Header, Hero, Services, ContactSection, etc.
    /i18n              # next-intl request + routing
    /messages           # de.json, en.json
    /lib                # constants (WhatsApp, API URL)
/server
  /src
    /routes            # /api/contact
    /models            # ContactSubmission (MongoDB)
    /utils             # sanitize
```
