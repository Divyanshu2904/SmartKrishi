-- SmartKrishi Database Schema
-- Run this file once to setup all tables
-- Command: psql -U postgres -d SmartKrishi_DB -f schema.sql

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    phone       VARCHAR(15) UNIQUE NOT NULL,
    password    TEXT NOT NULL,
    language    VARCHAR(10) DEFAULT 'hi',   -- hi / en / hinglish
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Crop recommendation history
CREATE TABLE IF NOT EXISTS crop_history (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
    soil_type       VARCHAR(50),
    crop_name       VARCHAR(100),
    recommendation  TEXT,
    weather         JSONB,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Disease detection history
CREATE TABLE IF NOT EXISTS image_history (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
    image_name  VARCHAR(255),
    image_path  TEXT,
    disease     VARCHAR(200),
    confidence  FLOAT,
    solution    JSONB,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Market query history
CREATE TABLE IF NOT EXISTS market_history (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
    crop_name   VARCHAR(100),
    market      VARCHAR(100),
    price       INTEGER,
    trend       VARCHAR(20),
    created_at  TIMESTAMP DEFAULT NOW()
);
