-- Schema for the PowerQ backend's own database (no WordPress tables/prefix).
-- Safe to run more than once (CREATE TABLE IF NOT EXISTS). Run this once to
-- bootstrap a new database; future schema changes get appended below as new
-- statements rather than replacing what's already here.

CREATE TABLE IF NOT EXISTS posts (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content_html LONGTEXT NOT NULL,
  image_url VARCHAR(500) DEFAULT '',
  author_name VARCHAR(150) NOT NULL DEFAULT 'PowerQ Team',
  status VARCHAR(20) NOT NULL DEFAULT 'publish',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS quote_requests (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service VARCHAR(150) DEFAULT '',
  message VARCHAR(500) DEFAULT '',
  source_page VARCHAR(50) DEFAULT '',
  email_sent TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
