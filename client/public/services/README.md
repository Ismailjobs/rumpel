# Hizmet sayfaları için resimler

Her hizmet sayfasının kendi klasörü **slug** ile eşleşir. Klasör adı, ilgili sayfanın URL’sindeki slug ile aynı olmalı (örn. `/services/haushaltsaufloesung` → `haushaltsaufloesung/`).

## Klasör yapısı

Her hizmet klasöründe **3 resim** kullanılır:

| Dosya | Kullanım |
|-------|----------|
| **hero.jpg** | Sayfa üstü header / büyük arka plan (önerilen: ~1920×800 px) |
| **content-1.jpg** | İçerik alanı 1. resim (Z-layout sol) (~800×600 px) |
| **content-2.jpg** | İçerik alanı 2. resim (Z-layout sağ) (~800×600 px) |

Örnek:

```
public/services/
├── entrumpelung-wien/
│   ├── hero.jpg
│   ├── content-1.jpg
│   └── content-2.jpg
├── raeumung-wien/
├── haushaltsaufloesung/
├── wohnungsaufloesung/
├── zimmer-raeumung/
├── kellerraeumung/
├── garagenraeumung/
├── dachbodenraeumung/
├── firmenaufloesung/
├── lager-gewerbeparks/
├── gastro-retail/
├── verlassenschaft/
├── messie-entruempelung/
├── haushaltsaufloesung-ueberblick/
├── antiquitaeten-wertanrechnung/
├── moebel-wertanrechnung/
└── README.md (bu dosya)
```

## Kurallar

- **Klasör adı** = hizmet slug’ı (`client/src/lib/serviceList.ts` içindeki `SERVICE_LIST[].slug`).
- **hero.jpg**: Sayfa üstü büyük görsel. Yoksa varsayılan placeholder kullanılır.
- **content-1.jpg** / **content-2.jpg**: Sayfa içi Z-layout görselleri. Yoksa varsayılan görsel kullanılır.
- Dosya adları tam olarak `hero.jpg`, `content-1.jpg`, `content-2.jpg` olmalı (küçük harf).
- PNG kullanmak isterseniz ilgili bileşenlerde uzantıyı `.png` yapmanız gerekir; şu an `.jpg` bekleniyor.

## Hizmet slug’ları (klasör adları)

| Slug | Hizmet (DE) |
|------|-------------|
| entrumpelung-wien | Entrümpelung Wien |
| raeumung-wien | Räumung Wien |
| haushaltsaufloesung | Haushaltsauflösung |
| wohnungsaufloesung | Wohnungsauflösung |
| zimmer-raeumung | Zimmerräumung |
| kellerraeumung | Kellerräumung |
| garagenraeumung | Garagenräumung |
| dachbodenraeumung | Dachbodenräumung |
| firmenaufloesung | Firmenauflösung |
| lager-gewerbeparks | Lager & Gewerbeparks |
| gastro-retail | Gastro & Retail |
| verlassenschaft | Verlassenschaft |
| messie-entruempelung | Messie-Entrümpelung |
| haushaltsaufloesung-ueberblick | Haushaltsauflösung Überblick |
| antiquitaeten-wertanrechnung | Antiquitäten & Wertanrechnung |
| moebel-wertanrechnung | Möbel & Wertanrechnung |
