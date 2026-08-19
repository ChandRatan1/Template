<?php
// Generates sitemap.xml on every request so blog posts published via
// admin.php show up immediately, with no redeploy/manual edit needed.
// Reachable directly at /api-backend/sitemap.php, and at the clean URL
// /sitemap.xml via the rewrite rule in the site root's .htaccess.
require __DIR__ . '/db.php';

$cfg = bg_config();
$siteUrl = rtrim($cfg['SITE_URL'], '/');

// Static routes, mirrored from src/App.jsx — update this list if routes change.
$staticPaths = [
    '',
    'about-us',
    'contact-us',
    'cost-of-test-tag-in-melbourne',
    'faq',
    'request-a-quote',
    'blog',
];

$pdo = bg_pdo();

// Services and locations are database-backed (admin-editable), so the
// sitemap stays self-maintaining — no list to keep in sync here anymore.
$servicePaths = array_column($pdo->query('SELECT slug FROM services ORDER BY id')->fetchAll(), 'slug');
$locationPaths = array_column($pdo->query('SELECT slug FROM locations ORDER BY id')->fetchAll(), 'slug');

$rows = $pdo->query("
    SELECT slug, updated_at
    FROM posts
    WHERE status = 'publish'
    ORDER BY created_at DESC
")->fetchAll();

header('Content-Type: application/xml; charset=utf-8');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

$printUrl = function ($path, $lastmod = null) use ($siteUrl) {
    $loc = htmlspecialchars($siteUrl . '/' . $path, ENT_QUOTES, 'UTF-8');
    echo "  <url>\n    <loc>{$loc}</loc>\n";
    if ($lastmod) {
        echo "    <lastmod>{$lastmod}</lastmod>\n";
    }
    echo "  </url>\n";
};

foreach ($staticPaths as $path) {
    $printUrl($path);
}
foreach ($servicePaths as $path) {
    $printUrl($path);
}
foreach ($locationPaths as $path) {
    $printUrl($path);
}
foreach ($rows as $row) {
    $lastmod = $row['updated_at'] ? date('Y-m-d', strtotime($row['updated_at'])) : null;
    $printUrl('blog/' . $row['slug'], $lastmod);
}

echo '</urlset>' . "\n";
