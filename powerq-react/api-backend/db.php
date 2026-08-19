<?php
// Shared PDO connection + small helpers used by every endpoint in this folder.

ob_start();

set_exception_handler(function ($e) {
    bg_json_error(500, 'Server error: ' . $e->getMessage());
});

set_error_handler(function ($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) {
        return false;
    }
    throw new ErrorException($message, 0, $severity, $file, $line);
});

register_shutdown_function(function () {
    $error = error_get_last();
    if (!$error) {
        return;
    }

    $fatalTypes = [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR];
    if (!in_array($error['type'], $fatalTypes, true)) {
        return;
    }

    bg_json_error(500, 'Fatal server error while handling the blog request. Check Hostinger PHP error logs for details.');
});

function bg_config() {
    $path = __DIR__ . '/config.php';
    if (!file_exists($path)) {
        bg_json_error(500, 'config.php is missing. Copy config.sample.php to config.php and fill in the database credentials.');
    }

    $cfg = require $path;
    if (!is_array($cfg)) {
        bg_json_error(500, 'api-backend/config.php must return a PHP array. See config.sample.php for the expected shape.');
    }

    $required = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'ADMIN_PASSWORD', 'SITE_URL', 'QUOTE_EMAIL_TO', 'QUOTE_EMAIL_CC'];
    foreach ($required as $key) {
        if (!array_key_exists($key, $cfg)) {
            bg_json_error(500, "api-backend/config.php is missing {$key}.");
        }
    }

    return $cfg;
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
    } catch (Throwable $e) {
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
    while (ob_get_level() > 0) {
        ob_end_clean();
    }
    http_response_code($status);
    if (!headers_sent()) {
        header('Content-Type: application/json; charset=utf-8');
    }
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
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

function bg_unique_slug($pdo, $baseSlug) {
    $slug = $baseSlug;
    $suffix = 2;
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM posts WHERE slug = ?');
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
