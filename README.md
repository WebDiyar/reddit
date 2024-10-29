
# Reddit 

Built with the Next.js App Router, TypeScript, Prisma + Postgresql, Shadcn Ui & Tailwind css


## Features
 - Infinite scrolling for dynamically loading posts
 - Authentication using NextAuth & Google
 - Custom feed for authenticated users
 - Advanced caching using [Upstash Redis](https://upstash.com/?utm_source=Josh2)
 - Optimistic updates for a great user experience
 - Modern data fetching using React-Query
 - A beautiful and highly functional post editor
 - Image uploads & link previews
 - Full comment functionality with nested replies
 - ... and much more


## Getting started

To get started with this project, run

```bash
  git clone https://github.com/WebDiyar/reddit.git
  cd reddit
  npm install
```

and copy these .env.example variables into a separate .env file:

```bash

POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=

NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

REDIS_URL=
REDIS_SECRET=
```


and that's all you need to get started!

```bash
    npm run build

    Run these commands on package.json to migrate database:
    "postinstall": "prisma generate",
    "prisma:push": "prisma db push",
    "prisma:studio": "prisma studio",
    "prisma:seed": "prisma db seed"


    After that: `npm run dev`
```
## Acknowledgements

- [Upstash Redis](https://upstash.com/?utm_source=Josh2) for making this possible
- [Code with Antonio](https://www.youtube.com/@codewithantonio) for thumbnail design inspiration
- Shadcn's [Taxonomy respository](https://github.com/shadcn/taxonomy) for showcasing the post editor
