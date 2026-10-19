import type { UserServicePort } from "../../../../application/port/inbound/user.port";
import type { User } from "../../../../core/domain/user.domain";
import type { CreateUserRequest } from "./user.request";

export class UserHandler {
	constructor(private readonly userService: UserServicePort) {}

	createUser(input: CreateUserRequest): Promise<User> {
		return this.userService.create({
			...input,
			profileImage: input.profileImage ?? null,
			phoneNumber: input.phoneNumber ?? null,
		});
	}
}
