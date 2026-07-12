<?php
require __DIR__ . '/db.php';
bg_cors();

$cfg = bg_config();
$pdo = bg_pdo();
$prefix = $cfg['TABLE_PREFIX'];

$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
if ($slug === '') {
    bg_json_error(400, 'Missing slug parameter.');
}

$sql = "
    SELECT p.ID, p.post_title, p.post_name, p.post_excerpt, p.post_content, p.post_date,
           u.display_name AS author_name,
           COALESCE(imgmeta.meta_value, att.guid) AS image_url
    FROM `{$prefix}posts` p
    LEFT JOIN `{$prefix}users` u ON u.ID = p.post_author
    LEFT JOIN `{$prefix}postmeta` imgmeta ON imgmeta.post_id = p.ID AND imgmeta.meta_key = '_react_featured_image'
    LEFT JOIN `{$prefix}postmeta` thumbmeta ON thumbmeta.post_id = p.ID AND thumbmeta.meta_key = '_thumbnail_id'
    LEFT JOIN `{$prefix}posts` att ON att.ID = thumbmeta.meta_value
    WHERE p.post_type = 'post' AND p.post_status = 'publish' AND p.post_name = ?
    LIMIT 1
";
$stmt = $pdo->prepare($sql);
$stmt->execute([$slug]);
$row = $stmt->fetch();

if (!$row) {
    bg_json_error(404, 'Post not found.');
}

bg_json([
    'slug' => $row['post_name'],
    'title' => $row['post_title'],
    'date' => $row['post_date'] ? date('F j, Y', strtotime($row['post_date'])) : '',
    'author' => $row['author_name'] ?: '',
    'image' => $row['image_url'] ?: '',
    'contentHtml' => $row['post_content'],
]);
