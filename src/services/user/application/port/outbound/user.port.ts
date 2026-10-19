import type { CreateUserInput, User, UserUpdateData } from "../../../core/domain/user.domain";


export interface UserPersistencePort{
    findById(id:string): Promise<User | null>;
    findByEmail(email: string): Promise<User|null>;
    findCredentialsById(id: string): Promise<{ passwordHash: string | null } | null>;
    create(input: CreateUserInput, editorId?: string | null): Promise<User>;
    update(id:string,input:UserUpdateData,editorId:string):Promise<User|null>;
    delete(id:string): Promise<void>;

}
