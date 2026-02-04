# Leistungen-Galerie (vor allem Videos)

In diesem Ordner legen Sie **Videos** (und optional Fotos) für die Galerie auf der **Leistungen**-Seite ab. Die Galerie ist auf Videos ausgelegt – fast alle Einträge sind Videos.

## Dateien

- **Videos:** z.B. `1.mp4`, `2.mp4`, … – am besten im **Hochformat (9:16)** (mit dem Handy vertikal aufgenommen).
- **Fotos (optional):** z.B. `x.jpg` – ebenfalls **Hochformat** empfohlen.

## Anzeige anpassen

Die Reihenfolge und welche Dateien angezeigt werden, steuern Sie in:

**`client/src/components/ServicesPageGallery.tsx`**

Dort finden Sie das Array `SERVICES_GALLERY_ITEMS`. Beispiele:

- Video: `{ type: "video", src: "/services-gallery/1.mp4" }`
- Foto: `{ type: "image", src: "/services-gallery/x.jpg" }`

Neue Dateien hier eintragen (z.B. `7.mp4`) und die entsprechenden Dateien in diesen Ordner legen.
