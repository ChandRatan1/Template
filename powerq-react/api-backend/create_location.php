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

$suburb = isset($body['suburb']) ? trim((string) $body['suburb']) : '';
$intro = isset($body['intro']) ? trim((string) $body['intro']) : '';

if ($suburb === '' || $intro === '') {
    bg_json_error(400, 'Suburb and intro are required.');
}

$slug = 'test-and-tag-in-' . bg_slugify($suburb);

$insert = $pdo->prepare('INSERT INTO locations (suburb, slug, intro) VALUES (:suburb, :slug, :intro)');
try {
    $insert->execute(['suburb' => $suburb, 'slug' => $slug, 'intro' => $intro]);
} catch (PDOException $e) {
    if (strpos($e->getMessage(), 'Duplicate') !== false) {
        bg_json_error(409, 'A location for this suburb already exists.');
    }
    throw $e;
}

bg_json(['success' => true, 'id' => (int) $pdo->lastInsertId(), 'slug' => $slug], 201);
