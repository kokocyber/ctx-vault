# Equinox
Christopher Taha Extreme Vault 苦い Plus Ultra

## Tech

Equinox benutzte folgende Technologien für die Realisierung:

- [Next.js](https://nextjs.org/) - React Web Framework (Front- und Backend)
- [Prisma](https://www.prisma.io/) - ORM für Datenbanktransaktionen
- [Docker](https://www.docker.com/) - Für die Verpackung unserer Applikation
- [Postgres](https://www.postgresql.org/) - Verwendete Datenbank

## Installation (prod)
// TO DO

## Installation (dev)

Installiere Dependencies

```sh
npm i -y
```
Bereite die Datenbank zu
```sh
docker compose up -d
npx prisma generate
npx prisma migrate dev --name init
```
Starte die Applikation
```sh
npm run dev
```

## Endpoints

Unsere implementierte Endpoints

| Endpoint | Beschreibung |
| ------ | ------ |
| GET /api/v1/healthcheck | Healthcheck Testing Endpoint |
|  |  |
| POST /api/v1/login | Login für Endnutzer |
| GET /api/v1/logout | Logout für Endnutzer |
|  |  |
| GET /api/v1/user | Ruft alle Nutzer auf |
| POST /api/v1/user | Erstellt Nutzer |
|  |  |
| GET /api/v1/user/[id] | Ruft Nutzer nach ID auf |
| DELETE /api/v1/user/[id] | Löscht Nutzer nach ID |
| PUT /api/v1/user/[id] | Bearbeitet Nutzer nach ID |
|  |  |
| GET /api/v1/categories | Ruft alle Passwort-Kategorien für Nutzer auf |
| POST /api/v1/categories | Erstellt Passwort-Kategorie für Nutzer |
| PUT /api/v1/categories | Bearbeitet Passwort-Kategorie Namen für Nutzer |
| DELETE /api/v1/categories | Löscht Passwort-Kategorie für Nutzer |
|  |  |
| GET /api/v1/password | Ruft alle Passwörter für Nutzer nach Kategorie auf |
| POST /api/v1/password | Erstellt Passwort in Kategorie für Nutzer |
| DELETE /api/v1/password | Löscht Passwort in Kategorie für Nutzer |
| DELETE /api/v1/password | Bearbeitet Passwort in Kategorie für Nutzer |
