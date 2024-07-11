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

Erstelle einen .env.local im root und definiere folgende Variablen:

```
SECRET_KEY="SECRET_KEY"
NEXT_PUBLIC_SECRET_KEY="SECRET_KEY"
DATABASE_URL="postgresql://postgres:testPassword@localhost:5432/vault?schema=public"
```

Starte die Applikation

```sh
npm run build
npm run start
```

## Endpoints

Unsere implementierte Endpoints

| Endpoint                  | Beschreibung                                       |
| ------------------------- | -------------------------------------------------- |
| GET /api/v1/healthcheck   | Healthcheck Testing Endpoint                       |
|                           |                                                    |
| POST /api/v1/login        | Login für Endnutzer                                |
| GET /api/v1/logout        | Logout für Endnutzer                               |
|                           |                                                    |
| GET /api/v1/user          | Ruft alle Nutzer auf                               |
| POST /api/v1/user         | Erstellt Nutzer                                    |
|                           |                                                    |
| GET /api/v1/user/[id]     | Ruft Nutzer nach ID auf                            |
| DELETE /api/v1/user/[id]  | Löscht Nutzer nach ID                              |
| PUT /api/v1/user/[id]     | Bearbeitet Nutzer nach ID                          |
|                           |                                                    |
| GET /api/v1/user/me       | Ruft Benutzer-Daten auf                            |
|                           |                                                    |
| GET /api/v1/categories    | Ruft alle Passwort-Kategorien für Nutzer auf       |
| POST /api/v1/categories   | Erstellt Passwort-Kategorie für Nutzer             |
| PUT /api/v1/categories    | Bearbeitet Passwort-Kategorie Namen für Nutzer     |
| DELETE /api/v1/categories | Löscht Passwort-Kategorie für Nutzer               |
|                           |                                                    |
| GET /api/v1/password      | Ruft alle Passwörter für Nutzer nach Kategorie auf |
| POST /api/v1/password     | Erstellt Passwort in Kategorie für Nutzer          |
| DELETE /api/v1/password   | Löscht Passwort in Kategorie für Nutzer            |
| PUT /api/v1/password      | Bearbeitet Passwort in Kategorie für Nutzer        |

## Datenabspeicherung & Sicherheit

In unserem Projekt legen wir besonderen Wert auf die Sicherheit der Datenabspeicherung. Alle API-Endpunkte sind durch JWT (JSON Web Token) geschützt, was sicherstellt, dass nur autorisierte Benutzer auf die Daten zugreifen können.

Zur Sicherung sensibler Informationen verwenden wir AES (Advanced Encryption Standard) mit einem sicheren Secret Key, um Passwörter zu verschlüsseln. Dadurch wird sichergestellt, dass die Passwörter selbst in der Datenbank sicher gespeichert sind und nur autorisierte Anwendungen diese entschlüsseln können.

Das Master-Passwort der Benutzer wird gehasht und mit einem "Salt" versehen, bevor es gespeichert wird. Diese Massnahme erhöht die Sicherheit erheblich, indem sie den Zugriff auf das Master-Passwort selbst bei einem Datenbankangriff erschwert.

Diese Sicherheitsmassnahmen sind integraler Bestandteil unserer Datenabspeicherung, um die Vertraulichkeit und Integrität der Nutzerdaten zu gewährleisten und gleichzeitig die Anforderungen an moderne Sicherheitsstandards zu erfüllen.

## Seiten

| Link      | Nutzen                                                                                |
| --------- | ------------------------------------------------------------------------------------- |
| /         | Homepage                                                                              |
|           |                                                                                       |
| /pricing  | Infos zu den von uns gesetzten Preisen                                                |
|           |                                                                                       |
| /about    | About Seite zu der Firma und deren CEO's                                              |
|           |                                                                                       |
| /login    | User Login Seite                                                                      |
|           |                                                                                       |
| /register | User Registration Seite                                                               |
|           |                                                                                       |
| /logout   | User Logout Seite                                                                     |
|           |                                                                                       |
| /account  | Seite zu deinem Account, wo man den Vor- und Nachnamen sowie das Passwort ändern kann |
|           |                                                                                       |
| /vault    | Passwort Vault Seite                                                                  |

## Functional Programming

### Frontend

In diesem Abschnitt der Dokumentation werden die Prinzipien der funktionalen Programmierung erläutert, die in unserem Next.js-Komponenten umgesetzt wurden.

#### Unveränderliche Datenstrukturen

##### Definition

Unveränderliche Datenstrukturen ändern ihren Zustand nicht, nachdem sie erstellt wurden. Änderungen erzeugen immer eine neue Kopie der Datenstruktur.

##### Umsetzung im Code

Im Komponent verwenden wir `useState`, um den Zustand zu verwalten. Jede Änderung erzeugt eine neue Kopie des Zustands:

```javascript
const [categoriesData, setCategoriesData] = useState({});
const [newPassword, setNewPassword] = useState({
  name: "",
  username: "",
  password: "",
});
```

#### Pure Functions

##### Definition

Pure functions sind Funktionen, die nur von ihren Eingabeparametern abhängen und keine Nebeneffekte haben. Sie geben immer das gleiche Ergebnis zurück, wenn sie mit den gleichen Eingaben aufgerufen werden.

##### Umsetzung im Code

Beispiele für pure functions in unserem Code sind `setNewDPassword` und `setNewOCategory`:

```javascript
const setNewDPassword = (password) => {
  if (openEditPassword || openAddPassword) {
    setNewPassword(password);
    return;
  }

  var newDPassword = { name: "", username: "", password: "" };
  if (password.name !== "") {
    newDPassword.name = password.name;
  }
  if (password.username !== "") {
    newDPassword.username = decryptText(
      password.username,
      sha512_256(secretKey)
    );
  }
  if (password.password !== "") {
    newDPassword.password = decryptText(
      password.password,
      sha512_256(secretKey)
    );
  }
  setNewPassword(newDPassword);
};
```

```javascript
const setNewOCategory = (category) => {
  if (openEditCategory || openAddCategory) {
    setNewCategory(category);
    return;
  }

  var newOCateogry = "";
  if (category !== "") {
    newOCateogry = categoriesData[category].name;
  }
  setNewCategory(newOCateogry);
};
```

#### Lambda-Ausdrücke (Anonyme Funktionen)

##### Definition

Lambda-Ausdrücke sind anonyme Funktionen, die häufig als Argumente an andere Funktionen übergeben werden.

##### Umsetzung im Code

Anonyme Funktionen werden in `useEffect` und in Event-Handlern verwendet:

```javascript
useEffect(() => {
  const data = JSON.parse(sessionStorage.getItem("currentUserData"));
  if (data) {
    setCurrentUserData(data);
  }
}, []);
```

```javascript
<CategoryList>
  {Object.keys(categoriesData).map((key) => (
    <ListItemHover
      key={key}
      button
      selected={key === selectedCategory}
      onClick={() => handleCategoryClick(key)}
    >
      <ListItemText primary={categoriesData[key].name} />
    </ListItemHover>
  ))}
</CategoryList>
```

#### Higher-Order Functions

##### Definition

Higher-Order Functions sind Funktionen, die andere Funktionen als Argumente nehmen oder zurückgeben.

##### Umsetzung im Code

Ein Beispiel für Higher-Order Functions ist die Verwendung von `map` in der Komponente:

```javascript
<CategoryList>
  {Object.keys(categoriesData).map((key) => (
    <ListItemHover
      key={key}
      button
      selected={key === selectedCategory}
      onClick={() => handleCategoryClick(key)}
    >
      <ListItemText primary={categoriesData[key].name} />
    </ListItemHover>
  ))}
</CategoryList>
```

#### Zustand und Nebenwirkungen

##### Definition

In der funktionalen Programmierung sollen Funktionen keine Nebeneffekte haben. Der Zustand wird über Hooks wie `useState` und `useEffect` verwaltet.

##### Umsetzung im Code

Wir verwenden `useEffect` um Seiteneffekte zu handhaben und `useState` um Zustand zu verwalten:

```javascript
useEffect(() => {
  const data = JSON.parse(sessionStorage.getItem("currentUserData"));
  if (data) {
    setCurrentUserData(data);
  }
}, []);
```

```javascript
const [categoriesData, setCategoriesData] = useState({});
```

#### Funktionale Abstraktionen

##### Definition

Funktionale Abstraktionen sind wiederverwendbare, generische Funktionen, die auf eine Vielzahl von Anwendungsfällen angewendet werden können.

##### Umsetzung im Code

Unsere Funktion `setNewDPassword` und `setNewOCategory` sind Beispiele für funktionale Abstraktionen:

```javascript
const setNewDPassword = (password) => {
  var newDPassword = { name: "", username: "", password: "" };
  if (password.name !== "") {
    newDPassword.name = password.name;
  }
  if (password.username !== "") {
    newDPassword.username = decryptText(
      password.username,
      sha512_256(secretKey)
    );
  }
  if (password.password !== "") {
    newDPassword.password = decryptText(
      password.password,
      sha512_256(secretKey)
    );
  }
  setNewPassword(newDPassword);
};
```

#### Fazit

In unserer Next.js-Komponente haben wir verschiedene Prinzipien der funktionalen Programmierung implementiert. Diese umfassen die Nutzung unveränderlicher Datenstrukturen, pure functions, lambda-Ausdrücke, higher-order functions und die Verwaltung von Zustand und Nebenwirkungen durch React Hooks. Diese Ansätze tragen zu einem saubereren, wartbaren und weniger fehleranfälligen Code bei.

### Backend

#### Pure Functions

Im Backend-Entwicklungsumfeld ist es oft schwierig, reine funktionale Programmierung und damit pure functions vollständig umzusetzen. Das liegt daran, dass viele Backend-Operationen unvermeidliche Seiteneffekte haben, wie etwa Datenbanktransaktionen, Netzwerkanfragen und das Lesen/Schreiben von Dateien. Diese Operationen ändern den Zustand des Systems oder hängen von externen Ressourcen ab, was gegen das Prinzip der puren Funktionen verstösst.

#### Higher Order Functions

Wir haben in unserem Projekt in verschiedenen Fällen dieses Prinzip angewendet. Nämlich in einem der wichtigsten Aspekten; die Authorization.

```
/middleware/auth.js
```

```
export function withSession(handler) {
    return async function(request) {
        const session = await getSession()
        if(!session) {
            return Response.json({ "Unauthorized": "Not logged in"}, { status: 401 })
        }
        return handler(request, session)
    }
}
```

In diesem Beispiel geben wir eine Funktion als Parameter sowie als Rückgabe, damit wir ergänzte Authentifikation implementieren können:

```
export function withPermission(handler) {
    return async function(request, session) {
        const { searchParams } = new URL(request.url)
        const userId = parseInt(searchParams.get("id"))

        if(
            (session.user.id !== userId || !await accessResource(request, session)) &&
            session.user.role !== "Admin"
        ) {
            return Response.json({ "Unauthorized": "Not enough permission" }, { status: 403 })
        }
        return handler(request, session)
    }
}
```

Dies ergänzt die vorherige Funktion um erneut zu überprüfen, ob der Nutzer die korrekte Rolle besitzt. In der Praxis sieht es wie folgend aus:

```
export const GET = withSession(withPermission(async (request, session) => {...}))
```

#### Mutability

```
export const DELETE = withSession(withPermission(async (request, session) => {
  try {
    const { searchParams } = new URL(request.url)
    const passwordId = parseInt(searchParams.get("passwordId"))

    const deletedPassword = deletePassword(passwordId)
    return Response.json({ "deleted password": deletedPassword }, { status: 200 })
  } catch (e) {
    return Response.json({ "error": e.message }, { status: 404 })
  } finally {
    await prisma.$disconnect()
  }
}))
```

Die Funktion `deletePassword(passwordId)` führt eine Datenbankoperation durch, die einen Eintrag löscht. Das ist ein klarer Fall von mutable state, da es den Zustand der Datenbank verändert. Die Funktion selbst verändert keine ihrer Eingaben direkt, aber sie interagiert mit einer Datenbank, die mutable state hat.

#### Fazit
Im Backend haben wir verschiedene Prinzipien der funktionalen Programmierung implementiert. Diese umfassen die Nutzung unveränderlicher Datenstrukturen, Higher-Order Functions und die Verwaltung von Zustand und Seiteneffekten durch gut definierte Bereiche. Die Anwendung von puren Funktionen war jedoch aufgrund der unvermeidbaren Seiteneffekte, die durch Datenbanktransaktionen und andere externe Abhängigkeiten verursacht werden, eingeschränkt. Trotz dieser Einschränkungen tragen unsere funktionalen Ansätze zu einem saubereren, wartbaren und weniger fehleranfälligen Code bei.

## Reflexion

### Taha

Das Password-Safe-Projekt war sehr lehrreich. Beim Frontend und Backend mit Next.js haben wir viel dazugelernt, besonders was Sicherheit und modernes Design angeht. Es war spannend, die Funktionen für das Anmelden und die Passwortverwaltung zu implementieren, und wir haben viel über die besten Praktiken in der Softwareentwicklung erfahren.

Gegen Ende des Projekts hatten wir allerdings einige technische Schwierigkeiten, wie Probleme mit Paketversionen und Fehler bei den Prisma-Migrationen. Diese Probleme haben uns ziemlich gefordert, aber wir haben sie dank guter Teamarbeit und ein wenig Geduld rechtzeitig gelöst.

Ich bin sehr zufrieden mit dem, was wir erreicht haben. Unsere Anwendung funktioniert gut und erfüllt alle Anforderungen, die wir an sie gestellt haben. In den kommenden Wochen wollen wir noch weiter daran arbeiten, um sie zu verbessern und die Benutzerfreundlichkeit zu erhöhen. Diese Erfahrung hat uns nicht nur technisch weitergebracht, sondern auch unser Verständnis für die Bedeutung von Sicherheit in der Softwareentwicklung vertieft. Wir haben viel darüber gelernt, wie wichtig es ist, bei der Entwicklung stets auf Sicherheit zu achten und ständig nach Verbesserungsmöglichkeiten zu suchen.

### Christopher

Das Password-Safe-Projekt war eine äusserst wertvolle Erfahrung für uns. Während wir sowohl das Frontend als auch das Backend mit Next.js entwickelten, haben wir umfassende Kenntnisse in Bezug auf Sicherheitsaspekte und modernes Design erlangt. Insbesondere die Implementierung der Anmeldefunktionen und der Passwortverwaltung stellte uns vor interessante Herausforderungen.

Gegen Ende des Projekts traten jedoch einige technische Schwierigkeiten auf, die unsere Fähigkeiten auf die Probe stellten. Wir kämpften mit Problemen bei den Paketversionen von npm und hatten Schwierigkeiten mit Prisma-Migrationen. Diese Hindernisse waren anspruchsvoll, aber durch eine gute Zusammenarbeit im Team und die nötige Geduld konnten wir sie rechtzeitig überwinden.

Dennoch bin ich äusserst zufrieden mit dem Erreichten. Unsere Anwendung läuft stabil und erfüllt sämtliche Anforderungen, die wir gestellt haben. In den kommenden Wochen möchten wir weiterhin an der Verbesserung der Benutzerfreundlichkeit arbeiten und die Performance optimieren. Diese Erfahrung hat nicht nur unsere technischen Fähigkeiten erweitert, sondern auch unser Bewusstsein für die Wichtigkeit von Sicherheitsaspekten in der Softwareentwicklung vertieft. Wir haben gelernt, wie entscheidend es ist, Sicherheitspraktiken kontinuierlich zu verbessern und stets auf dem neuesten Stand zu bleiben.

Nächstes mal sollten wir wirklich früher den Endspurt starten, damit solche Fehler nicht kurz vor der Abgabe auftreten.
