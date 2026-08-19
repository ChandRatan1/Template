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
      <button type="button" class="tab-btn" data-tab="quotes">Request Quotes</button>
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

    <!-- Quote requests tab -->
    <div id="tab-quotes" class="tab-panel">
      <p class="hint">Everyone who has submitted the "Request a Quote" form on the live site.</p>
      <div id="requests-msg" class="msg"></div>
      <div id="requests-table"></div>
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
