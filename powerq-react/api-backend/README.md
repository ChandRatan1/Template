# Backend (blog, services, locations, quote requests, SEO)

Plain PHP, no framework, no WordPress dependency — its own dedicated MySQL
database with five tables (`posts`, `services`, `locations`, `quote_requests`,
`page_meta`), created by `schema.sql`.

## Setup (local or Hostinger — same steps)

1. Copy `config.sample.php` to `config.php` (this file is gitignored — never
   commit real credentials).
2. Fill in `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` in `config.php` —
   a database dedicated to this app (not shared with anything else).
   - On Hostinger: hPanel → Databases → MySQL Databases.
   - Locally: whatever your local MySQL credentials are.
3. Set `ADMIN_PASSWORD` in `config.php` to something only you know — this
   gates every admin action in `admin.php` (publishing posts, editing
   services/locations/page SEO, viewing quote requests, editing robots.txt).
4. Set `QUOTE_EMAIL_TO` / `QUOTE_EMAIL_CC` to where quote-form submissions
   should be emailed.
5. Run `schema.sql` against the database (via phpMyAdmin's Import, or the
   `mysql` CLI) to create the tables. Safe to re-run — it only creates
   tables that don't already exist.
6. Run `migrate_content.sql` once, after `schema.sql`, to seed the database
   with the 8 blog posts, 7 services, and 33 suburb locations that were
   previously hardcoded — the site looks identical after this, just backed
   by the database instead of static files from here on.

## Deploying to Hostinger

Upload this whole `api-backend` folder into `public_html/api-backend/`,
alongside the built React app (`dist/`'s contents go directly in
`public_html/`). No other server setup needed — Hostinger runs PHP natively.
`schema.sql`/`migrate_content.sql` don't need to be uploaded (one-time setup
scripts only), and `.htaccess` blocks direct web access to any `.sql` file
as a safety net if they are.

The React app calls this backend at `/api-backend/*.php` by default. If you
ever host the backend somewhere else, set `VITE_BLOG_API_URL` when building
the React app (e.g. in a `.env` file) to point at it instead.

## Endpoints

- `GET  posts.php` / `GET post.php?slug=...` — published blog posts.
- `POST create_post.php` / `update_post.php` / `delete_post.php` — admin-only
  blog post management. `content` is plain text on create (separate
  paragraphs with a blank line); on edit it's the raw HTML as-is.
- `GET  services.php` / `GET locations.php` — the live service/location
  catalog the React app renders pages from and builds nav/footer from.
- `POST create_service.php` / `update_service.php` / `delete_service.php` —
  admin-only. `contentJson` must be valid JSON shaped like
  `{"sections": [...], "blocks": [...]}` (see `src/components/ServiceSection`
  for what fields each section supports).
- `POST create_location.php` / `update_location.php` / `delete_location.php`
  — admin-only suburb-page management.
- `GET  page_meta.php` / `POST update_page_meta.php` — per-path SEO
  title/description overrides. Admin-only to write; the site reads these to
  override a page's default meta tags when a row exists for its path.
- `POST quote.php` — public endpoint the "Request a Quote" form submits to.
  Body: `{ name, email, phone, service, message, source_page, website }`
  (`website` is a honeypot field — leave empty; a filled-in value is treated
  as a bot). Stores the submission and emails it to `QUOTE_EMAIL_TO`.
- `POST quote_requests.php` — admin-only. Body: `{ admin_password }`. Returns
  every stored quote submission, newest first.
- `POST manage_robots.php` — admin-only. Body: `{ admin_password, content }`.
  Overwrites the live `robots.txt` at the site root.
- `GET  sitemap.xml` (rewritten to `sitemap.php` by the site root's
  `.htaccess`) — auto-generated from the database: every static page, every
  service, every suburb location, and every published blog post.

All admin-only endpoints use the same pattern: POST with an `admin_password`
field in the JSON body, checked with `hash_equals` against `config.php`.

## Using admin.php

Visit `/api-backend/admin.php` on the deployed site and enter the admin
password — everything else stays hidden until it's verified. Tabs: **Blogs**
(add/edit/delete/view posts), **Request Quotes** (view submissions, with
Call/WhatsApp actions), **robots.txt** (view/edit the live file).

## How the React app decides what to show

`CatalogContext` (`src/context/CatalogContext.jsx`) fetches `services.php`
and `locations.php` once when the app loads, and is what `ServicePage`,
`LocationPage`, `SlugPage`, `Header`, `Footer`, and `QuoteForm` all read from
— so an edit or a new entry made via `admin.php` shows up on the live site
immediately, no redeploy needed. If the backend is unreachable (e.g. local
`npm run dev` with no PHP server running, or `config.php` not set up yet),
it falls back to the bundled static data in `src/data/services.js` /
`src/data/locations.js` instead of breaking.

`src/utils/blogApi.js` calls `posts.php`/`post.php` the same way, falling
back to the (empty by default) static list in `src/data/blog.js`.

`src/utils/quoteApi.js` calls `quote.php` when the "Request a Quote" form is
submitted; on failure it shows an error in the form instead of silently
losing the submission.
