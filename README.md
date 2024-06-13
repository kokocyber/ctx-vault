# Equinox
Christopher Taha Extreme Vault 苦い Plus Ultra

## Project Team
1. Taha Ali (azw / Sulzer AG)
2. Cristofer sheelz (SwissRe AG)

## Projektdefinition: Password-Safe
Unser Projekt besteht darin, einen Password-Safe zu entwickeln, der als Web-Anwendung mit einem React Frontend und einem Spring Boot Backend (Können mit einverständnis der Lehrperson auch etwas anderes verwenden) realisiert wird. Benutzer können sich registrieren und anmelden, um ihre Passwörter sicher zu verwalten. Die Anwendung ermöglicht das Speichern, Anzeigen, Bearbeiten, Löschen und Hinzufügen von Zugangsdaten für Webseiten und Programme. Zusätzlich wird eine Funktion zur Änderung des Masterpassworts implementiert. Die Sicherheit der Anwendung wird durch den Einsatz einer bekannten Java-Verschlüsselungstechnik gewährleistet, wobei OWASP Top Ten Risiken beachtet werden.

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
| GET /api/v1/user/me | Ruft Benutzer-Daten auf |
|  |  |
| GET /api/v1/categories | Ruft alle Passwort-Kategorien für Nutzer auf |
| POST /api/v1/categories | Erstellt Passwort-Kategorie für Nutzer |
| PUT /api/v1/categories | Bearbeitet Passwort-Kategorie Namen für Nutzer |
| DELETE /api/v1/categories | Löscht Passwort-Kategorie für Nutzer |
|  |  |
| GET /api/v1/password | Ruft alle Passwörter für Nutzer nach Kategorie auf |
| POST /api/v1/password | Erstellt Passwort in Kategorie für Nutzer |
| DELETE /api/v1/password | Löscht Passwort in Kategorie für Nutzer |
| PUT /api/v1/password | Bearbeitet Passwort in Kategorie für Nutzer |


## Datenabspeicherung & Sicherheit

In unserem Projekt legen wir besonderen Wert auf die Sicherheit der Datenabspeicherung. Alle API-Endpunkte sind durch JWT (JSON Web Token) geschützt, was sicherstellt, dass nur autorisierte Benutzer auf die Daten zugreifen können.

Zur Sicherung sensibler Informationen verwenden wir AES (Advanced Encryption Standard) mit einem sicheren Secret Key, um Passwörter zu verschlüsseln. Dadurch wird sichergestellt, dass die Passwörter selbst in der Datenbank sicher gespeichert sind und nur autorisierte Anwendungen diese entschlüsseln können.

Das Master-Passwort der Benutzer wird gehasht und mit einem "Salt" versehen, bevor es gespeichert wird. Diese Maßnahme erhöht die Sicherheit erheblich, indem sie den Zugriff auf das Master-Passwort selbst bei einem Datenbankangriff erschwert.

Diese Sicherheitsmaßnahmen sind integraler Bestandteil unserer Datenabspeicherung, um die Vertraulichkeit und Integrität der Nutzerdaten zu gewährleisten und gleichzeitig die Anforderungen an moderne Sicherheitsstandards zu erfüllen.

## Seiten
| Link | Nutzen |
| ------ | ------ |
| / | Homepage |
|  |  |
| /pricing | Infos zu den von uns gesetzten Preisen |
|  |  |
| /about | About Seite zu der Firma und deren CEO's |
|  |  |
| /login | User Login Seite |
|  |  |
| /register | User Registration Seite |
|  |  |
| /logout | User Logout Seite |
|  |  |
| /account | Seite zu deinem Account, wo man den Vor- und Nachnamen sowie das Passwort ändern kann |
|  |  |
| /vault | Passwort Vault Seite |

## Reflexion

### Taha
Das Password-Safe-Projekt war sehr lehrreich. Beim Frontend und Backend mit Next.js haben wir viel dazugelernt, besonders was Sicherheit und modernes Design angeht. Es war spannend, die Funktionen für das Anmelden und die Passwortverwaltung zu implementieren, und wir haben viel über die besten Praktiken in der Softwareentwicklung erfahren.

Gegen Ende des Projekts hatten wir allerdings einige technische Schwierigkeiten, wie Probleme mit Paketversionen und Fehler bei den Prisma-Migrationen. Diese Probleme haben uns ziemlich gefordert, aber wir haben sie dank guter Teamarbeit und ein wenig Geduld rechtzeitig gelöst.

Ich bin sehr zufrieden mit dem, was wir erreicht haben. Unsere Anwendung funktioniert gut und erfüllt alle Anforderungen, die wir an sie gestellt haben. In den kommenden Wochen wollen wir noch weiter daran arbeiten, um sie zu verbessern und die Benutzerfreundlichkeit zu erhöhen. Diese Erfahrung hat uns nicht nur technisch weitergebracht, sondern auch unser Verständnis für die Bedeutung von Sicherheit in der Softwareentwicklung vertieft. Wir haben viel darüber gelernt, wie wichtig es ist, bei der Entwicklung stets auf Sicherheit zu achten und ständig nach Verbesserungsmöglichkeiten zu suchen.

### Christopher
Das Password-Safe-Projekt war eine äußerst wertvolle Erfahrung für uns. Während wir sowohl das Frontend als auch das Backend mit Next.js entwickelten, haben wir umfassende Kenntnisse in Bezug auf Sicherheitsaspekte und modernes Design erlangt. Insbesondere die Implementierung der Anmeldefunktionen und der Passwortverwaltung stellte uns vor interessante Herausforderungen.

Gegen Ende des Projekts traten jedoch einige technische Schwierigkeiten auf, die unsere Fähigkeiten auf die Probe stellten. Wir kämpften mit Problemen bei den Paketversionen von npm und hatten Schwierigkeiten mit Prisma-Migrationen. Diese Hindernisse waren anspruchsvoll, aber durch eine gute Zusammenarbeit im Team und die nötige Geduld konnten wir sie rechtzeitig überwinden.

Dennoch bin ich äußerst zufrieden mit dem Erreichten. Unsere Anwendung läuft stabil und erfüllt sämtliche Anforderungen, die wir gestellt haben. In den kommenden Wochen möchten wir weiterhin an der Verbesserung der Benutzerfreundlichkeit arbeiten und die Performance optimieren. Diese Erfahrung hat nicht nur unsere technischen Fähigkeiten erweitert, sondern auch unser Bewusstsein für die Wichtigkeit von Sicherheitsaspekten in der Softwareentwicklung vertieft. Wir haben gelernt, wie entscheidend es ist, Sicherheitspraktiken kontinuierlich zu verbessern und stets auf dem neuesten Stand zu bleiben.

Nächstes mal sollten wir wirklich früher den Endspurt starten, damit solche Fehler nicht kurz vor der Abgabe auftreten.
