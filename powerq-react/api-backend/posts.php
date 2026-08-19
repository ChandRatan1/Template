<?php
require __DIR__ . '/db.php';
bg_cors();

$pdo = bg_pdo();

$sql = "
    SELECT id, title, slug, excerpt, content_html, image_url, author_name, created_at
    FROM posts
    WHERE status = 'publish'
    ORDER BY created_at DESC
";

$rows = $pdo->query($sql)->fetchAll();

$posts = array_map(function ($row) {
    $excerpt = trim((string) $row['excerpt']);
    if ($excerpt === '') {
        $plain = trim(strip_tags($row['content_html']));
        $excerpt = strlen($plain) > 160 ? substr($plain, 0, 160) . '…' : $plain;
    }
    return [
        'slug' => $row['slug'],
        'title' => $row['title'],
        'date' => $row['created_at'] ? date('F j, Y', strtotime($row['created_at'])) : '',
        'author' => $row['author_name'] ?: '',
        'image' => $row['image_url'] ?: '',
        'excerpt' => $excerpt,
    ];
}, $rows);

bg_json($posts);
