import { Elysia } from "elysia";
import { UserHandler } from "./user.handler";
import { createUserRequestSchema } from "./user.request";
import { userResponseSchema } from "./user.response";

export function createUserRoutes(handler: UserHandler) {
	return new Elysia({ prefix: "/users" }).post(
		"/",
		({ body, set }) => {
			set.status = 201;
			return handler.createUser(body);
		},
		{
			body: createUserRequestSchema,
			response: { 201: userResponseSchema },
		},
	);
}
