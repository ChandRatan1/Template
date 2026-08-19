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
$navTitle = isset($body['navTitle']) ? trim((string) $body['navTitle']) : '';
$cardTitle = isset($body['cardTitle']) ? trim((string) $body['cardTitle']) : '';
$cardText = isset($body['cardText']) ? trim((string) $body['cardText']) : '';
$pageTitle = isset($body['pageTitle']) ? trim((string) $body['pageTitle']) : '';
$seoTitle = isset($body['seoTitle']) ? trim((string) $body['seoTitle']) : '';
$heroImage = isset($body['heroImage']) ? trim((string) $body['heroImage']) : '';
$contentJson = isset($body['contentJson']) ? trim((string) $body['contentJson']) : '';

if ($id <= 0) {
    bg_json_error(400, 'Missing or invalid service id.');
}
if ($navTitle === '' || $pageTitle === '') {
    bg_json_error(400, 'Nav title and page title are required.');
}

$decoded = json_decode($contentJson, true);
if ($contentJson === '' || $decoded === null || !isset($decoded['sections']) || !is_array($decoded['sections'])) {
    bg_json_error(400, 'Content must be valid JSON with a "sections" array, e.g. {"sections": [...]}.');
}

// Slug is intentionally not editable here — same reasoning as posts: keeps
// existing links/nav/sitemap entries stable.
$update = $pdo->prepare('
    UPDATE services
    SET nav_title = :nav_title, card_title = :card_title, card_text = :card_text,
        page_title = :page_title, seo_title = :seo_title, hero_image = :hero_image,
        content_json = :content, updated_at = :updated
    WHERE id = :id
');
$update->execute([
    'nav_title' => $navTitle,
    'card_title' => $cardTitle,
    'card_text' => $cardText,
    'page_title' => $pageTitle,
    'seo_title' => $seoTitle,
    'hero_image' => $heroImage,
    'content' => $contentJson,
    'updated' => date('Y-m-d H:i:s'),
    'id' => $id,
]);

if ($update->rowCount() === 0) {
    $exists = $pdo->prepare('SELECT COUNT(*) FROM services WHERE id = ?');
    $exists->execute([$id]);
    if ((int) $exists->fetchColumn() === 0) {
        bg_json_error(404, 'Service not found.');
    }
}

bg_json(['success' => true, 'id' => $id]);
