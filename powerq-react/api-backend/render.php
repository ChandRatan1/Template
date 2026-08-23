<?php
// Serves the built index.html for every non-file SPA route (see the site
// root's .htaccess fallback rule), but first injects the correct per-page
// <title>/description/canonical/Open Graph tags into the raw HTML before
// sending it — so social link-preview bots and "View Page Source" (neither
// of which run JavaScript) see the real page-specific tags, not the generic
// defaults baked into index.html. Reads the same database the React app's
// CatalogContext does, at request time, so it's never stale — a service
// added via admin.php a minute ago already has correct tags here.
//
// Client-side navigation (clicking links without a full page reload) is
// unaffected — usePageSeo.js keeps handling that exactly as before. This
// only changes the very first HTML response for a given URL.

require __DIR__ . '/db.php';

$cfg = bg_config();
$pdo = bg_pdo();
$siteOrigin = rtrim($cfg['SITE_URL'], '/');

$defaultTitle = 'PowerQ - Professional Test and Tag Services in Melbourne';
$defaultDescription = 'PowerQ provides expert test and tag services in Melbourne, ensuring electrical safety compliance for homes and businesses with certified technicians.';
$defaultImage = $siteOrigin . '/content-img/powerq-logo-300x76.png';

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = rawurldecode($path);
$trimmed = trim($path, '/');

$title = null;
$description = null;
$image = null;
$noIndex = false;

// Static pages — kept in sync by hand with each page's usePageSeo() call,
// same convention already used for sitemap.php's static path list.
$staticPages = [
    '' => [$defaultTitle, null],
    'about-us' => [
        'About U - Trusted Test and Tag Experts in Melbourne',
        "PowerQ is Melbourne's trusted test and tag provider, delivering after-hours electrical safety inspections for businesses, schools, restaurants and offices.",
    ],
    'contact-us' => [
        'Contact Us - PowerQ Test and Tag in Melbourne',
        "Get in touch with PowerQ for electrical test and tag services in Melbourne. Call, email, or visit us — we're here Mon-Fri 9am-7pm and weekends 10am-2pm.",
    ],
    'cost-of-test-tag-in-melbourne' => [
        'Test and Tag Pricing Melbourne - Affordable Rates | PowerQ',
        'Transparent, tailored pricing for test and tag services in Melbourne. No flat rates or hidden fees — get a fair quote based on your equipment and site.',
    ],
    'faq' => [
        'Frequently Asked Questions - Test and Tag Melbourne',
        'Testing and tagging is essential for ensuring electrical equipment is safe to use and compliant with safety standards in Victoria.',
    ],
    'request-a-quote' => [
        'Request a Free Quote - Test and Tag Services in Melbourne',
        'Request a free, no-obligation quote for test and tag services in Melbourne. Fast turnaround, transparent pricing, and certified technicians ready to help.',
    ],
    'blog' => [
        'Blog | PowerQ',
        'Read the latest news, tips and guides on electrical safety, test and tag compliance, and workplace safety standards from the PowerQ team in Melbourne.',
    ],
    'search' => ['Search | PowerQ', null],
];

if (array_key_exists($trimmed, $staticPages)) {
    [$title, $description] = $staticPages[$trimmed];
    if ($trimmed === 'search') {
        $noIndex = true;
    }
} elseif (strpos($trimmed, 'blog/') === 0) {
    $slug = substr($trimmed, strlen('blog/'));
    $stmt = $pdo->prepare("SELECT title, excerpt, image_url FROM posts WHERE status = 'publish' AND slug = ? LIMIT 1");
    $stmt->execute([$slug]);
    if ($row = $stmt->fetch()) {
        $title = $row['title'] . ' | PowerQ';
        $description = $row['excerpt'];
        $image = $row['image_url'] ?: null;
    }
} else {
    $stmt = $pdo->prepare('SELECT nav_title, seo_title, card_text, hero_image FROM services WHERE slug = ? LIMIT 1');
    $stmt->execute([$trimmed]);
    if ($row = $stmt->fetch()) {
        // Matches SmokeAlarmPage.jsx, which hardcodes its own title instead
        // of using the (blank) seo_title column for this one service.
        $title = $trimmed === 'smoke-alarm-service-melbourne'
            ? 'Smoke Alarm Installation & Testing in Melbourne | PowerQ'
            : ($row['seo_title'] ?: $row['nav_title']);
        $description = $row['card_text'];
        $image = $row['hero_image'] ?: null;
    } else {
        $stmt = $pdo->prepare('SELECT suburb, intro FROM locations WHERE slug = ? LIMIT 1');
        $stmt->execute([$trimmed]);
        if ($row = $stmt->fetch()) {
            $title = 'Test and Tag in ' . $row['suburb'] . ' | PowerQ';
            $description = $row['intro'];
        }
    }
}

// An admin-set Page SEO override always wins, same precedence usePageSeo.js uses.
$metaStmt = $pdo->prepare('SELECT title, description FROM page_meta WHERE path = ? LIMIT 1');
$metaStmt->execute(['/' . $trimmed]);
if ($override = $metaStmt->fetch()) {
    if (!empty($override['title'])) {
        $title = $override['title'];
    }
    if (!empty($override['description'])) {
        $description = $override['description'];
    }
}

$finalTitle = $title ?: $defaultTitle;
$finalDescription = $description ?: $defaultDescription;
$finalImage = $image ? (strpos($image, 'http') === 0 ? $image : $siteOrigin . $image) : $defaultImage;
$finalUrl = $siteOrigin . '/' . $trimmed;

$html = file_get_contents(__DIR__ . '/../index.html');
if ($html === false) {
    http_response_code(500);
    echo 'Site is temporarily unavailable.';
    exit;
}

$esc = function ($s) {
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
};

$html = str_replace(
    '<title>PowerQ - Professional Test and Tag Services in Melbourne</title>',
    '<title>' . $esc($finalTitle) . '</title>',
    $html
);
$html = str_replace(
    'content="PowerQ provides expert test and tag services in Melbourne, ensuring electrical safety compliance for homes and businesses with certified technicians."',
    'content="' . $esc($finalDescription) . '"',
    $html
);
$html = str_replace(
    'content="PowerQ | Test & Tag Services in Melbourne"',
    'content="' . $esc($finalTitle) . '"',
    $html
);
$html = str_replace(
    'content="Professional electrical test and tag, fire extinguisher, RCD, emergency lighting and safety testing services across Melbourne."',
    'content="' . $esc($finalDescription) . '"',
    $html
);
$html = str_replace(
    'content="https://www.powerq.com.au/"',
    'content="' . $esc($finalUrl) . '"',
    $html
);
$html = str_replace(
    'content="https://www.powerq.com.au/content-img/powerq-logo-300x76.png"',
    'content="' . $esc($finalImage) . '"',
    $html
);

$headExtras = '<link rel="canonical" href="' . $esc($finalUrl) . '" />' . "\n";
if ($noIndex) {
    $headExtras .= '<meta name="robots" content="noindex, follow" />' . "\n";
}
$html = str_replace('</head>', $headExtras . '  </head>', $html);

header('Content-Type: text/html; charset=utf-8');
echo $html;
