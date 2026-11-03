# VISION AI · 0.10.0

Futuristischer persönlicher Workspace mit React und TypeScript.

## Start

Node.js 22.18+ oder 24 verwenden.

```sh
npm ci
npm run dev
npm test
npm run build
```

## Stand

Die Startseite und die Funktionsseiten gehören jetzt zu derselben React-Anwendung. Das violette Kristall-Dashboard führt zu Chat, Projekten, Bildstudio, Sprache und Einstellungen. GitHub Pages veröffentlicht direkt den React-Build; die separate HTML-Demo überschreibt ihn nicht mehr.

- Chat: simuliertes Streaming mit sofortiger Sperre gegen paralleles Senden und sicherem Abbruch. Verlauf lokal im Browser (maximal 80 Nachrichten), keine Cloud-Synchronisierung.
- Sprache: echte Mikrofonvisualisierung. Pause deaktiviert die Audiotracks; Seitenwechsel und Beenden geben das Mikrofon frei. Noch keine Spracherkennung.
- Bilder, Projekte, Geräte und Cloud: ausdrücklich Demo bzw. noch nicht angeschlossen.
- Wetter und Projektfortschritte werden nicht als vermeintliche Live-Daten angezeigt.

Es gibt noch keine KI-Anbindung. API-Schlüssel gehören später ausschließlich in ein Backend, niemals in dieses öffentliche Frontend.

## Struktur

- `src/components/Dashboard.tsx`: gemeinsame Startseite
- `src/hooks/useVisionAI.ts`: abbrechbarer Demo-Chat
- `src/hooks/useVoice.ts`: Mikrofon-Lebenszyklus
- `src/lib/chatStorage.ts`: validierter, fehlertoleranter Browserspeicher
- `src/lib/streamSession.ts`: synchrone Sitzungssperre
- `src/App.tsx`: Navigation und übrige Funktionsseiten
- `tests/core.test.mjs`: Speicher- und Streaming-Regressionstests

`public/dashboard.html` und `vision-ai-0-1.html` bleiben historische Designstände. Sie sind nicht die Startseite und werden nicht weiterentwickelt.

## Nächste Schritte

Weitere Seiten aus App.tsx in Komponenten aufteilen; danach einen serverseitigen KI-Endpunkt mit Streaming, Fehlerbehandlung und Kostenbegrenzung integrieren. Projektgedächtnis und echte Projektverwaltung folgen auf dieser Grundlage.
