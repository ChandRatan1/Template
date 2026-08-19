<?php
require __DIR__ . '/db.php';
bg_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    bg_json_error(405, 'Use POST.');
}

$cfg = bg_config();

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    bg_json_error(400, 'Invalid request body.');
}

$password = isset($body['admin_password']) ? (string) $body['admin_password'] : '';
if (!hash_equals((string) $cfg['ADMIN_PASSWORD'], $password)) {
    bg_json_error(403, 'Incorrect admin password.');
}

$content = isset($body['content']) ? (string) $body['content'] : '';
if ($content === '') {
    bg_json_error(400, 'robots.txt content cannot be empty.');
}
if (strlen($content) > 10240) {
    bg_json_error(400, 'robots.txt content is too large (10KB max).');
}

// Fixed, hardcoded destination — never derived from client input, so this
// endpoint can only ever overwrite this one file at the site root.
$path = __DIR__ . '/../robots.txt';
if (file_put_contents($path, $content) === false) {
    bg_json_error(500, 'Could not write robots.txt. Check file permissions.');
}

bg_json(['success' => true]);
