# Vincent Sebastian — Developer Portfolio

A responsive portfolio for a full-stack developer, built with React, TypeScript, and Vite. It presents an introduction, skills, selected projects, project detail pages, and contact links without a backend or a nonfunctional contact form.

## Features

- Responsive home, about, skills, projects, and contact sections
- Dedicated project routes at `/projects/<project-slug>`
- Keyboard-accessible navigation and full-card project links
- Reduced-motion support and graceful portrait fallback
- Existing project screenshots with lazy loading
- Open Graph and Twitter social preview metadata
- Direct refresh support through the Vite SPA build

## Technology

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- Lucide React
- Vitest, Testing Library, and Oxlint

## Requirements

- Node.js supported by the installed Vite version (Node.js 20.19+ or 22.12+)
- npm

## Run locally

```sh
npm install
npm run dev
```

The development server prints the local URL. Use `Ctrl+C` to stop it.

## Verification commands

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

`npm run build` runs the TypeScript project build before producing static files in `dist/`.

## Project structure

```text
public/
  images/
    projects/       Project thumbnails, logos, and screens
    profile.png     Hero portrait and social preview image
  projects/
    chat-app/       Converse screenshots used by the portfolio
    construction-company/  Legacy screenshots retained but not currently referenced
    inventory-point-of-sale-&-order-management-system/  Legacy screenshots retained but not currently referenced
src/
  components/
    animations/     Portrait and optional technology ticker
    layout/         Site header and footer
    pages/          Unknown-route page
    projects/       Project cards, list, detail pages, and galleries
    sections/       Home, about, skills, and contact sections
  data/             Portfolio, project, skill, and screenshot content
  test/             Application tests
  types/            Shared TypeScript types
```

## Personalize before publishing

Edit [`src/data/portfolio.ts`](./src/data/portfolio.ts):

- `name`, `role`, `introduction`, `about`, and `availability`
- `githubUrl` and `linkedinUrl` (currently preserved from the existing site)
- `email` and `resumeUrl` (currently blank; add only verified destinations)
- `siteUrl` (currently blank; set your final canonical production origin)

The portrait is `public/images/profile.png`. Replace it with an approved local portrait, keeping the same path or updating `ParticlePortrait`. The site shows a graceful fallback if the image is unavailable.

Project content, technology stacks, and optional `demoUrl`/`sourceUrl` fields are in `src/data/projects.ts`. Add only real links. Screenshot lists are in `src/data/converseScreens.ts`, `src/data/retailFlowScreens.ts`, and `src/data/sabBuildersScreens.ts`.

The social preview currently uses the local portrait image in `index.html`. Replace the Open Graph and Twitter image paths with an approved preview image when available. No email, résumé file, demo URLs, or source-code URLs have been invented. Project descriptions reflect information supplied for this portfolio and have not been independently checked against the source repositories of the applications.

## GitHub setup and push

The local Git repository has been initialized with no remote, staged files, or commits. Review the files and `git status` before staging. To publish it when you are ready:

1. Create an empty repository on GitHub (do not add an initial README if you plan to push this README).
2. From the project folder, initialize Git only if needed and review the ignore rules:

   ```sh
   git init
   git status --short
   git check-ignore -v .env node_modules dist
   ```

3. Review the staged file list before committing. Do not stage `.env` or private credentials:

   ```sh
   git add .
   git status --short
   git diff --cached --stat
   git diff --cached
   ```

4. Commit and add the GitHub remote only after confirming the staged content:

   ```sh
   git commit -m "Prepare developer portfolio"
   git remote add origin https://github.com/<your-account>/<your-repository>.git
   git push -u origin main
   ```

Replace the example account/repository path with the actual GitHub repository. If the branch is not named `main`, use the branch shown by `git branch --show-current`.

## Future Vercel deployment

No deployment has been performed. When ready:

1. Push the reviewed portfolio repository to GitHub.
2. In Vercel, import the GitHub repository and select the Vite framework preset.
3. Use `npm run build` as the build command and `dist` as the output directory. No environment variables are currently required.
4. Deploy, then test the home page and direct refreshes on `/projects` and each `/projects/<slug>` route.
5. Add a custom domain if desired, set `siteUrl` in `src/data/portfolio.ts` to the final HTTPS origin, and redeploy so project canonical URLs can be generated.
6. Confirm the social preview image, contact details, and project links before sharing the site.

The portfolio is static and does not require serverless functions, a database, or custom Vercel routing configuration unless route-refresh testing on the deployed site shows otherwise.
