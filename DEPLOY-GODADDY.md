# Running this site on GoDaddy

The whole site is code plus one server secret. There is no database and no
uploaded files, so there is no data to migrate.

The site needs a host that runs a Node.js server — the chat assistant and the
page rendering both run server-side. GoDaddy's Node.js Hosting does this; plain
shared/PHP hosting does not.

## What was checked here

- `npm run build:node` produces a standalone server at `.output/server/index.mjs`.
- Running `node .output/server/index.mjs` serves the site (200) with the correct
  phone number, email and hours in the page.
- `POST /api/chat` streams a real answer from the assistant ("Monday through
  Friday from 10:00 am to 5:00 pm Pacific Time").

So the app runs fine outside Lovable. The only thing to reproduce on GoDaddy is
the secret below.

## Download options

- **trinity-tax-godaddy-source.zip**: source upload for a service that installs
  dependencies and builds the app. Its deployment-only `package.json` has a
  version and makes `npm run build` target Node. The Lovable project's normal
  build command has not changed.
- **trinity-tax-standalone-server.zip**: the already-built server, including the
  hidden `.output` folder. Extract it and run `npm start` with Node 22. It does
  not need a dependency install or a build. Use this only if the hosting service
  accepts a prebuilt Node app, or on a VPS. Do not upload it as a static website.

Neither download contains a private key or `.env`. The prebuilt server already
contains the public browser map configuration; the source upload needs the map
variables before building.

## Account walkthrough

1. Sign in at **godaddy.com** and open **My Products**.
2. Find the hosting product for this site and choose **Manage**. A domain alone
   is not hosting. Look for a Node.js app deployment option. If you only see
   cPanel, Website Builder or WordPress, do not upload these files there.
3. Share a screenshot of the hosting dashboard, hiding account numbers,
   billing details and secrets, so the next clicks can be matched to your
   actual plan. The exact deployment controls have not been tested in your
   GoDaddy account.
4. If the dashboard offers a Node.js app from a ZIP, use the **source ZIP**.
   Select Node 22 if offered. The expected commands are `npm install`,
   `npm run build`, and `npm start`. Do not choose a static output directory.
5. Before starting the deployment, set the environment variables below in the
   hosting dashboard's private environment-variable settings. Never put the
   chat key into a file upload or screenshot. If the settings distinguish
   build variables from runtime variables, use the timing in the table.
6. Deploy and open the temporary app URL. Check the page, logo, phone, email,
   hours, map and a real chat answer. Confirm refreshing the page works.
7. Add the intended domain using GoDaddy's app-domain instructions. Preserve
   existing email/MX records. Authorize that domain for the map key, enable
   HTTPS, and repeat the checks before retiring the Lovable site.

## Running the prebuilt server locally or on a VPS

Extract the standalone ZIP (including `.output`) into an empty folder. With
Node 22 installed and the chat key set privately in the environment, run:

```sh
npm start
```

It listens on port 3000 by default; the hosting service can supply `PORT` and
`HOST`. For a VPS, HTTPS and a process supervisor must be configured separately.

## Environment variables

| Variable | Needed for | When it matters |
| --- | --- | --- |
| `LOVABLE_API_KEY` | The AI chat assistant | At run time. Without it `/api/chat` returns an error and the chat box fails. |
| `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` | The map on the contact page | Source uploads only: supply the public browser key before building. It is already baked into the prebuilt download. |
| `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID` | Map usage tracking | Source uploads only: supply before building. Already baked into the prebuilt download. |

## Watch out for

- **The map key is restricted to specific web addresses.** Your new domain has to
  be added to the key's allowed list, or the map stops drawing.
- **`/api/chat` is public.** Anyone who finds the site can use it, and it spends
  from the AI credit balance tied to the key. Keep a limit on that balance.
- **`LOVABLE_API_KEY` is a Lovable key.** If you stop using Lovable entirely,
  the assistant needs a different model provider wired into `src/routes/api/chat.ts`.
- Keep Lovable's published version live until the GoDaddy one is confirmed
  working, then move the domain across.
