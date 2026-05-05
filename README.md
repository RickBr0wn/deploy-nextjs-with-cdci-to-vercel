# Deploy Next.js with CI/CD to Vercel

A reference implementation for deploying a Next.js application to Vercel using GitHub Actions, with separate pipelines for preview and production environments.

## What this demonstrates

Vercel's native GitHub integration auto-deploys on every push, but that bypasses your CI pipeline (linting, tests, type checks). This repo shows how to **own the deployment** by disabling the native integration and driving everything through GitHub Actions using the Vercel CLI.

### The pattern

| Branch | Trigger | Environment |
|---|---|---|
| Any non-`main` branch | `push` | Preview |
| `main` | `push` | Production |

Each workflow:
1. Runs CI (`pnpm ci` — lint, tests, etc.)
2. Pulls environment variables from Vercel (`vercel pull`)
3. Builds using Vercel's build system (`vercel build`)
4. Deploys the pre-built output (`vercel deploy --prebuilt`)

Building with `vercel build` ensures the output matches exactly what Vercel would produce natively, while GitHub Actions controls when and whether the deploy happens.

## Setup

### 1. Link the project to Vercel

```bash
pnpm add -g vercel
vercel link
```

This creates `.vercel/project.json` containing your `orgId` and `projectId`.

### 2. Disable Vercel's automatic GitHub integration

In `vercel.json`:

```json
{
  "version": 2,
  "github": {
    "enabled": false
  }
}
```

This prevents Vercel from auto-deploying on push, GitHub Actions takes over.

### 3. Add GitHub secrets

Go to **GitHub → repo → Settings → Secrets and variables → Actions** and add:

| Secret | Where to find it |
|---|---|
| `VERCEL_SECRET` | Vercel dashboard → Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` → `orgId` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` → `projectId` |

### 4. Push a branch

Push any non-`main` branch to trigger a preview deploy. Merge to `main` to trigger production.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript 5](https://typescriptlang.org)
- [Vercel CLI](https://vercel.com/docs/cli)
- [GitHub Actions](https://docs.github.com/en/actions)
