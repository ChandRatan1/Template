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

$path = isset($body['path']) ? trim((string) $body['path']) : '';
$title = isset($body['title']) ? trim((string) $body['title']) : '';
$description = isset($body['description']) ? trim((string) $body['description']) : '';

if ($path === '' || $path[0] !== '/') {
    bg_json_error(400, 'Path must start with / (e.g. /about-us or /fire-extinguisher-melbourne).');
}

$upsert = $pdo->prepare('
    INSERT INTO page_meta (path, title, description)
    VALUES (:path, :title, :description)
    ON DUPLICATE KEY UPDATE title = :title2, description = :description2
');
$upsert->execute([
    'path' => $path,
    'title' => $title,
    'description' => $description,
    'title2' => $title,
    'description2' => $description,
]);

bg_json(['success' => true]);
