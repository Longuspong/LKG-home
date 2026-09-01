# Website – Landeskirchliche Gemeinschaft Limbach-Oberfrohna

Neue Website als Ablösung der bisherigen WordPress-Seite. Statisches
HTML/CSS/JS ohne Build-Prozess – kann direkt bearbeitet und überall
gehostet werden (z.B. GitHub Pages, Netlify oder klassisches Webhosting
per FTP-Upload).

## Struktur

```
index.html         Startseite (Hero, Impuls-Teaser, Termine, Kontakt)
archiv.html         Archiv aller Monatsimpulse (Volltexte)
impressum.html      Impressum (Platzhalter – siehe unten)
datenschutz.html     Datenschutzerklärung (Platzhalter – siehe unten)
assets/css/style.css  Gesamtes Styling (mobile-first)
assets/js/main.js     Mobiles Menü, aktuelles Jahr im Footer
assets/img/logo.svg       Logo-Zeichen farbig (Favicon / helle Flächen)
assets/img/logo-light.svg  Logo-Zeichen weiß (Header/Hero, dunkler Grund)
```

## Lokal ansehen

Kein Build nötig. Entweder die `index.html` direkt im Browser öffnen,
oder für relative Pfade zuverlässig einen kleinen lokalen Server starten:

```
python3 -m http.server 8000
```

und dann `http://localhost:8000` öffnen.

## Inhalte pflegen

- **Monatsimpuls:** Teaser-Text in `index.html` im Abschnitt
  `<section id="impuls">` anpassen. Den vollständigen Text als neuen
  Eintrag (`<article class="archive-entry">`) oben in `archiv.html`
  einfügen, der bisherige Text bleibt darunter erhalten.
- **Termine:** Tabellen in `index.html` im Abschnitt
  `<section id="termine">`. Einfach Zeilen (`<tr>`) ergänzen/entfernen
  bzw. Daten aktualisieren. Vergangene Termine sollten regelmäßig
  entfernt werden, damit die Seite aktuell wirkt.

## Noch offen / vor Veröffentlichung zu erledigen

- **Logo:** Das Zeichen (Tür mit Kreuz) ist als SVG anhand der
  Logo-Vorlagen nachgebaut – `logo.svg` farbig fürs Favicon, `logo-light.svg`
  weiß für den dunklen Header/Hero. Der Schriftzug „Landeskirchliche
  Gemeinschaft Limbach-Oberfrohna" wird bewusst als HTML-Text (Montserrat)
  gesetzt, damit er scharf und responsiv bleibt. Es bleibt eine Nachbildung:
  Sobald die echte Vektordatei (SVG/EPS/PDF) vom Grafiker/Flyer vorliegt,
  können die beiden SVGs damit ersetzt werden (gleiche Dateinamen reichen,
  oder Pfade in den `<link>`/`<img>`-Tags anpassen).
- **Impressum** (`impressum.html`): verantwortliche Person, Kontakt
  (Telefon/E-Mail) eintragen – gesetzlich vorgeschrieben.
- **Datenschutz** (`datenschutz.html`): verantwortliche Person und
  Hosting-Anbieter eintragen, Text erweitern, sobald Formulare, Karten
  oder Tracking-Tools hinzukommen.
- **Hosting:** Domain `lkg-lo.de` müsste auf das neue Hosting
  umgezogen werden, sobald die Seite fertig ist.

## Design

Farben und Formsprache orientieren sich am aktuellen Flyer-Design
(dunkles Petrol/Teal, helles Türkis, Gelb als Akzent, kräftige
Großbuchstaben-Headlines). Die Seite ist bewusst als ein einziger
Seiten-Fluss (One-Pager) mit nur zwei Inhalten aufgebaut: Termine und
Monatsimpuls (mit Link ins Archiv), plus Impressum/Datenschutz im
Footer, da diese gesetzlich erforderlich sind.
