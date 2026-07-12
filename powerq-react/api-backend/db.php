<?php
// Shared PDO connection + small helpers used by every endpoint in this folder.

function bg_config() {
    $path = __DIR__ . '/config.php';
    if (!file_exists($path)) {
        bg_json_error(500, 'config.php is missing. Copy config.sample.php to config.php and fill in the database credentials.');
    }
    return require $path;
}

function bg_pdo() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }
    $cfg = bg_config();
    $dsn = 'mysql:host=' . $cfg['DB_HOST'] . ';dbname=' . $cfg['DB_NAME'] . ';charset=utf8mb4';
    try {
        $pdo = new PDO($dsn, $cfg['DB_USER'], $cfg['DB_PASSWORD'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    } catch (PDOException $e) {
        bg_json_error(500, 'Could not connect to the database. Check config.php credentials.');
    }
    return $pdo;
}

function bg_cors() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function bg_json($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}

function bg_json_error($status, $message) {
    bg_json(['error' => $message], $status);
}

function bg_slugify($title) {
    $slug = strtolower(trim($title));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    $slug = trim($slug, '-');
    return $slug !== '' ? $slug : 'post';
}

function bg_unique_slug($pdo, $prefix, $baseSlug) {
    $slug = $baseSlug;
    $suffix = 2;
    // WordPress requires post_name to be unique across every post type (pages,
    // attachments, etc.), not just among blog posts — checking only 'post'
    // rows here could silently collide with an existing page's URL.
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM `{$prefix}posts` WHERE post_name = ?");
    while (true) {
        $stmt->execute([$slug]);
        if ((int) $stmt->fetchColumn() === 0) {
            return $slug;
        }
        $slug = $baseSlug . '-' . $suffix;
        $suffix++;
    }
}

// Turns blank-line-separated plain-text paragraphs into simple safe HTML,
// mirroring what WordPress's wpautop does for plain-text post content.
function bg_paragraphs_to_html($text) {
    $text = str_replace("\r\n", "\n", trim($text));
    $paragraphs = preg_split('/\n\s*\n/', $text);
    $html = '';
    foreach ($paragraphs as $p) {
        $p = trim($p);
        if ($p === '') {
            continue;
        }
        $escaped = nl2br(htmlspecialchars($p, ENT_QUOTES, 'UTF-8'));
        $html .= "<p>{$escaped}</p>\n";
    }
    return $html;
}
