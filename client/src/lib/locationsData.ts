/**
 * Bundesländer und Regionen für Standorte-Seite und Suche.
 * slug = URL-Pfad (/locations/[slug])
 */
export const STATE_KEYS = [
  "wien",
  "niederoesterreich",
  "burgenland",
  "steiermark",
  "kaernten",
  "oberoesterreich",
  "salzburg",
] as const;

export type StateKey = (typeof STATE_KEYS)[number];

export type LocationItem = {
  slug: string;
  nameDe: string;
  nameEn: string;
  stateKey: StateKey;
  shortDescDe?: string;
  shortDescEn?: string;
};

/** Alle 23 Wiener Bezirke in Reihenfolge für die Wien-Übersichtsseite */
export const WIEN_DISTRICT_SLUGS: string[] = [
  "wien-1010", "wien-1020", "wien-1030", "wien-1040", "wien-1050", "wien-1060", "wien-1070", "wien-1080", "wien-1090",
  "wien-1100", "wien-1110", "wien-1120", "wien-1130", "wien-1140", "wien-1150", "wien-1160", "wien-1170", "wien-1180", "wien-1190",
  "wien-1200", "wien-1210", "wien-1220", "wien-1230",
];

export const LOCATIONS: LocationItem[] = [
  // Wien – alle 23 Bezirke
  { slug: "wien-1010", nameDe: "Haushaltsauflösung 1010 Wien", nameEn: "Household clearance 1010 Vienna", stateKey: "wien", shortDescDe: "Spezialisierte Teams für Haushaltsauflösungen in der Inneren Stadt – inklusive Halteverbotszone und Wertausgleich.", shortDescEn: "Specialist teams for household clearance in the city centre – including no-parking zones and value allowance." },
  { slug: "wien-1020", nameDe: "Haushaltsauflösung 1020 Wien", nameEn: "Household clearance 1020 Vienna", stateKey: "wien", shortDescDe: "Flexible Haushaltsauflösungen in der Leopoldstadt – vom Karmeliterviertel bis zu den Donau-City-Neubauten.", shortDescEn: "Flexible household clearances in Leopoldstadt – from Karmeliterviertel to Donau City new builds." },
  { slug: "wien-1030", nameDe: "Haushaltsauflösung 1030 Wien", nameEn: "Household clearance 1030 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in der Landstraße – vom Botschaftsviertel bis St. Marx. Fixpreis, Wertausgleich und schnelle Halteverbotszonen-Organisation.", shortDescEn: "Clearance in Landstraße – from embassy quarter to St. Marx. Fixed price, value allowance and fast no-parking zone organisation." },
  { slug: "wien-1040", nameDe: "Haushaltsauflösung 1040 Wien", nameEn: "Household clearance 1040 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Wieden für Design-Lofts, Single-Haushalte und Ordinationen nahe der Karlskirche.", shortDescEn: "Clearance in Wieden for design lofts, single households and practices near Karlskirche." },
  { slug: "wien-1050", nameDe: "Haushaltsauflösung 1050 Wien", nameEn: "Household clearance 1050 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Margareten – vom Gemeindebau in Reinprechtsdorf bis zur Gründerzeitwohnung beim Schlossquadrat.", shortDescEn: "Clearance in Margareten – from municipal housing in Reinprechtsdorf to period flats near Schlossquadrat." },
  { slug: "wien-1060", nameDe: "Haushaltsauflösung 1060 Wien", nameEn: "Household clearance 1060 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Mariahilf – Naschmarkt-Lofts, Boutiquen in der Gumpendorfer Straße und Dachwohnungen nahe Haus des Meeres.", shortDescEn: "Clearance in Mariahilf – Naschmarkt lofts, Gumpendorfer Straße boutiques and roof flats near Haus des Meeres." },
  { slug: "wien-1070", nameDe: "Haushaltsauflösung 1070 Wien", nameEn: "Household clearance 1070 Vienna", stateKey: "wien", shortDescDe: "Haushaltsauflösung & Entrümpelung in 1070 Wien Neubau – Fixpreis, Wertanrechnung und kostenlose Besichtigung für Wohnungen, Lofts & Studios.", shortDescEn: "Household clearance in 1070 Vienna Neubau – fixed price, value allowance and free inspection for flats, lofts and studios." },
  { slug: "wien-1080", nameDe: "Haushaltsauflösung 1080 Wien", nameEn: "Household clearance 1080 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in der Josefstadt – Palais, Theaterwohnungen und Townhouses zwischen Rathaus und Gürtel.", shortDescEn: "Clearance in Josefstadt – palais, theatre flats and townhouses between Rathaus and Gürtel." },
  { slug: "wien-1090", nameDe: "Haushaltsauflösung 1090 Wien", nameEn: "Household clearance 1090 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Alsergrund – Universität, Spitäler und das historische Stadtviertel mit Josefstadt und Alservorstadt.", shortDescEn: "Clearance in Alsergrund – university, hospitals and the historic district with Josefstadt and Alservorstadt." },
  { slug: "wien-1100", nameDe: "Haushaltsauflösung 1100 Wien", nameEn: "Household clearance 1100 Vienna", stateKey: "wien", shortDescDe: "High-Volume-Räumungen in Favoriten – für Gemeindebauten, Neubauten und Reihenhäuser. MA 48-Abstimmung, Wertausgleich und kurzfristige Express-Termine.", shortDescEn: "High-volume clearances in Favoriten – municipal housing, new builds and terraced houses. MA 48 coordination, value allowance and short-notice express appointments." },
  { slug: "wien-1110", nameDe: "Haushaltsauflösung 1110 Wien", nameEn: "Household clearance 1110 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Simmering – Gasometer-Lofts, Einfamilienhäuser und Gewerbehallen zwischen Zentralfriedhof und Alberner Hafen.", shortDescEn: "Clearance in Simmering – Gasometer lofts, single-family homes and commercial premises between Zentralfriedhof and Alberner Hafen." },
  { slug: "wien-1120", nameDe: "Haushaltsauflösung 1120 Wien", nameEn: "Household clearance 1120 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Meidling – von Altbauwohnungen bei der Meidlinger Hauptstraße bis zu Terrassenhäusern in Hetzendorf.", shortDescEn: "Clearance in Meidling – from period flats on Meidlinger Hauptstraße to terraced houses in Hetzendorf." },
  { slug: "wien-1130", nameDe: "Haushaltsauflösung 1130 Wien", nameEn: "Household clearance 1130 Vienna", stateKey: "wien", shortDescDe: "Diskrete Räumung von Häusern und Villen in Hietzing mit Bewertung hochwertiger Nachlässe. Fixpreis, Wertausgleich und MA 48-Koordination.", shortDescEn: "Discreet clearance of houses and villas in Hietzing with valuation of high-value estates. Fixed price, value allowance and MA 48 coordination." },
  { slug: "wien-1140", nameDe: "Haushaltsauflösung 1140 Wien", nameEn: "Household clearance 1140 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Penzing – Villen in Hietzing-Nähe, Gemeindebauten in Breitensee und Gewerbeobjekte bis Auhof.", shortDescEn: "Clearance in Penzing – villas near Hietzing, municipal housing in Breitensee and commercial premises to Auhof." },
  { slug: "wien-1150", nameDe: "Haushaltsauflösung 1150 Wien", nameEn: "Household clearance 1150 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Rudolfsheim-Fünfhaus – Gründerzeitgürtel, Stadthallen-Viertel und Airbnb-Apartments nahe Westbahnhof.", shortDescEn: "Clearance in Rudolfsheim-Fünfhaus – period Gürtel, Stadthallen quarter and Airbnb apartments near Westbahnhof." },
  { slug: "wien-1160", nameDe: "Haushaltsauflösung 1160 Wien", nameEn: "Household clearance 1160 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Ottakring – Yppenplatz-Lofts, Gemeindebauten und Werkstätten am Wilhelminenberg. Fixpreis, Wertausgleich und MA 48-Abstimmung.", shortDescEn: "Clearance in Ottakring – Yppenplatz lofts, municipal housing and workshops on Wilhelminenberg. Fixed price, value allowance and MA 48 coordination." },
  { slug: "wien-1170", nameDe: "Entrümpelung 1170 Wien", nameEn: "Clearance 1170 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Hernals – Vorstadtvillen, Gemeindebauten und Gewerbeflächen zwischen Elterleinplatz und Dornbach.", shortDescEn: "Clearance in Hernals – suburban villas, municipal housing and commercial premises between Elterleinplatz and Dornbach." },
  { slug: "wien-1180", nameDe: "Entrümpelung 1180 Wien", nameEn: "Clearance 1180 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Währing für Cottageviertel, Eduardgasse und Studentenwohnungen rund um die BOKU. Fixpreis, Wertausgleich und besenreine Übergabe.", shortDescEn: "Clearance in Währing for Cottage district, Eduardgasse and student flats around BOKU. Fixed price, value allowance and broom-clean handover." },
  { slug: "wien-1190", nameDe: "Haushaltsauflösung 1190 Wien", nameEn: "Household clearance 1190 Vienna", stateKey: "wien", shortDescDe: "Diskrete Entrümpelungen in Döbling für Heurigenvillen, Dachwohnungen und Genossenschaftsobjekte. Fixpreis, Wertausgleich und direkte MA 48-Anbindung.", shortDescEn: "Discreet clearances in Döbling for wine tavern villas, loft flats and cooperative properties. Fixed price, value allowance and direct MA 48 link." },
  { slug: "wien-1200", nameDe: "Haushaltsauflösung 1200 Wien", nameEn: "Household clearance 1200 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Brigittenau – Donauufer, Millennium City und Gemeindebauten zwischen Wallensteinplatz und Brigittaplatz.", shortDescEn: "Clearance in Brigittenau – Danube bank, Millennium City and municipal housing between Wallensteinplatz and Brigittaplatz." },
  { slug: "wien-1210", nameDe: "Haushaltsauflösung 1210 Wien", nameEn: "Household clearance 1210 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Floridsdorf – Einfamilienhäuser, Kleingärten und Unternehmensflächen vom Bisamberg bis Kagran.", shortDescEn: "Clearance in Floridsdorf – single-family homes, allotment gardens and commercial premises from Bisamberg to Kagran." },
  { slug: "wien-1220", nameDe: "Haushaltsauflösung 1220 Wien", nameEn: "Household clearance 1220 Vienna", stateKey: "wien", shortDescDe: "Flächendeckende Räumungen in der Donaustadt – von der Donau City über die Seestadt Aspern bis in die Lobau.", shortDescEn: "Full-scale clearances in Donaustadt – from Donau City via Seestadt Aspern to the Lobau." },
  { slug: "wien-1230", nameDe: "Haushaltsauflösung 1230 Wien", nameEn: "Household clearance 1230 Vienna", stateKey: "wien", shortDescDe: "Entrümpelung in Liesing – Wohnsiedlungen, Unternehmensstandorte und Winzerhöfe zwischen Atzgersdorf und Perchtoldsdorf.", shortDescEn: "Clearance in Liesing – housing estates, business locations and wineries between Atzgersdorf and Perchtoldsdorf." },
  { slug: "klosterneuburg-kahlenberg", nameDe: "Klosterneuburg & Ölberg", nameEn: "Klosterneuburg & Kahlenberg", stateKey: "wien", shortDescDe: "Umgebung Nord", shortDescEn: "North area" },
  { slug: "wien", nameDe: "objekträumung – Wien", nameEn: "objekträumung – Vienna", stateKey: "wien", shortDescDe: "23 Bezirke, kurze Anfahrten", shortDescEn: "23 districts, short travel" },
  // Niederösterreich
  { slug: "niederoesterreich-baden", nameDe: "Haushaltsauflösung Baden", nameEn: "Household clearance Baden", stateKey: "niederoesterreich", shortDescDe: "Thermenregion", shortDescEn: "Spa region" },
  { slug: "niederoesterreich-klosterneuburg", nameDe: "Haushaltsauflösung Klosterneuburg", nameEn: "Household clearance Klosterneuburg", stateKey: "niederoesterreich", shortDescDe: "Stadt vor den Toren Wiens", shortDescEn: "Town at the gates of Vienna" },
  { slug: "niederoesterreich-korneuburg", nameDe: "Haushaltsauflösung Korneuburg", nameEn: "Household clearance Korneuburg", stateKey: "niederoesterreich" },
  { slug: "niederoesterreich-moedling", nameDe: "Entrümpelung Mödling", nameEn: "Clearance Mödling", stateKey: "niederoesterreich" },
  { slug: "niederoesterreich-st-poelten", nameDe: "Entrümpelung St. Pölten", nameEn: "Clearance St. Pölten", stateKey: "niederoesterreich" },
  { slug: "niederoesterreich", nameDe: "Entrümpelung Niederösterreich", nameEn: "Clearance Lower Austria", stateKey: "niederoesterreich", shortDescDe: "Umland, Wienerwald, Bezirksstädte", shortDescEn: "Suburbs, Vienna Woods, district towns" },
  // Burgenland
  { slug: "burgenland-eisenstadt", nameDe: "Haushaltsauflösung Eisenstadt", nameEn: "Household clearance Eisenstadt", stateKey: "burgenland" },
  { slug: "burgenland-mattersburg", nameDe: "Haushaltsauflösung Mattersburg", nameEn: "Household clearance Mattersburg", stateKey: "burgenland" },
  { slug: "burgenland-neusiedl", nameDe: "Haushaltsauflösung Neusiedl am See", nameEn: "Household clearance Neusiedl am See", stateKey: "burgenland" },
  { slug: "burgenland", nameDe: "Entrümpelung Burgenland", nameEn: "Clearance Burgenland", stateKey: "burgenland", shortDescDe: "Eisenstadt, Neusiedler See, Südburgenland", shortDescEn: "Eisenstadt, Lake Neusiedl, South Burgenland" },
  // Steiermark
  { slug: "steiermark", nameDe: "Entrümpelung Steiermark", nameEn: "Clearance Styria", stateKey: "steiermark", shortDescDe: "Graz, Leoben, Südsteiermark", shortDescEn: "Graz, Leoben, Southern Styria" },
  // Kärnten
  { slug: "kaernten", nameDe: "Entrümpelung Kärnten", nameEn: "Clearance Carinthia", stateKey: "kaernten", shortDescDe: "Klagenfurt, Villach, Wörthersee", shortDescEn: "Klagenfurt, Villach, Wörthersee" },
  // Oberösterreich
  { slug: "oberoesterreich", nameDe: "Entrümpelung Oberösterreich", nameEn: "Clearance Upper Austria", stateKey: "oberoesterreich", shortDescDe: "Linz, Wels, Steyr, Salzkammergut", shortDescEn: "Linz, Wels, Steyr, Salzkammergut" },
  // Salzburg
  { slug: "salzburg", nameDe: "Entrümpelung Salzburg", nameEn: "Clearance Salzburg", stateKey: "salzburg", shortDescDe: "Stadt, Flachgau, Alpenregionen", shortDescEn: "City, Flachgau, Alpine regions" },
];

/** Feste Reihenfolge für „Am häufigsten gesucht“ auf der Standorte-Seite */
export const MOST_SEARCHED_SLUGS: string[] = [
  "wien-1170",
  "wien-1180",
  "wien-1190",
  "wien-1210",
  "wien-1220",
  "klosterneuburg-kahlenberg",
];

export function getLocationBySlug(slug: string): LocationItem | undefined {
  return LOCATIONS.find((loc) => loc.slug === slug);
}

export function getLocationsByState(stateKey: StateKey): LocationItem[] {
  return LOCATIONS.filter((loc) => loc.stateKey === stateKey);
}

export function getAllSlugs(): string[] {
  return LOCATIONS.map((loc) => loc.slug);
}

/** Suchindex: alle durchsuchbaren Texte pro Locale */
export function getSearchIndex(locale: "at" | "en") {
  const nameKey = locale === "at" ? "nameDe" : "nameEn";
  const descKey = locale === "at" ? "shortDescDe" : "shortDescEn";
  return LOCATIONS.map((loc) => ({
    slug: loc.slug,
    title: loc[nameKey],
    desc: loc[descKey] ?? "",
    stateKey: loc.stateKey,
  }));
}
