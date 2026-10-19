import * as argon2 from "argon2";
import type { UserServicePort } from "../../application/port/inbound/user.port";
import type { UserPersistencePort } from "../../application/port/outbound/user.port";
import type {
	CreateUserInput,
	UpdateUserInput,
	User,
} from "../domain/user.domain";

export class UserService implements UserServicePort {
	constructor(
		private readonly users: UserPersistencePort,
	) {}

	getUser(id: string): Promise<User | null> {
		return this.users.findById(id);
	}

	getUserByEmail(email: string): Promise<User | null> {
		return this.users.findByEmail(email);
	}

	async create(input: CreateUserInput): Promise<User> {
		const hashedPassword = await this.hashPassword(input.password);

		return this.users.create(
			{ ...input, password: hashedPassword },
			null,
		);
	}

	async update(
		id: string,
		input: UpdateUserInput,
		editorId: string,
	): Promise<User | null> {
		const { currentPassword, ...changes } = input;

		if (input.password !== undefined) {
			if (!currentPassword) {
				throw new Error("Current password is required to change password");
			}

			const credentials = await this.users.findCredentialsById(id);
			if (!credentials) return null;

			if (
				!credentials.passwordHash ||
				!(await argon2.verify(credentials.passwordHash, currentPassword))
			) {
				throw new Error("Current password is incorrect");
			}

			changes.password = await this.hashPassword(input.password);
		}

		return this.users.update(id, changes, editorId);
	}

	delete(id: string): Promise<void> {
		return this.users.delete(id);
	}

	private hashPassword(password: string): Promise<string> {
		// argon2.hash uses Argon2id by default and stores the parameters with the hash.
		return argon2.hash(password);
	}
}
