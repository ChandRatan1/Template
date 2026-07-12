<?php
// Copy this file to config.php and fill in the real values.
// config.php is gitignored — never commit real credentials.
//
// DB_NAME and TABLE_PREFIX already match the live Hostinger database
// (from the 127_0_0_1.sql dump) — only the connection details below need
// to be filled in with the real host/username/password.

return [
    'DB_HOST' => '',              // usually 'localhost' on Hostinger
    'DB_NAME' => 'u603699887_powerq',
    'DB_USER' => '',
    'DB_PASSWORD' => '',
    'TABLE_PREFIX' => 'LdN_',

    // Existing WordPress user this backend will attribute new posts to
    // (ID 14 = "powerqtestandtag" in the live database).
    'DEFAULT_AUTHOR_ID' => 14,

    // Password required to publish a new post via admin.php / create_post.php.
    // Change this to something only you know before deploying.
    'ADMIN_PASSWORD' => 'change-me',

    // Public site URL, used to build post permalinks/guids.
    'SITE_URL' => 'https://www.powerq.com.au',
];
