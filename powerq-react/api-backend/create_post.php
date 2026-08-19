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

$title = isset($body['title']) ? trim((string) $body['title']) : '';
$content = isset($body['content']) ? trim((string) $body['content']) : '';
$excerpt = isset($body['excerpt']) ? trim((string) $body['excerpt']) : '';
$imageUrl = isset($body['image']) ? trim((string) $body['image']) : '';

if ($title === '' || $content === '') {
    bg_json_error(400, 'Title and content are required.');
}

$slug = bg_unique_slug($pdo, bg_slugify($title));
$contentHtml = bg_paragraphs_to_html($content);
$now = date('Y-m-d H:i:s');

$insert = $pdo->prepare('
    INSERT INTO posts (title, slug, excerpt, content_html, image_url, author_name, status, created_at, updated_at)
    VALUES (:title, :slug, :excerpt, :content, :image, :author, :status, :created, :updated)
');
$insert->execute([
    'title' => $title,
    'slug' => $slug,
    'excerpt' => $excerpt,
    'content' => $contentHtml,
    'image' => $imageUrl,
    'author' => 'PowerQ Team',
    'status' => 'publish',
    'created' => $now,
    'updated' => $now,
]);

$postId = (int) $pdo->lastInsertId();

bg_json(['success' => true, 'id' => $postId, 'slug' => $slug], 201);
