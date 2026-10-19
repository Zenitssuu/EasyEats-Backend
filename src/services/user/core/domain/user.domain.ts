
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

export interface UpdateUserInput {
    name?: string;
    password?: string;
    currentPassword?: string;
    profileImage?: string | null;
    phoneNumber?: string | null;
}

export type UserUpdateData = Omit<UpdateUserInput, "currentPassword">;

