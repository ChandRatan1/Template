# Blog backend (talks to the existing WordPress database)

Plain PHP, no framework — reads/writes the same `u603699887_powerq` MySQL
database your old WordPress install used (table prefix `LdN_`). Nothing here
touches WordPress's own PHP/plugins; it only reads and writes rows in the
`wp_posts` / `wp_postmeta` tables the same way WordPress did.

## Setup (local or Hostinger — same steps)

1. Copy `config.sample.php` to `config.php` (this file is gitignored — never
   commit real credentials).
2. Fill in `DB_HOST`, `DB_USER`, `DB_PASSWORD` in `config.php`.
   - On Hostinger: hPanel → Databases → MySQL Databases (host is almost
     always `localhost`; you'll need to set/know the password there).
   - Locally: whatever your local MySQL root/user credentials are.
3. Set `ADMIN_PASSWORD` in `config.php` to something only you know — this
   gates the "publish a post" endpoint.
4. Import `127_0_0_1.sql` into that database if it isn't already loaded
   (skip this step on Hostinger — the dump says the database is already
   live there).

## Deploying to Hostinger

Upload this whole `api-backend` folder into `public_html/api-backend/`,
alongside the built React app (`dist/`'s contents go directly in
`public_html/`). No other server setup needed — Hostinger runs PHP natively.

The React app calls this backend at `/api-backend/*.php` by default. If you
ever host the backend somewhere else, set `VITE_BLOG_API_URL` when building
the React app (e.g. in a `.env` file) to point at it instead.

## Endpoints

- `GET  posts.php` — published posts, newest first (for the /blog listing).
- `GET  post.php?slug=your-post-slug` — one post's full content.
- `POST create_post.php` — publish a new post. Body:
  `{ admin_password, title, content, excerpt?, image? }`.
  `content` is plain text — separate paragraphs with a blank line.

## Publishing a post

Visit `/api-backend/admin.php` on the deployed site, enter the admin
password from `config.php`, fill in the post, submit. It writes straight
into `wp_posts` and shows up on `/blog` immediately — no redeploy.

## How the React app decides what to show

`src/utils/blogApi.js` calls this backend. If it's unreachable (e.g. local
`npm run dev` with no PHP server running, or `config.php` not set up yet),
the blog pages fall back to the static list in `src/data/blog.js` (empty by
default) instead of breaking.
