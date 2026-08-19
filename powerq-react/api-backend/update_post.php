<?php
require __DIR__ . '/db.php';
bg_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    bg_json_error(405, 'Use POST.');
}

$cfg = bg_config();
$pdo = bg_pdo();

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    bg_json_error(400, 'Invalid request body.');
}

$password = isset($body['admin_password']) ? (string) $body['admin_password'] : '';
if (!hash_equals((string) $cfg['ADMIN_PASSWORD'], $password)) {
    bg_json_error(403, 'Incorrect admin password.');
}

$id = isset($body['id']) ? (int) $body['id'] : 0;
$title = isset($body['title']) ? trim((string) $body['title']) : '';
$contentHtml = isset($body['content']) ? trim((string) $body['content']) : '';
$excerpt = isset($body['excerpt']) ? trim((string) $body['excerpt']) : '';
$imageUrl = isset($body['image']) ? trim((string) $body['image']) : '';

if ($id <= 0) {
    bg_json_error(400, 'Missing or invalid post id.');
}
if ($title === '' || $contentHtml === '') {
    bg_json_error(400, 'Title and content are required.');
}

// Editing saves the content field as-is (it's HTML, pre-filled from the
// post's existing content_html) rather than re-running it through the
// plain-text-paragraph converter create_post.php uses — otherwise editing
// an already-HTML post (e.g. one with links or images in it) would mangle
// its markup. The slug is intentionally left unchanged so existing links
// to this post keep working.
$update = $pdo->prepare('
    UPDATE posts
    SET title = :title, excerpt = :excerpt, content_html = :content, image_url = :image, updated_at = :updated
    WHERE id = :id
');
$update->execute([
    'title' => $title,
    'excerpt' => $excerpt,
    'content' => $contentHtml,
    'image' => $imageUrl,
    'updated' => date('Y-m-d H:i:s'),
    'id' => $id,
]);

if ($update->rowCount() === 0) {
    $exists = $pdo->prepare('SELECT COUNT(*) FROM posts WHERE id = ?');
    $exists->execute([$id]);
    if ((int) $exists->fetchColumn() === 0) {
        bg_json_error(404, 'Post not found.');
    }
}

bg_json(['success' => true, 'id' => $id]);
