import { Elysia } from "elysia";
import type { UserServicePort } from "../../application/port/inbound/user.port";
import { healthRoutes } from "../../adapters/primary/handler/http/health.routes";
import { createUserRoutes } from "../../adapters/primary/handler/http/user.routes";
import { UserHandler } from "../../adapters/primary/handler/http/user.handler";

function buildApp(userService: UserServicePort, onStop: () => Promise<void>) {
	const userHandler = new UserHandler(userService);
	return new Elysia()
		.use(healthRoutes)
		.use(createUserRoutes(userHandler))
		.onStop(onStop);
}

type UserElysiaApp = ReturnType<typeof buildApp>;

export class UserHttpServer {
	private readonly app: UserElysiaApp;

	constructor(
		userService: UserServicePort,
		closeDependencies: () => Promise<void>,
	) {
		this.app = buildApp(userService, closeDependencies);
	}

	start(port = 3000): void {
		this.app.listen(port);
	}
}
