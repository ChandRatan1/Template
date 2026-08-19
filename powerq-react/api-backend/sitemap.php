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

// Local-area landing page slugs, mirrored from src/data/locations.js —
// update this list if suburbs are added/removed there.
$locationPaths = array_map(function ($suburb) {
    return 'test-and-tag-in-' . $suburb;
}, [
    'ballarat', 'bendigo', 'brunswick', 'camberwell', 'campbellfield', 'carlton',
    'clayton', 'coburg', 'craigieburn', 'cranbourne', 'dandenong', 'derrimut',
    'docklands', 'doncaster', 'fitzroy', 'geelong', 'glen-waverley', 'glenroy',
    'hallam', 'heidelberg', 'laverton', 'melbourne-cbd', 'port-melbourne', 'preston',
    'somerton', 'springvale', 'sunshine-north', 'tarneit', 'thomastown', 'truganina',
    'tullamarine', 'werribee', 'wyndham',
]);

$pdo = bg_pdo();
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
