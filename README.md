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
  1) git clone https://github.com/WebDiyar/reddit.git
```

```bash
  2) cd reddit
```

```bash
  3) npm install
```

```bash
  4) copy these .env.example variables into a separate .env file:

  DATABASE_URL=
  NEXTAUTH_SECRET=
  
  GOOGLE_CLIENT_ID=
  GOOGLE_CLIENT_SECRET=
  
  UPLOADTHING_SECRET=
  UPLOADTHING_APP_ID=
  
  REDIS_URL=
  REDIS_SECRET=
```


```
5) npm run build
```

```
6) npx prisma db push
7) npm run dev
```


## Acknowledgements

- [Upstash Redis](https://upstash.com/?utm_source=Josh2) for making this possible
- [Code with Antonio](https://www.youtube.com/@codewithantonio) for thumbnail design inspiration
- Shadcn's [Taxonomy respository](https://github.com/shadcn/taxonomy) for showcasing the post editor
