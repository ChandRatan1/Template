<?php
require __DIR__ . '/db.php';
bg_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    bg_json_error(405, 'Use POST.');
}

$cfg = bg_config();
$pdo = bg_pdo();
$prefix = $cfg['TABLE_PREFIX'];

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    bg_json_error(400, 'Invalid request body.');
}

$password = isset($body['admin_password']) ? (string) $body['admin_password'] : '';
if (!hash_equals((string) $cfg['ADMIN_PASSWORD'], $password)) {
    bg_json_error(403, 'Incorrect admin password.');
}

$title = isset($body['title']) ? trim((string) $body['title']) : '';
$content = isset($body['content']) ? trim((string) $body['content']) : '';
$excerpt = isset($body['excerpt']) ? trim((string) $body['excerpt']) : '';
$imageUrl = isset($body['image']) ? trim((string) $body['image']) : '';

if ($title === '' || $content === '') {
    bg_json_error(400, 'Title and content are required.');
}

$slug = bg_unique_slug($pdo, $prefix, bg_slugify($title));
$contentHtml = bg_paragraphs_to_html($content);
$now = date('Y-m-d H:i:s');
$nowGmt = gmdate('Y-m-d H:i:s');

$insert = $pdo->prepare("
    INSERT INTO `{$prefix}posts`
        (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt,
         post_status, comment_status, ping_status, post_password, post_name,
         to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered,
         post_parent, guid, menu_order, post_type, post_mime_type, comment_count)
    VALUES
        (:author, :date, :date_gmt, :content, :title, :excerpt,
         'publish', 'closed', 'closed', '', :name,
         '', '', :modified, :modified_gmt, '',
         0, '', 0, 'post', '', 0)
");
$insert->execute([
    'author' => $cfg['DEFAULT_AUTHOR_ID'],
    'date' => $now,
    'date_gmt' => $nowGmt,
    'content' => $contentHtml,
    'title' => $title,
    'excerpt' => $excerpt,
    'name' => $slug,
    'modified' => $now,
    'modified_gmt' => $nowGmt,
]);

$postId = (int) $pdo->lastInsertId();

$guid = rtrim($cfg['SITE_URL'], '/') . '/?p=' . $postId;
$pdo->prepare("UPDATE `{$prefix}posts` SET guid = ? WHERE ID = ?")->execute([$guid, $postId]);

if ($imageUrl !== '') {
    $pdo->prepare("
        INSERT INTO `{$prefix}postmeta` (post_id, meta_key, meta_value)
        VALUES (?, '_react_featured_image', ?)
    ")->execute([$postId, $imageUrl]);
}

bg_json(['success' => true, 'id' => $postId, 'slug' => $slug], 201);
