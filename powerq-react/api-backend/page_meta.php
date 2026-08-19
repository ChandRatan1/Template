<?php
require __DIR__ . '/db.php';
bg_cors();

$pdo = bg_pdo();
$rows = $pdo->query('SELECT path, title, description FROM page_meta')->fetchAll();

bg_json($rows);
