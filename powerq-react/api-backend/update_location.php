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
$suburb = isset($body['suburb']) ? trim((string) $body['suburb']) : '';
$intro = isset($body['intro']) ? trim((string) $body['intro']) : '';

if ($id <= 0) {
    bg_json_error(400, 'Missing or invalid location id.');
}
if ($suburb === '' || $intro === '') {
    bg_json_error(400, 'Suburb and intro are required.');
}

// Slug is intentionally not editable — keeps the existing URL/redirects stable.
$update = $pdo->prepare('UPDATE locations SET suburb = :suburb, intro = :intro, updated_at = :updated WHERE id = :id');
$update->execute(['suburb' => $suburb, 'intro' => $intro, 'updated' => date('Y-m-d H:i:s'), 'id' => $id]);

if ($update->rowCount() === 0) {
    $exists = $pdo->prepare('SELECT COUNT(*) FROM locations WHERE id = ?');
    $exists->execute([$id]);
    if ((int) $exists->fetchColumn() === 0) {
        bg_json_error(404, 'Location not found.');
    }
}

bg_json(['success' => true, 'id' => $id]);
