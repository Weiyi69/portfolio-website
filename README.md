# Vincent Sebastian — Developer Portfolio

A responsive developer portfolio featuring selected projects, project details, skills, and contact links.

## Live preview

- Website: [vincentsebastian.vercel.app](https://vincentsebastian.vercel.app)
- Screenshot: `TODO_ADD_SCREENSHOT_PATH`

## Tech stack

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- Lucide React
- Vitest, Testing Library, Oxlint, and Oxfmt

## Run locally

Use Node.js 22 (or Node.js 20.19 or newer) and npm:

```sh
npm ci
npm run dev
```

Vite prints the local development URL. Press `Ctrl+C` to stop the server.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Typecheck and build the production site |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |
| `npm run format` | Format supported project files with Oxfmt |
| `npm run typecheck` | Run the TypeScript project checks |
| `npm test` | Run the test suite |
| `npm run test:watch` | Run tests in watch mode |

## Personalize

- Update the profile and contact details in [`src/data/portfolio.ts`](./src/data/portfolio.ts). Keep `siteUrl` in sync with the production origin.
- Replace `TODO_ADD_SCREENSHOT_PATH` above with a checked-in screenshot path.
- Add project links only when verified. Project image lists are maintained in `src/data/*Screens.ts`.

The production build generates crawler-readable metadata for each project route, plus `robots.txt` and `sitemap.xml`, from the portfolio and project data.
