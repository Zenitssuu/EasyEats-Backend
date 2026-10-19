import { DrizzleUserRepository } from "../adapters/secondary/repository/user.repository";
import { UserService } from "../core/services/user.service";
import { createUserDatabase } from "./database/user-database";

export function createUserContainer(databaseUrl: string) {
	const { pool, db } = createUserDatabase(databaseUrl);
	const userRepository = new DrizzleUserRepository(db);
	const userService = new UserService(userRepository);

	return {
		userService,
		close: () => pool.end(),
	};
}
