-- migrate:up
ALTER TABLE users RENAME COLUMN profileimage TO "profileImage";
ALTER TABLE users RENAME COLUMN phonenumber TO "phoneNumber";
ALTER TABLE user_address RENAME COLUMN userid TO "userId";
ALTER TABLE users
    ADD COLUMN "createdAt" timestamptz NOT NULL DEFAULT now(),
    ADD COLUMN "updatedAt" timestamptz NOT NULL DEFAULT now(),
    ADD COLUMN "createdBy" uuid REFERENCES users(id) ON DELETE SET NULL,
    ADD COLUMN "updatedBy" uuid REFERENCES users(id) ON DELETE SET NULL;

-- migrate:down
ALTER TABLE users
    DROP COLUMN "updatedBy",
    DROP COLUMN "createdBy",
    DROP COLUMN "updatedAt",
    DROP COLUMN "createdAt";
ALTER TABLE user_address RENAME COLUMN "userId" TO userid;
ALTER TABLE users RENAME COLUMN "phoneNumber" TO phonenumber;
ALTER TABLE users RENAME COLUMN "profileImage" TO profileimage;
