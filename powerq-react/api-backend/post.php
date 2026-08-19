<?php
require __DIR__ . '/db.php';
bg_cors();

$pdo = bg_pdo();

$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
if ($slug === '') {
    bg_json_error(400, 'Missing slug parameter.');
}

$stmt = $pdo->prepare("
    SELECT title, slug, excerpt, content_html, image_url, author_name, created_at
    FROM posts
    WHERE status = 'publish' AND slug = ?
    LIMIT 1
");
$stmt->execute([$slug]);
$row = $stmt->fetch();

if (!$row) {
    bg_json_error(404, 'Post not found.');
}

$excerpt = trim((string) $row['excerpt']);
if ($excerpt === '') {
    $plain = trim(strip_tags($row['content_html']));
    $excerpt = strlen($plain) > 160 ? substr($plain, 0, 160) . '…' : $plain;
}

bg_json([
    'slug' => $row['slug'],
    'title' => $row['title'],
    'date' => $row['created_at'] ? date('F j, Y', strtotime($row['created_at'])) : '',
    'author' => $row['author_name'] ?: '',
    'image' => $row['image_url'] ?: '',
    'excerpt' => $excerpt,
    'contentHtml' => $row['content_html'],
]);
