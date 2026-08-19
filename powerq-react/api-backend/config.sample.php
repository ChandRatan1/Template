<?php
// Copy this file to config.php and fill in the real values.
// config.php is gitignored — never commit real credentials.

return [
    'DB_HOST' => '',              // usually 'localhost' on Hostinger
    'DB_NAME' => '',
    'DB_USER' => '',
    'DB_PASSWORD' => '',

    // Password required to publish a post, view quote requests, or edit
    // robots.txt via admin.php.
    'ADMIN_PASSWORD' => 'change-me',

    // Public site URL, used to build sitemap.xml links.
    'SITE_URL' => 'https://www.powerq.com.au',

    // Where quote-form submissions get emailed.
    'QUOTE_EMAIL_TO' => 'info@powerq.com.au',
    'QUOTE_EMAIL_CC' => [],
];
