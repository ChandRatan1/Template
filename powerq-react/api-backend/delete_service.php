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
if ($id <= 0) {
    bg_json_error(400, 'Missing or invalid service id.');
}

$delete = $pdo->prepare('DELETE FROM services WHERE id = ?');
$delete->execute([$id]);

if ($delete->rowCount() === 0) {
    bg_json_error(404, 'Service not found.');
}

bg_json(['success' => true]);
