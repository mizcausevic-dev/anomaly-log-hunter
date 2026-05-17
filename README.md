# Anomaly Log Hunter

TypeScript control plane for parsing access-log anomalies, burst abuse, and suspicious source patterns before they distort traffic and incident signals.

## Why this exists

Raw logs are usually where suspicious traffic goes to disappear. By then:
- scrapers have already harvested commercial pages
- credential stuffing looks like ordinary auth noise
- synthetic referrals seed attribution with fake demand
- incident response gets stuck arguing about whether a spike was real, malicious, or just marketing

`anomaly-log-hunter` turns abnormal traffic patterns into a business-readable queue before they distort resilience and growth decisions.

## Routes

- `/`
- `/anomaly-lane`
- `/source-patterns`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/anomaly-lane`
- `/api/source-patterns`
- `/api/verification`
- `/api/sample`

## Screenshots

![Overview](./screenshots/01-overview-proof.png)
![Anomaly lane](./screenshots/02-anomaly-lane-proof.png)
![Source patterns](./screenshots/03-source-patterns-proof.png)
![Verification](./screenshots/04-verification-proof.png)

## Local Development

```powershell
cd anomaly-log-hunter
npm install
npm run dev
```

Open:
- [http://127.0.0.1:5360/](http://127.0.0.1:5360/)
- [http://127.0.0.1:5360/anomaly-lane](http://127.0.0.1:5360/anomaly-lane)
- [http://127.0.0.1:5360/source-patterns](http://127.0.0.1:5360/source-patterns)
- [http://127.0.0.1:5360/verification](http://127.0.0.1:5360/verification)
- [http://127.0.0.1:5360/docs](http://127.0.0.1:5360/docs)

## Validation

- `npm run build`
- `npm run test`
- `npm run demo`
- `npm run smoke`
- `npm run render:assets`

## Docs

- [Architecture](./docs/architecture.md)
- [Origin](./docs/ORIGIN.md)
- [Changelog](./CHANGELOG.md)
