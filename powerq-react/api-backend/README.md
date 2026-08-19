# Backend (blog, quote requests, robots.txt)

Plain PHP, no framework, no WordPress dependency — its own dedicated MySQL
database with two tables (`posts`, `quote_requests`), created by `schema.sql`.

## Setup (local or Hostinger — same steps)

1. Copy `config.sample.php` to `config.php` (this file is gitignored — never
   commit real credentials).
2. Fill in `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` in `config.php` —
   a database dedicated to this app (not shared with anything else).
   - On Hostinger: hPanel → Databases → MySQL Databases.
   - Locally: whatever your local MySQL credentials are.
3. Set `ADMIN_PASSWORD` in `config.php` to something only you know — this
   gates every action in `admin.php` (publishing posts, viewing quote
   requests, editing robots.txt).
4. Set `QUOTE_EMAIL_TO` / `QUOTE_EMAIL_CC` to where quote-form submissions
   should be emailed.
5. Run `schema.sql` against the database (via phpMyAdmin's Import, or the
   `mysql` CLI) to create the `posts` and `quote_requests` tables. Safe to
   re-run — it only creates tables that don't already exist.
6. If migrating from the old WordPress site, also run `migrate_posts.sql`
   once, after `schema.sql`, to carry over the previously published posts.

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
- `POST quote.php` — public endpoint the "Request a Quote" form submits to.
  Body: `{ name, email, phone, service, message, source_page, website }`
  (`website` is a honeypot field — leave empty; a filled-in value is treated
  as a bot). Stores the submission and emails it to `QUOTE_EMAIL_TO`.
- `POST quote_requests.php` — admin-only. Body: `{ admin_password }`. Returns
  every stored quote submission, newest first.
- `POST manage_robots.php` — admin-only. Body: `{ admin_password, content }`.
  Overwrites the live `robots.txt` at the site root.
- `GET  sitemap.xml` (rewritten to `sitemap.php` by the site root's
  `.htaccess`) — auto-generated list of every static page, service page, and
  published blog post.

## Using admin.php

Visit `/api-backend/admin.php` on the deployed site, enter the admin
password from `config.php`, and you'll see three sections: publish a blog
post, view submitted quote requests, and edit `robots.txt` — all gated by
the same password field at the top of the page.

## How the React app decides what to show

`src/utils/blogApi.js` calls `posts.php`/`post.php`. If the backend is
unreachable (e.g. local `npm run dev` with no PHP server running, or
`config.php` not set up yet), the blog pages fall back to the static list in
`src/data/blog.js` (empty by default) instead of breaking.

`src/utils/quoteApi.js` calls `quote.php` when the "Request a Quote" form is
submitted; on failure it shows an error in the form instead of silently
losing the submission.
