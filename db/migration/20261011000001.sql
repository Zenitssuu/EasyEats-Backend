--migrate:up

DO $$
BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END
$$;

CREATE TABLE IF NOT EXISTS users (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name         varchar(30),
    email        varchar(100),
    password     text,
    role         user_role NOT NULL DEFAULT 'user',
    profileImage text,
    phoneNumber  varchar(12)
);

CREATE TABLE IF NOT EXISTS user_address (
    id      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    userId  uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    city    varchar(30),
    state   varchar(30),
    address text
);

--migrate:down
DROP TABLE IF EXISTS users
DROP TABLE IF EXISTS user_address