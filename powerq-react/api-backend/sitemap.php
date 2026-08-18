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

// Service page slugs, mirrored from src/data/services.js — update this list
// if services are added/removed there.
$servicePaths = [
    'electrical-test-and-tag-in-melbourne',
    'fire-extinguisher-melbourne',
    'rcd-safety-switches-in-melbourne',
    'three-phase-testing-melbourne',
    'microwave-testing-in-melbourne',
    'emergency-exit-light-testing-in-melbourne',
    'smoke-alarm-service-melbourne',
];

$pdo = bg_pdo();
$prefix = $cfg['TABLE_PREFIX'];
$rows = $pdo->query("
    SELECT post_name, post_date
    FROM `{$prefix}posts`
    WHERE post_type = 'post' AND post_status = 'publish'
    ORDER BY post_date DESC
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
foreach ($rows as $row) {
    $lastmod = $row['post_date'] ? date('Y-m-d', strtotime($row['post_date'])) : null;
    $printUrl('blog/' . $row['post_name'], $lastmod);
}

echo '</urlset>' . "\n";
