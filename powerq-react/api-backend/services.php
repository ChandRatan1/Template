<?php
require __DIR__ . '/db.php';
bg_cors();

$pdo = bg_pdo();
$rows = $pdo->query('
    SELECT slug, nav_title, card_title, card_text, page_title, seo_title, hero_image, content_json
    FROM services
    ORDER BY id
')->fetchAll();

$services = array_map(function ($row) {
    $content = json_decode($row['content_json'], true) ?: [];
    return [
        'slug' => $row['slug'],
        'navTitle' => $row['nav_title'],
        'cardTitle' => $row['card_title'],
        'cardText' => $row['card_text'],
        'pageTitle' => $row['page_title'],
        'seoTitle' => $row['seo_title'],
        'heroImage' => $row['hero_image'],
        'sections' => $content['sections'] ?? [],
        'blocks' => $content['blocks'] ?? null,
    ];
}, $rows);

bg_json($services);
