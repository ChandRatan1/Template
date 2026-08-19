<?php
require __DIR__ . '/db.php';
$cfg = bg_config();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>PowerQ Admin</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 960px; margin: 40px auto; padding: 0 20px; color: #222; }
  h1 { font-size: 22px; }
  h2 { font-size: 18px; margin-top: 0; }
  label { display: block; font-weight: 600; margin: 16px 0 6px; }
  input, textarea { width: 100%; padding: 10px; font-size: 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; font-family: inherit; }
  textarea { min-height: 220px; }
  #robots_content { min-height: 300px; font-family: monospace; }
  button { padding: 10px 20px; font-size: 14px; font-weight: 600; background: #0d861d; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
  button:disabled { opacity: 0.6; cursor: default; }
  button.secondary { background: #555; }
  button.danger { background: #b3261e; }
  button.small { padding: 6px 12px; font-size: 13px; margin: 0 4px 4px 0; }
  .msg { margin-top: 16px; padding: 12px; border-radius: 4px; display: none; }
  .msg.ok { display: block; background: #d1e7dd; color: #0f5132; }
  .msg.err { display: block; background: #f8d7da; color: #842029; }
  .hint { font-size: 13px; color: #666; margin-top: 4px; }
  table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
  th, td { text-align: left; padding: 8px; border-bottom: 1px solid #eee; vertical-align: top; }
  th { background: #f7f7f7; }
  .tabs { display: flex; gap: 8px; border-bottom: 2px solid #ddd; margin-top: 24px; }
  .tab-btn { background: none; color: #555; border: none; border-bottom: 3px solid transparent; border-radius: 0; padding: 10px 16px; font-weight: 600; }
  .tab-btn.active { color: #0d861d; border-bottom-color: #0d861d; }
  .tab-panel { display: none; padding-top: 20px; }
  .tab-panel.active { display: block; }
  .thumb { width: 48px; height: 48px; object-fit: cover; border-radius: 4px; background: #eee; }
  a.action-link { text-decoration: none; }
</style>
</head>
<body>
  <h1>PowerQ Admin</h1>

  <div id="unlock-section">
    <label for="admin_password">Admin password</label>
    <input id="admin_password" type="password" required />
    <button type="button" id="unlock-btn">Unlock</button>
    <div id="unlock-msg" class="msg"></div>
  </div>

  <div id="protected-sections" style="display: none;">
    <div class="tabs">
      <button type="button" class="tab-btn" data-tab="blogs">Blogs</button>
      <button type="button" class="tab-btn" data-tab="services">Services</button>
      <button type="button" class="tab-btn" data-tab="locations">Locations</button>
      <button type="button" class="tab-btn" data-tab="quotes">Request Quotes</button>
      <button type="button" class="tab-btn" data-tab="seo">Page SEO</button>
      <button type="button" class="tab-btn" data-tab="robots">robots.txt</button>
    </div>

    <!-- Blogs tab -->
    <div id="tab-blogs" class="tab-panel">
      <div id="blog-list-view">
        <button type="button" id="add-blog-btn">+ Add Blog</button>
        <div id="blogs-msg" class="msg"></div>
        <div id="blogs-table"></div>
      </div>

      <div id="blog-form-view" style="display: none;">
        <h2 id="blog-form-title">Add Blog</h2>
        <form id="post-form">
          <input type="hidden" id="post-id" value="" />

          <label for="title">Title</label>
          <input id="title" type="text" required />

          <label for="excerpt">Excerpt (optional — shown on the blog listing card)</label>
          <input id="excerpt" type="text" />

          <label for="image">Image URL (optional)</label>
          <input id="image" type="text" placeholder="https://..." />

          <label for="content" id="content-label">Content</label>
          <p class="hint" id="content-hint">Separate paragraphs with a blank line.</p>
          <textarea id="content" required></textarea>

          <div style="margin-top: 16px;">
            <button type="submit" id="post-submit-btn">Save</button>
            <button type="button" class="secondary" id="post-cancel-btn">Cancel</button>
          </div>
          <div id="post-msg" class="msg"></div>
        </form>
      </div>
    </div>

    <!-- Services tab -->
    <div id="tab-services" class="tab-panel">
      <div id="service-list-view">
        <button type="button" id="add-service-btn">+ Add Service</button>
        <p class="hint">A new service automatically appears in the nav menu, footer, and quote-form dropdown.</p>
        <div id="services-msg" class="msg"></div>
        <div id="services-table"></div>
      </div>

      <div id="service-form-view" style="display: none;">
        <h2 id="service-form-title">Add Service</h2>
        <form id="service-form">
          <input type="hidden" id="service-id" value="" />

          <label for="service-slug">URL slug (e.g. "my-new-service"; only letters, numbers, hyphens)</label>
          <input id="service-slug" type="text" pattern="[a-z0-9-]+" />

          <label for="service-navTitle">Nav title (shown in menu, footer, quote form)</label>
          <input id="service-navTitle" type="text" required />

          <label for="service-cardTitle">Card title</label>
          <input id="service-cardTitle" type="text" />

          <label for="service-cardText">Card text / meta description (short, 1-2 sentences)</label>
          <input id="service-cardText" type="text" />

          <label for="service-pageTitle">Page title (shown as the page heading)</label>
          <input id="service-pageTitle" type="text" required />

          <label for="service-seoTitle">SEO title (browser tab / search result title)</label>
          <input id="service-seoTitle" type="text" />

          <label for="service-heroImage">Hero image URL</label>
          <input id="service-heroImage" type="text" placeholder="/content-img/..." />

          <label for="service-contentJson">Content (JSON)</label>
          <p class="hint">Must be valid JSON shaped like <code>{"sections": [{"heading": "...", "paragraphs": ["..."], "image": "/content-img/...", "imageSide": "left"}]}</code>. Edit carefully — this drives the page's layout.</p>
          <textarea id="service-contentJson" required style="font-family: monospace;"></textarea>

          <div style="margin-top: 16px;">
            <button type="submit" id="service-submit-btn">Save</button>
            <button type="button" class="secondary" id="service-cancel-btn">Cancel</button>
          </div>
          <div id="service-form-msg" class="msg"></div>
        </form>
      </div>
    </div>

    <!-- Locations tab -->
    <div id="tab-locations" class="tab-panel">
      <div id="location-list-view">
        <button type="button" id="add-location-btn">+ Add Location</button>
        <p class="hint">Suburb pages aren't linked from the site's menu/footer — reachable by direct URL and listed in the sitemap.</p>
        <div id="locations-msg" class="msg"></div>
        <div id="locations-table"></div>
      </div>

      <div id="location-form-view" style="display: none;">
        <h2 id="location-form-title">Add Location</h2>
        <form id="location-form">
          <input type="hidden" id="location-id" value="" />

          <label for="location-suburb">Suburb name</label>
          <input id="location-suburb" type="text" required />
          <p class="hint" id="location-slug-hint"></p>

          <label for="location-intro">Intro paragraph</label>
          <textarea id="location-intro" required></textarea>

          <div style="margin-top: 16px;">
            <button type="submit" id="location-submit-btn">Save</button>
            <button type="button" class="secondary" id="location-cancel-btn">Cancel</button>
          </div>
          <div id="location-form-msg" class="msg"></div>
        </form>
      </div>
    </div>

    <!-- Quote requests tab -->
    <div id="tab-quotes" class="tab-panel">
      <p class="hint">Everyone who has submitted the "Request a Quote" form on the live site.</p>
      <div id="requests-msg" class="msg"></div>
      <div id="requests-table"></div>
    </div>

    <!-- Page SEO tab -->
    <div id="tab-seo" class="tab-panel">
      <p class="hint">Override a page's meta title/description without touching code. Leave a field blank to fall back to the page's default.</p>
      <label for="seo-path">Page path (e.g. /about-us, /fire-extinguisher-melbourne, /)</label>
      <input id="seo-path" type="text" placeholder="/about-us" />
      <div style="margin-top: 8px;">
        <button type="button" id="seo-load-btn">Load</button>
      </div>

      <div id="seo-form-view" style="display: none; margin-top: 20px;">
        <label for="seo-title">Title override</label>
        <input id="seo-title" type="text" />

        <label for="seo-description">Description override</label>
        <textarea id="seo-description"></textarea>

        <div style="margin-top: 16px;">
          <button type="button" id="seo-save-btn">Save</button>
        </div>
      </div>
      <div id="seo-msg" class="msg"></div>
    </div>

    <!-- robots.txt tab -->
    <div id="tab-robots" class="tab-panel">
      <p class="hint">Shows the file currently live at /robots.txt. Edit and save to replace it.</p>
      <textarea id="robots_content" placeholder="Loading current robots.txt..."></textarea>
      <div style="margin-top: 16px;">
        <button type="button" id="robots-save-btn">Save robots.txt</button>
      </div>
      <div id="robots-msg" class="msg"></div>
    </div>
  </div>

<script>
// Used to build the "View" link to the live frontend, which may run on a
// different origin than this page in local dev (separate PHP/Vite servers).
const SITE_URL = <?php echo json_encode(rtrim($cfg['SITE_URL'], '/')); ?>;

async function readJsonResponse(res) {
  const text = await res.text();
  const contentType = res.headers.get('content-type') || '';

  if (!text.trim()) {
    throw new Error('The server returned an empty response. Check PHP error logs.');
  }
  if (text.trim().startsWith('<' + '?php')) {
    throw new Error('PHP is not running for this request. Open this page through a PHP server, for example Hostinger /api-backend/admin.php or local php -S localhost:8000.');
  }
  if (!contentType.includes('application/json')) {
    throw new Error('The server did not return JSON. Response started with: ' + text.trim().slice(0, 120));
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error('The server returned invalid JSON. Response started with: ' + text.trim().slice(0, 120));
  }
}

function showMsg(el, ok, text) {
  el.className = 'msg ' + (ok ? 'ok' : 'err');
  el.textContent = text;
}

function adminPassword() {
  return document.getElementById('admin_password').value;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

async function callAdmin(endpoint, extraBody) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ admin_password: adminPassword(), ...extraBody }),
  });
  const data = await readJsonResponse(res);
  if (!res.ok) throw new Error(data.error || 'Request failed.');
  return data;
}

// --- Unlock ---
document.getElementById('unlock-btn').addEventListener('click', async () => {
  const btn = document.getElementById('unlock-btn');
  const msg = document.getElementById('unlock-msg');
  msg.className = 'msg';
  btn.disabled = true;
  btn.textContent = 'Checking...';

  try {
    // Reuses an existing admin-gated endpoint purely to verify the password
    // before revealing anything below.
    await callAdmin('quote_requests.php', {});
    document.getElementById('unlock-section').style.display = 'none';
    document.getElementById('protected-sections').style.display = 'block';
    switchTab('blogs');
  } catch (err) {
    showMsg(msg, false, err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Unlock';
  }
});

// --- Tabs ---
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('active', b.dataset.tab === name));
  document.querySelectorAll('.tab-panel').forEach((p) => p.classList.toggle('active', p.id === 'tab-' + name));
  if (name === 'blogs') loadBlogs();
  if (name === 'services') loadServices();
  if (name === 'locations') loadLocations();
  if (name === 'quotes') loadQuoteRequests();
  if (name === 'robots') loadRobots();
}
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// --- Blogs: list ---
async function loadBlogs() {
  const msg = document.getElementById('blogs-msg');
  const tableHost = document.getElementById('blogs-table');
  msg.className = 'msg';
  tableHost.textContent = 'Loading...';

  try {
    const data = await callAdmin('admin_posts.php', {});
    if (!data.length) {
      tableHost.innerHTML = '';
      showMsg(msg, true, 'No blog posts yet.');
      return;
    }
    const rows = data.map((p) => `
      <tr>
        <td>${p.image_url ? `<img class="thumb" src="${escapeHtml(p.image_url)}" alt="" />` : ''}</td>
        <td>${escapeHtml(p.title)}</td>
        <td>${escapeHtml(p.created_at)}</td>
        <td>${escapeHtml(p.status)}</td>
        <td>
          <a class="action-link" href="${SITE_URL}/blog/${encodeURIComponent(p.slug)}" target="_blank" rel="noopener"><button type="button" class="small secondary">View</button></a>
          <button type="button" class="small" data-edit-id="${p.id}">Edit</button>
          <button type="button" class="small danger" data-delete-id="${p.id}">Delete</button>
        </td>
      </tr>
    `).join('');
    tableHost.innerHTML = `
      <table>
        <thead><tr><th></th><th>Title</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    window.__blogs = data;
    tableHost.querySelectorAll('[data-edit-id]').forEach((btn) => {
      btn.addEventListener('click', () => editBlog(Number(btn.dataset.editId)));
    });
    tableHost.querySelectorAll('[data-delete-id]').forEach((btn) => {
      btn.addEventListener('click', () => deleteBlog(Number(btn.dataset.deleteId)));
    });
  } catch (err) {
    tableHost.innerHTML = '';
    showMsg(msg, false, err.message);
  }
}

document.getElementById('add-blog-btn').addEventListener('click', () => showBlogForm(null));
document.getElementById('post-cancel-btn').addEventListener('click', () => showBlogList());

function showBlogForm(post) {
  document.getElementById('blog-list-view').style.display = 'none';
  document.getElementById('blog-form-view').style.display = 'block';
  document.getElementById('post-msg').className = 'msg';
  const isEdit = !!post;
  document.getElementById('blog-form-title').textContent = isEdit ? 'Edit Blog' : 'Add Blog';
  document.getElementById('post-id').value = isEdit ? post.id : '';
  document.getElementById('title').value = isEdit ? post.title : '';
  document.getElementById('excerpt').value = isEdit ? (post.excerpt || '') : '';
  document.getElementById('image').value = isEdit ? (post.image_url || '') : '';
  document.getElementById('content').value = isEdit ? post.content_html : '';
  document.getElementById('content-hint').textContent = isEdit
    ? 'This is the post\'s raw HTML — edit carefully.'
    : 'Separate paragraphs with a blank line.';
  document.getElementById('post-submit-btn').textContent = isEdit ? 'Save Changes' : 'Publish Post';
}

function showBlogList() {
  document.getElementById('blog-form-view').style.display = 'none';
  document.getElementById('blog-list-view').style.display = 'block';
  document.getElementById('post-form').reset();
}

function editBlog(id) {
  const post = (window.__blogs || []).find((p) => p.id === id);
  if (post) showBlogForm(post);
}

async function deleteBlog(id) {
  const post = (window.__blogs || []).find((p) => p.id === id);
  const title = post ? post.title : 'this post';
  if (!confirm('Delete "' + title + '"? This cannot be undone.')) return;
  const msg = document.getElementById('blogs-msg');
  try {
    await callAdmin('delete_post.php', { id });
    showMsg(msg, true, 'Deleted.');
    loadBlogs();
  } catch (err) {
    showMsg(msg, false, err.message);
  }
};

// --- Blogs: add/edit form submit ---
document.getElementById('post-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('post-submit-btn');
  const msg = document.getElementById('post-msg');
  const id = document.getElementById('post-id').value;
  const isEdit = !!id;
  msg.className = 'msg';
  btn.disabled = true;
  btn.textContent = isEdit ? 'Saving...' : 'Publishing...';

  const fields = {
    title: document.getElementById('title').value,
    excerpt: document.getElementById('excerpt').value,
    image: document.getElementById('image').value,
    content: document.getElementById('content').value,
  };

  try {
    if (isEdit) {
      await callAdmin('update_post.php', { id: Number(id), ...fields });
      showMsg(msg, true, 'Saved.');
    } else {
      const data = await callAdmin('create_post.php', fields);
      showMsg(msg, true, 'Published! View it at /blog/' + data.slug);
    }
    setTimeout(() => { showBlogList(); loadBlogs(); }, 700);
  } catch (err) {
    showMsg(msg, false, err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = isEdit ? 'Save Changes' : 'Publish Post';
  }
});

// --- Services: list ---
async function loadServices() {
  const msg = document.getElementById('services-msg');
  const tableHost = document.getElementById('services-table');
  msg.className = 'msg';
  tableHost.textContent = 'Loading...';

  try {
    const res = await fetch('services.php', { headers: { Accept: 'application/json' } });
    const data = await readJsonResponse(res);
    if (!res.ok) throw new Error(data.error || 'Failed to load services.');
    window.__services = data;

    if (!data.length) {
      tableHost.innerHTML = '';
      showMsg(msg, true, 'No services yet.');
      return;
    }
    const rows = data.map((s, i) => `
      <tr>
        <td>${escapeHtml(s.navTitle)}</td>
        <td>${escapeHtml(s.slug)}</td>
        <td>
          <a class="action-link" href="${SITE_URL}/${encodeURIComponent(s.slug)}" target="_blank" rel="noopener"><button type="button" class="small secondary">View</button></a>
          <button type="button" class="small" data-edit-service="${i}">Edit</button>
          <button type="button" class="small danger" data-delete-service="${i}">Delete</button>
        </td>
      </tr>
    `).join('');
    tableHost.innerHTML = `
      <table>
        <thead><tr><th>Nav Title</th><th>Slug</th><th>Actions</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    tableHost.querySelectorAll('[data-edit-service]').forEach((btn) => {
      btn.addEventListener('click', () => showServiceForm(window.__services[Number(btn.dataset.editService)]));
    });
    tableHost.querySelectorAll('[data-delete-service]').forEach((btn) => {
      btn.addEventListener('click', () => deleteService(window.__services[Number(btn.dataset.deleteService)]));
    });
  } catch (err) {
    tableHost.innerHTML = '';
    showMsg(msg, false, err.message);
  }
}

document.getElementById('add-service-btn').addEventListener('click', () => showServiceForm(null));
document.getElementById('service-cancel-btn').addEventListener('click', () => showServiceList());

function showServiceForm(service) {
  document.getElementById('service-list-view').style.display = 'none';
  document.getElementById('service-form-view').style.display = 'block';
  document.getElementById('service-form-msg').className = 'msg';
  const isEdit = !!service;
  document.getElementById('service-form-title').textContent = isEdit ? 'Edit Service' : 'Add Service';
  document.getElementById('service-id').value = isEdit ? service.id : '';
  document.getElementById('service-slug').value = isEdit ? service.slug : '';
  document.getElementById('service-slug').disabled = isEdit;
  document.getElementById('service-navTitle').value = isEdit ? service.navTitle : '';
  document.getElementById('service-cardTitle').value = isEdit ? service.cardTitle : '';
  document.getElementById('service-cardText').value = isEdit ? service.cardText : '';
  document.getElementById('service-pageTitle').value = isEdit ? service.pageTitle : '';
  document.getElementById('service-seoTitle').value = isEdit ? service.seoTitle : '';
  document.getElementById('service-heroImage').value = isEdit ? service.heroImage : '';
  document.getElementById('service-contentJson').value = isEdit
    ? JSON.stringify({ sections: service.sections, blocks: service.blocks || undefined }, null, 2)
    : '{\n  "sections": [\n    { "heading": "", "paragraphs": [""], "image": "", "imageSide": "left" }\n  ]\n}';
  document.getElementById('service-submit-btn').textContent = isEdit ? 'Save Changes' : 'Add Service';
}

function showServiceList() {
  document.getElementById('service-form-view').style.display = 'none';
  document.getElementById('service-list-view').style.display = 'block';
  document.getElementById('service-form').reset();
}

async function deleteService(service) {
  if (!confirm('Delete "' + service.navTitle + '"? This cannot be undone.')) return;
  const msg = document.getElementById('services-msg');
  try {
    await callAdmin('delete_service.php', { id: service.id });
    showMsg(msg, true, 'Deleted.');
    loadServices();
  } catch (err) {
    showMsg(msg, false, err.message);
  }
}

document.getElementById('service-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('service-submit-btn');
  const msg = document.getElementById('service-form-msg');
  const id = document.getElementById('service-id').value;
  const isEdit = !!id;
  msg.className = 'msg';
  btn.disabled = true;
  btn.textContent = 'Saving...';

  const fields = {
    slug: document.getElementById('service-slug').value,
    navTitle: document.getElementById('service-navTitle').value,
    cardTitle: document.getElementById('service-cardTitle').value,
    cardText: document.getElementById('service-cardText').value,
    pageTitle: document.getElementById('service-pageTitle').value,
    seoTitle: document.getElementById('service-seoTitle').value,
    heroImage: document.getElementById('service-heroImage').value,
    contentJson: document.getElementById('service-contentJson').value,
  };

  try {
    if (isEdit) {
      await callAdmin('update_service.php', { id: Number(id), ...fields });
    } else {
      await callAdmin('create_service.php', fields);
    }
    showMsg(msg, true, 'Saved.');
    setTimeout(() => { showServiceList(); loadServices(); }, 700);
  } catch (err) {
    showMsg(msg, false, err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = isEdit ? 'Save Changes' : 'Add Service';
  }
});

// --- Locations: list ---
async function loadLocations() {
  const msg = document.getElementById('locations-msg');
  const tableHost = document.getElementById('locations-table');
  msg.className = 'msg';
  tableHost.textContent = 'Loading...';

  try {
    const res = await fetch('locations.php', { headers: { Accept: 'application/json' } });
    const data = await readJsonResponse(res);
    if (!res.ok) throw new Error(data.error || 'Failed to load locations.');
    window.__locations = data;

    if (!data.length) {
      tableHost.innerHTML = '';
      showMsg(msg, true, 'No locations yet.');
      return;
    }
    const rows = data.map((l, i) => `
      <tr>
        <td>${escapeHtml(l.suburb)}</td>
        <td>${escapeHtml(l.slug)}</td>
        <td>
          <a class="action-link" href="${SITE_URL}/${encodeURIComponent(l.slug)}" target="_blank" rel="noopener"><button type="button" class="small secondary">View</button></a>
          <button type="button" class="small" data-edit-location="${i}">Edit</button>
          <button type="button" class="small danger" data-delete-location="${i}">Delete</button>
        </td>
      </tr>
    `).join('');
    tableHost.innerHTML = `
      <table>
        <thead><tr><th>Suburb</th><th>Slug</th><th>Actions</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    tableHost.querySelectorAll('[data-edit-location]').forEach((btn) => {
      btn.addEventListener('click', () => showLocationForm(window.__locations[Number(btn.dataset.editLocation)]));
    });
    tableHost.querySelectorAll('[data-delete-location]').forEach((btn) => {
      btn.addEventListener('click', () => deleteLocation(window.__locations[Number(btn.dataset.deleteLocation)]));
    });
  } catch (err) {
    tableHost.innerHTML = '';
    showMsg(msg, false, err.message);
  }
}

document.getElementById('add-location-btn').addEventListener('click', () => showLocationForm(null));
document.getElementById('location-cancel-btn').addEventListener('click', () => showLocationList());

function showLocationForm(location) {
  document.getElementById('location-list-view').style.display = 'none';
  document.getElementById('location-form-view').style.display = 'block';
  document.getElementById('location-form-msg').className = 'msg';
  const isEdit = !!location;
  document.getElementById('location-form-title').textContent = isEdit ? 'Edit Location' : 'Add Location';
  document.getElementById('location-id').value = isEdit ? location.id : '';
  document.getElementById('location-suburb').value = isEdit ? location.suburb : '';
  document.getElementById('location-intro').value = isEdit ? location.intro : '';
  document.getElementById('location-slug-hint').textContent = isEdit
    ? 'URL: /' + location.slug + ' (fixed — not editable)'
    : 'The URL will be generated automatically as /test-and-tag-in-<suburb>.';
  document.getElementById('location-submit-btn').textContent = isEdit ? 'Save Changes' : 'Add Location';
}

function showLocationList() {
  document.getElementById('location-form-view').style.display = 'none';
  document.getElementById('location-list-view').style.display = 'block';
  document.getElementById('location-form').reset();
}

async function deleteLocation(location) {
  if (!confirm('Delete "' + location.suburb + '"? This cannot be undone.')) return;
  const msg = document.getElementById('locations-msg');
  try {
    await callAdmin('delete_location.php', { id: location.id });
    showMsg(msg, true, 'Deleted.');
    loadLocations();
  } catch (err) {
    showMsg(msg, false, err.message);
  }
}

document.getElementById('location-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('location-submit-btn');
  const msg = document.getElementById('location-form-msg');
  const id = document.getElementById('location-id').value;
  const isEdit = !!id;
  msg.className = 'msg';
  btn.disabled = true;
  btn.textContent = 'Saving...';

  const fields = {
    suburb: document.getElementById('location-suburb').value,
    intro: document.getElementById('location-intro').value,
  };

  try {
    if (isEdit) {
      await callAdmin('update_location.php', { id: Number(id), ...fields });
    } else {
      await callAdmin('create_location.php', fields);
    }
    showMsg(msg, true, 'Saved.');
    setTimeout(() => { showLocationList(); loadLocations(); }, 700);
  } catch (err) {
    showMsg(msg, false, err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = isEdit ? 'Save Changes' : 'Add Location';
  }
});

// --- Page SEO ---
document.getElementById('seo-load-btn').addEventListener('click', async () => {
  const msg = document.getElementById('seo-msg');
  const formView = document.getElementById('seo-form-view');
  const path = document.getElementById('seo-path').value.trim();
  msg.className = 'msg';
  formView.style.display = 'none';

  if (!path.startsWith('/')) {
    showMsg(msg, false, 'Path must start with / (e.g. /about-us).');
    return;
  }

  try {
    const res = await fetch('page_meta.php', { headers: { Accept: 'application/json' } });
    const data = await readJsonResponse(res);
    if (!res.ok) throw new Error(data.error || 'Failed to load page SEO data.');
    const existing = data.find((row) => row.path === path);
    document.getElementById('seo-title').value = existing ? existing.title : '';
    document.getElementById('seo-description').value = existing ? existing.description : '';
    formView.style.display = 'block';
  } catch (err) {
    showMsg(msg, false, err.message);
  }
});

document.getElementById('seo-save-btn').addEventListener('click', async () => {
  const btn = document.getElementById('seo-save-btn');
  const msg = document.getElementById('seo-msg');
  const path = document.getElementById('seo-path').value.trim();
  msg.className = 'msg';
  btn.disabled = true;
  btn.textContent = 'Saving...';

  try {
    await callAdmin('update_page_meta.php', {
      path,
      title: document.getElementById('seo-title').value,
      description: document.getElementById('seo-description').value,
    });
    showMsg(msg, true, 'Saved.');
  } catch (err) {
    showMsg(msg, false, err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save';
  }
});

// --- Quote requests ---
function whatsappLink(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  // Assumes Australian local numbers (leading 0); prefixes the country code
  // WhatsApp's click-to-chat links require (no + sign, no leading 0).
  const international = digits.replace(/^0/, '61');
  return 'https://wa.me/' + international;
}

async function loadQuoteRequests() {
  const msg = document.getElementById('requests-msg');
  const tableHost = document.getElementById('requests-table');
  msg.className = 'msg';
  tableHost.textContent = 'Loading...';

  try {
    const data = await callAdmin('quote_requests.php', {});
    if (!data.length) {
      tableHost.innerHTML = '';
      showMsg(msg, true, 'No quote requests yet.');
      return;
    }
    const rows = data.map((r) => `
      <tr>
        <td>${escapeHtml(r.created_at)}</td>
        <td>${escapeHtml(r.name)}</td>
        <td>${escapeHtml(r.email)}</td>
        <td>${escapeHtml(r.phone)}</td>
        <td>${escapeHtml(r.service)}</td>
        <td>${escapeHtml(r.message)}</td>
        <td>
          <a class="action-link" href="tel:${escapeHtml(r.phone)}"><button type="button" class="small secondary">Call</button></a>
          <a class="action-link" href="${whatsappLink(r.phone)}" target="_blank" rel="noopener"><button type="button" class="small">WhatsApp</button></a>
        </td>
      </tr>
    `).join('');
    tableHost.innerHTML = `
      <table>
        <thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Message</th><th>Contact</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  } catch (err) {
    tableHost.innerHTML = '';
    showMsg(msg, false, err.message);
  }
}

// --- robots.txt ---
async function loadRobots() {
  const textarea = document.getElementById('robots_content');
  const saveBtn = document.getElementById('robots-save-btn');
  const msg = document.getElementById('robots-msg');
  msg.className = 'msg';
  textarea.value = '';
  saveBtn.disabled = false;

  try {
    const res = await fetch('/robots.txt', { cache: 'no-store' });
    const text = await res.text();
    // If this admin page and the live site aren't on the same origin (e.g.
    // local dev: this PHP server on one port, the built site on another),
    // /robots.txt won't resolve here and this fetches a 404 HTML page
    // instead of the real file. Refuse to load it into the editor so it
    // can't accidentally be saved over the real robots.txt.
    if (!res.ok || text.trim().startsWith('<')) {
      textarea.placeholder = 'Could not load the real robots.txt from this origin.';
      saveBtn.disabled = true;
      showMsg(
        msg,
        false,
        "This admin page and the live site aren't on the same origin right now (normal in local dev, where the PHP backend and the built React site run on different ports/servers). Editing is disabled here to avoid overwriting the real robots.txt with garbage — use this tab on the deployed Hostinger site instead.",
      );
      return;
    }
    textarea.value = text;
  } catch (err) {
    textarea.placeholder = 'Could not load current robots.txt: ' + err.message;
    saveBtn.disabled = true;
  }
}

document.getElementById('robots-save-btn').addEventListener('click', async () => {
  const btn = document.getElementById('robots-save-btn');
  const msg = document.getElementById('robots-msg');
  msg.className = 'msg';
  btn.disabled = true;
  btn.textContent = 'Saving...';

  try {
    await callAdmin('manage_robots.php', { content: document.getElementById('robots_content').value });
    showMsg(msg, true, 'robots.txt saved.');
  } catch (err) {
    showMsg(msg, false, err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save robots.txt';
  }
});
</script>
</body>
</html>
