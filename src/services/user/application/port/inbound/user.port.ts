import type {CreateUserInput, UpdateUserInput, User} from "../../../core/domain/user.domain"

export interface UserServicePort{
    getUser(id:string): Promise<User | null>;
    getUserByEmail(email:string): Promise<User | null>;
    create(input: CreateUserInput):Promise<User>;
    update(id:string, input: UpdateUserInput, editorId:string):Promise<User|null>;
    delete(id:string): Promise<void>;

}