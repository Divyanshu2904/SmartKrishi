CREATE TABLE IF NOT EXISTS users (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    phone      VARCHAR(15) UNIQUE NOT NULL,
    password   TEXT NOT NULL,
    language   VARCHAR(10) DEFAULT 'hi',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS crop_history (
    id             SERIAL PRIMARY KEY,
    user_id        INTEGER REFERENCES users(id) ON DELETE CASCADE,
    soil_type      VARCHAR(50),
    crop_name      VARCHAR(100),
    recommendation TEXT,
    weather        JSONB,
    created_at     TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS image_history (
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
    image_name VARCHAR(255),
    image_path TEXT,
    disease    VARCHAR(200),
    confidence FLOAT,
    solution   JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS market_history (
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
    crop_name  VARCHAR(100),
    market     VARCHAR(100),
    price      INTEGER,
    trend      VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

SELECT table_name FROM information_schema.tables WHERE table_schema='public';