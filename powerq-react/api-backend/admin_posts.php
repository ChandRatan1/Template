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

// Unlike posts.php (public, published-only), this returns every post
// regardless of status, for the admin blog list.
$rows = $pdo->query('
    SELECT id, title, slug, excerpt, content_html, image_url, status, created_at
    FROM posts
    ORDER BY created_at DESC
')->fetchAll();

bg_json($rows);
