<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>PowerQ Blog Admin</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 640px; margin: 40px auto; padding: 0 20px; color: #222; }
  h1 { font-size: 22px; }
  label { display: block; font-weight: 600; margin: 16px 0 6px; }
  input, textarea { width: 100%; padding: 10px; font-size: 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; font-family: inherit; }
  textarea { min-height: 220px; }
  button { margin-top: 20px; padding: 12px 24px; font-size: 15px; font-weight: 600; background: #0d861d; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
  button:disabled { opacity: 0.6; cursor: default; }
  #msg { margin-top: 16px; padding: 12px; border-radius: 4px; display: none; }
  #msg.ok { display: block; background: #d1e7dd; color: #0f5132; }
  #msg.err { display: block; background: #f8d7da; color: #842029; }
  .hint { font-size: 13px; color: #666; margin-top: 4px; }
</style>
</head>
<body>
  <h1>Publish a blog post</h1>
  <p class="hint">This writes directly into the live database's <code>wp_posts</code> table — it appears on /blog immediately, no redeploy needed.</p>

  <form id="post-form">
    <label for="admin_password">Admin password</label>
    <input id="admin_password" type="password" required />

    <label for="title">Title</label>
    <input id="title" type="text" required />

    <label for="excerpt">Excerpt (optional — shown on the blog listing card)</label>
    <input id="excerpt" type="text" />

    <label for="image">Image URL (optional)</label>
    <input id="image" type="text" placeholder="https://..." />

    <label for="content">Content</label>
    <textarea id="content" required placeholder="Separate paragraphs with a blank line."></textarea>

    <button type="submit" id="submit-btn">Publish Post</button>
    <div id="msg"></div>
  </form>

<script>
document.getElementById('post-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const msg = document.getElementById('msg');
  msg.className = '';
  msg.textContent = '';
  btn.disabled = true;
  btn.textContent = 'Publishing...';

  try {
    const res = await fetch('create_post.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        admin_password: document.getElementById('admin_password').value,
        title: document.getElementById('title').value,
        excerpt: document.getElementById('excerpt').value,
        image: document.getElementById('image').value,
        content: document.getElementById('content').value,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to publish.');
    msg.className = 'ok';
    msg.textContent = 'Published! View it at /blog/' + data.slug;
    document.getElementById('post-form').reset();
  } catch (err) {
    msg.className = 'err';
    msg.textContent = err.message;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Publish Post';
  }
});
</script>
</body>
</html>
