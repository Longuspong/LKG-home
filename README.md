# Website – Landeskirchliche Gemeinschaft Limbach-Oberfrohna

Neue Website als Ablösung der bisherigen WordPress-Seite. Statisches
HTML/CSS/JS ohne Build-Prozess – kann direkt bearbeitet und überall
gehostet werden (z.B. GitHub Pages, Netlify oder klassisches Webhosting
per FTP-Upload).

## Struktur

```
index.html         Startseite (Hero, Impuls-Teaser, Treffzeiten, Kontakt)
termine.html        Alle Termine (Tabellen, nächster Termin hervorgehoben)
archiv.html         Archiv aller Monatsimpulse (Volltexte)
impressum.html      Impressum (Platzhalter – siehe unten)
datenschutz.html     Datenschutzerklärung (Platzhalter – siehe unten)
assets/css/style.css  Gesamtes Styling (mobile-first)
assets/js/main.js     Mobiles Menü, aktuelles Jahr im Footer
assets/img/logo.svg              Logo-Zeichen (Tür/Kreuz) – Favicon
assets/img/logo-navi.svg         Logo weiß mit Gemeindename – Header/Navigation
assets/img/logo-jesus-erlebt.svg  Logo weiß „Jesus erlebt" – Hero
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
- **Treffzeiten (Startseite):** Die allgemeinen, wiederkehrenden Zeiten
  (Gemeinschaftsstunde, Bibelstunde …) stehen in `index.html` im Abschnitt
  `<section id="termine">` als `<ul class="schedule-list">`. Darunter führt
  der Button „Alle Termine ansehen" auf `termine.html`.
- **Termine (termine.html):** Die konkreten, datierten Termine stehen als
  Tabellen in `termine.html` – das ist die Grundlage, die quartalsweise
  gepflegt wird. Einfach Zeilen (`<tr>`) ergänzen/entfernen bzw. Daten
  aktualisieren. **Wichtig:** Jede Zeile trägt zusätzlich zum sichtbaren
  Datum ein Attribut `data-date="JJJJ-MM-TT"` (z.B. `data-date="2026-09-06"`).
  Daran erkennt die Seite automatisch den nächsten, noch nicht vergangenen
  Termin und hebt ihn hervor – dieses Attribut also immer mitpflegen.
  Vergangene Termine sollten regelmäßig entfernt werden, damit die Seite
  aktuell wirkt.

## Noch offen / vor Veröffentlichung zu erledigen

- **Logo:** Es werden die Original-Logos (weiße Fassung) verwendet:
  `logo-navi.svg` (Zeichen + Gemeindename) im Header, `logo-jesus-erlebt.svg`
  (Zeichen + „Jesus erlebt") im Hero. Beide enthalten den Schriftzug bereits,
  deshalb steht in Header/Hero kein zusätzlicher Text mehr. `logo.svg` ist
  das Tür-Zeichen für das Favicon (dunkel eingefärbt, damit es auf hellem
  Tab sichtbar ist). Zum Austauschen einfach die SVG-Dateien ersetzen bzw.
  die Pfade in den `<link>`/`<img>`-Tags anpassen.
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
