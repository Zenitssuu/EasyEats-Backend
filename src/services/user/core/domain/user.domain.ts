
export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  profileImage: string | null;
  phoneNumber: string | null;
}

export interface CreateUserInput{
    name:string,
    email:string,
    password:string,
    profileImage:string | null,
    phoneNumber:string | null
}

export type UpdateUserInput = Partial<
    Pick<CreateUserInput,"name"|"password"|"profileImage"|"phoneNumber">
>;

export interface UserRepo{
    findById(id:string): Promise<User | null>;
    findByEmail(email:string): Promise<User | null>;
    create(input: CreateUserInput, editorId?: string | null): Promise<User>;
    update(id:string, input: UpdateUserInput, editorId: string): Promise<User | null>;
    delete(id:string): Promise<void>;
}
