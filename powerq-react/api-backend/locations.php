<?php
require __DIR__ . '/db.php';
bg_cors();

$pdo = bg_pdo();
$rows = $pdo->query('SELECT suburb, slug, intro FROM locations ORDER BY id')->fetchAll();

bg_json($rows);
