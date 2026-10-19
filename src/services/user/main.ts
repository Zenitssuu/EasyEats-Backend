import { UserHttpServer } from "./infrastructure/http/http-server";
import { createUserContainer } from "./infrastructure/container";

const databaseUrl = Bun.env.DATABASE_URL;
if (!databaseUrl) {
	throw new Error("DATABASE_URL is required to start the user service");
}

const port = Number(Bun.env.USER_PORT ?? 3000);
const container = createUserContainer(databaseUrl);
const server = new UserHttpServer(container.userService, container.close);
server.start(port);
