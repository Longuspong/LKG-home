# Website – Landeskirchliche Gemeinschaft Limbach-Oberfrohna

Neue Website als Ablösung der bisherigen WordPress-Seite. Statisches
HTML/CSS/JS ohne Build-Prozess – kann direkt bearbeitet und überall
gehostet werden (z.B. GitHub Pages, Netlify oder klassisches Webhosting
per FTP-Upload).

## Struktur

```
index.html            Startseite (Hero, Impuls-Teaser, Termine, Kontakt)
archiv.html           Archiv aller Monatsimpulse (Volltexte)
admin.html            Admin-Oberfläche zum Pflegen von Termine/Impulsen
impressum.html        Impressum (Platzhalter – siehe unten)
datenschutz.html      Datenschutzerklärung (Platzhalter – siehe unten)
assets/css/style.css  Gesamtes Styling (mobile-first)
assets/js/main.js     Mobiles Menü, aktuelles Jahr im Footer
assets/js/content.js  Lädt Termine/Impulse aus assets/data/*.json und rendert sie
assets/js/admin.js    Logik der Admin-Oberfläche (admin.html)
assets/data/termine.json  Termine (Rhythmus, Tabellen, Hinweistext)
assets/data/impulse.json  Monatsimpulse (aktueller + Archiv)
assets/img/logo.svg   Vereinfachtes Logo (siehe unten)
```

## Lokal ansehen

Kein Build nötig. Entweder die `index.html` direkt im Browser öffnen,
oder für relative Pfade zuverlässig einen kleinen lokalen Server starten:

```
python3 -m http.server 8000
```

und dann `http://localhost:8000` öffnen.

Wichtig: Termine und Impulse werden per JavaScript aus
`assets/data/*.json` nachgeladen (`fetch`). Das funktioniert nur über
`http://…`, nicht wenn `index.html` direkt per Doppelklick als
`file://…` geöffnet wird – bitte immer den lokalen Server nutzen.

## Inhalte pflegen (über die Admin-Oberfläche)

`admin.html` im Browser öffnen (lokal oder auf dem Live-Server). Dort:

- **Termine:** Treffpunkt, wöchentlichen Rhythmus und die
  Termin-Tabellen bearbeiten – Zeilen/Tabellen hinzufügen oder
  entfernen, Werte direkt in den Feldern ändern.
- **Monatsimpuls:** über „+ Neuer Impuls“ oben einen neuen Eintrag
  anlegen (Zitat, Kurztext für die Startseite, Volltext für das
  Archiv, Autor). Ältere Einträge bleiben erhalten und erscheinen im
  Archiv.
- Danach unten auf **„Dateien herunterladen“** klicken. Das lädt
  `termine.json` und `impulse.json` herunter – diese beiden Dateien
  ersetzen die gleichnamigen Dateien in `assets/data/` (Git-Commit,
  FTP-Upload o.ä., je nach Hosting) und veröffentlichen.

**Achtung:** `admin.html` ist aktuell nicht durch ein Login geschützt
(es gibt noch kein Backend, da das Hosting noch nicht final ist) –
nur nicht in der Navigation verlinkt. Den Link nicht öffentlich
teilen. Sobald das Hosting feststeht, sollte echter Zugriffsschutz
ergänzt werden (z.B. GitHub-Login bei GitHub Pages oder HTTP-Basic-
Auth beim klassischen Webhosting).

Alternativ können die JSON-Dateien in `assets/data/` auch direkt von
Hand bearbeitet werden (gleiche Struktur wie im Admin-Formular).

## Noch offen / vor Veröffentlichung zu erledigen

- **Logo:** `assets/img/logo.svg` ist eine grobe Nachbildung des
  Logos anhand des Flyer-Screenshots. Bitte durch die echte Logo-Datei
  ersetzen (gleicher Dateiname reicht, oder Pfad in den `<link>`/`<img>`-
  Tags anpassen).
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
