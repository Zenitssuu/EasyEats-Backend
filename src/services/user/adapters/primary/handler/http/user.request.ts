import { t, type Static } from "elysia";

export const createUserRequestSchema = t.Object({
	name: t.String({ minLength: 1, maxLength: 30 }),
	email: t.String({ format: "email", maxLength: 100 }),
	password: t.String({ minLength: 8 }),
	profileImage: t.Optional(t.Nullable(t.String())),
	phoneNumber: t.Optional(t.Nullable(t.String({ maxLength: 12 }))),
});

export type CreateUserRequest = Static<typeof createUserRequestSchema>;
