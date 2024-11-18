# Nisses Idle

This is an idle Game about Clocking in at your HomeOffice.

> [!IMPORTANT]
> This Game is unbalanced and not ready. Please contribute to balancing, functionality and UI/UX!

## Current Ideas

- Community-Feature Boosts
  - NStagram
    - Boosts time by a small fraction by posts created
    - Shows posts by other community members
  - NTube
    - Boosts time by videos watched
    - Add troll videos like RickRoll, 10 hour videos, ...
- Prestige
  - Allows to prestige by resetting money, upgrades and time on Shift
  - Multiplies all other Multipliers
  - Theme is "Start a new Job"
- Achievements

## Getting Started

Install NodeJS >=v20 and pnpm (`npm i -g pnpm`)

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

Open a PR, after it was merged to main, it will be deployed automatically to [nisses.enking.dev](nisses.enking.dev)

## Migrating Zustand Storage

> [!WARNING]
> Keep in mind to create Zustand Storage Migrations when changing a store!

See more information at [Persisting Store Data / Migrate](https://zustand.docs.pmnd.rs/integrations/persisting-store-data#migrate)

## Important Documentation

- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Mathjs](https://mathjs.org/)
- [Nextjs](https://nextjs.org/docs)