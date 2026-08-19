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

// Honeypot: a real visitor never fills this hidden field in. Pretend success
// so the bot doesn't learn anything, but skip the DB write and the email.
$honeypot = isset($body['website']) ? trim((string) $body['website']) : '';
if ($honeypot !== '') {
    bg_json(['success' => true], 201);
}

$name = isset($body['name']) ? trim((string) $body['name']) : '';
$email = isset($body['email']) ? trim((string) $body['email']) : '';
$phone = isset($body['phone']) ? trim((string) $body['phone']) : '';
$service = isset($body['service']) ? trim((string) $body['service']) : '';
$message = isset($body['message']) ? trim((string) $body['message']) : '';
$sourcePage = isset($body['source_page']) ? trim((string) $body['source_page']) : '';

if ($name === '' || strlen($name) > 30 || !preg_match('/^[A-Za-z\s]+$/', $name)) {
    bg_json_error(400, 'Please provide a valid name.');
}
if ($email === '' || strlen($email) > 50 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    bg_json_error(400, 'Please provide a valid email address.');
}
if ($phone === '' || strlen($phone) > 15 || !preg_match('/^\d+$/', $phone)) {
    bg_json_error(400, 'Please provide a valid phone number.');
}
if (strlen($message) > 300) {
    bg_json_error(400, 'Message must be 300 characters or less.');
}

$insert = $pdo->prepare('
    INSERT INTO quote_requests (name, email, phone, service, message, source_page, email_sent, created_at)
    VALUES (:name, :email, :phone, :service, :message, :source_page, 0, :created)
');
$insert->execute([
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'service' => $service,
    'message' => $message,
    'source_page' => $sourcePage,
    'created' => date('Y-m-d H:i:s'),
]);
$requestId = (int) $pdo->lastInsertId();

$to = $cfg['QUOTE_EMAIL_TO'];
$cc = implode(',', (array) $cfg['QUOTE_EMAIL_CC']);
$subject = 'New Quote Request - PowerQ Website';
$emailBody = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nService: {$service}\nMessage: {$message}\n";
$headers = [
    'From: PowerQ Website <' . $to . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=utf-8',
];
if ($cc !== '') {
    $headers[] = 'Cc: ' . $cc;
}

$emailSent = @mail($to, $subject, $emailBody, implode("\r\n", $headers));
if ($emailSent) {
    $pdo->prepare('UPDATE quote_requests SET email_sent = 1 WHERE id = ?')->execute([$requestId]);
}

bg_json(['success' => true, 'id' => $requestId], 201);
