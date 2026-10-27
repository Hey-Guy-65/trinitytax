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

## Steps

1. Get the code off Lovable: download the codebase from **Project settings →
   Git**, or connect the project to GitHub and clone it.
2. On your own machine (the Lovable editor always builds for Lovable's own
   hosting, never for Node):

   ```sh
   npm install
   npm run build:node     # writes .output/
   npm start              # http://localhost:3000 — check it there first
   ```

3. Upload to GoDaddy Node.js Hosting, either as a zip of the source folder
   (without `node_modules` and `.output`) or by connecting the repository.
   GoDaddy runs `npm run build` and `npm start` itself, so both scripts are in
   `package.json`, along with `"engines": { "node": "22.x" }`.
4. Set the environment variables GoDaddy asks for — see the table below.
5. Point your domain at the new app, and check the live page, a refresh on a
   nested page, and the chat box before you stop the Lovable version.

## Environment variables

| Variable | Needed for | When it matters |
| --- | --- | --- |
| `LOVABLE_API_KEY` | The AI chat assistant | At run time. Without it `/api/chat` returns an error and the chat box fails. |
| `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` | The map on the contact page | Baked in at build time, so it must be set when you run `build:node`. It is in `.env`. |
| `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID` | Map usage tracking | Same as above. |

## Watch out for

- **The map key is restricted to specific web addresses.** Your new domain has to
  be added to the key's allowed list, or the map stops drawing.
- **`/api/chat` is public.** Anyone who finds the site can use it, and it spends
  from the AI credit balance tied to the key. Keep a limit on that balance.
- **`LOVABLE_API_KEY` is a Lovable key.** If you stop using Lovable entirely,
  the assistant needs a different model provider wired into `src/routes/api/chat.ts`.
- Keep Lovable's published version live until the GoDaddy one is confirmed
  working, then move the domain across.
