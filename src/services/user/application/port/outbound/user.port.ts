import type { CreateUserInput, UpdateUserInput, User } from "../../../core/domain/user.domain";


export interface UserPersistencePort{
    findById(id:string): Promise<User | null>;
    findByEmail(email: string): Promise<User|null>;
    create(input: CreateUserInput, editorId?: string | null): Promise<User>;
    update(id:string,input:UpdateUserInput,editorId:string):Promise<User|null>;
    delete(id:string): Promise<void>;

}