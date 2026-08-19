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

$slug = isset($body['slug']) ? trim((string) $body['slug']) : '';
$navTitle = isset($body['navTitle']) ? trim((string) $body['navTitle']) : '';
$cardTitle = isset($body['cardTitle']) ? trim((string) $body['cardTitle']) : '';
$cardText = isset($body['cardText']) ? trim((string) $body['cardText']) : '';
$pageTitle = isset($body['pageTitle']) ? trim((string) $body['pageTitle']) : '';
$seoTitle = isset($body['seoTitle']) ? trim((string) $body['seoTitle']) : '';
$heroImage = isset($body['heroImage']) ? trim((string) $body['heroImage']) : '';
$contentJson = isset($body['contentJson']) ? trim((string) $body['contentJson']) : '';

if ($slug === '' || $navTitle === '' || $pageTitle === '') {
    bg_json_error(400, 'Slug, nav title, and page title are required.');
}
if (!preg_match('/^[a-z0-9-]+$/', $slug)) {
    bg_json_error(400, 'Slug must be lowercase letters, numbers, and hyphens only.');
}

$decoded = json_decode($contentJson, true);
if ($contentJson === '' || $decoded === null || !isset($decoded['sections']) || !is_array($decoded['sections'])) {
    bg_json_error(400, 'Content must be valid JSON with a "sections" array, e.g. {"sections": [...]}.');
}

$insert = $pdo->prepare('
    INSERT INTO services (slug, nav_title, card_title, card_text, page_title, seo_title, hero_image, content_json)
    VALUES (:slug, :nav_title, :card_title, :card_text, :page_title, :seo_title, :hero_image, :content)
');
try {
    $insert->execute([
        'slug' => $slug,
        'nav_title' => $navTitle,
        'card_title' => $cardTitle,
        'card_text' => $cardText,
        'page_title' => $pageTitle,
        'seo_title' => $seoTitle,
        'hero_image' => $heroImage,
        'content' => $contentJson,
    ]);
} catch (PDOException $e) {
    if (strpos($e->getMessage(), 'Duplicate') !== false) {
        bg_json_error(409, 'A service with this slug already exists.');
    }
    throw $e;
}

bg_json(['success' => true, 'id' => (int) $pdo->lastInsertId(), 'slug' => $slug], 201);
