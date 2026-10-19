import { t } from "elysia";

export const userResponseSchema = t.Object({
	id: t.String({ format: "uuid" }),
	name: t.Nullable(t.String()),
	email: t.Nullable(t.String()),
	role: t.Union([t.Literal("user"), t.Literal("admin")]),
	profileImage: t.Nullable(t.String()),
	phoneNumber: t.Nullable(t.String()),
});
