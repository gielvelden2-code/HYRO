# VYRO — mobile test app

Buildless mobile web app. Serve `dist/` with any static web server; HTTPS is needed for location/camera permissions on a phone.

## Working features

- Local test profile and persistent browser data.
- Activity timer, GPS acquisition, pause/resume, measured distance, manual entries, history, filters, detail, GPX and share export.
- Food search, portions, daily calories/macros, custom foods, barcode lookup (Open Food Facts), optional native browser camera scanner, water.
- Manual sleep logging, weekly history and goals.
- Foreground alarms with sound, repeating weekdays, bedtime reminders.
- Personal goals and insights, profile edit, JSON backup export/import.

## Explicit limits

No server accounts, cloud synchronization, real friend/club network, wearable integration, automatic step counting or sleep tracking. Browser timers/GPS are not reliable when backgrounded. Community feed is clearly marked sample content. Maps are schematic; GPS traces reflect recorded positions. Calories are estimates. Barcode lookup requires internet and available product data.

Ubuntu is bundled. Monument Extended is not supplied: add the appropriately licensed font file and its @font-face declaration to match the requested typeface exactly. A broad bold fallback is used meanwhile.

The welcome illustration is displayed from the approved design board, preserving that artwork. The logo is a vector recreation of the supplied VYRO design.

## Test validation

Browser-tested onboarding, steps, nutrition portion calculations, sleep across midnight, manual workout pace, navigation and persistence after reload. GPS/camera and background behavior need tests on an actual phone.

## GitHub

Source repository: https://github.com/gielvelden2-code/HYRO

To host on GitHub Pages, publish the contents of `dist/`. The included Pages workflow deploys this folder when Pages is configured to use GitHub Actions.

## Version 1.1

Profile photo upload (center crop and compression), four bundled original alarm sounds, custom local ringtone uploads stored in IndexedDB, per-alarm sound choice and previews, Lucide SVG icons, and edge-to-edge responsive layouts. Custom audio is stored per browser and is not included in JSON backups.
