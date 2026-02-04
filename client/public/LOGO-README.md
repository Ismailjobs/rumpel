# Logo ve Favicon

## Favicon (icon.svg)

- **icon.svg** tarayıcı sekmesi ikonu (favicon) için kullanılır.
- Çok büyük SVG dosyaları sunucuda 500 hatasına yol açtığı için favicon küçük tutuldu (~5 satır).
- Favicon’u değiştirmek için `icon.svg` dosyasını düzenleyin; boyutun küçük kalması önerilir.

## Detaylı logonuzu kullanmak

1. **Eski büyük logoyu geri alın**  
   - Git’te önceki bir commit’ten `icon.svg` içeriğini geri alabilirsiniz,  
   - veya tasarım programınızdan (Illustrator, Figma vb.) SVG’yi tekrar dışa aktarın.

2. **Boyutu düşürün (önerilir)**  
   - [SVGOMG](https://jakearchibald.github.io/svgomg/) ile SVG’yi optimize edin (gereksiz meta veri, ondalık hassasiyeti azaltma).  
   - Böylece dosya boyutu ve satır sayısı ciddi şekilde azalır, 500 riski ortadan kalkar.

3. **Sitede kullanın**  
   - Optimize ettiğiniz dosyayı **logo-full.svg** adıyla `client/public/` klasörüne koyun.  
   - Header veya istediğiniz yerde:  
     - `<Logo useFullLogo />` ile detaylı logoyu gösterebilirsiniz,  
     - veya doğrudan `<img src="/logo-full.svg" alt="Logo" />` kullanabilirsiniz.

## Özet

| Dosya         | Amaç                          |
|---------------|--------------------------------|
| **icon.svg**  | Favicon (küçük, hafif kalmalı) |
| **logo-full.svg** | Sayfada gösterilen detaylı logo (isteğe bağlı) |
