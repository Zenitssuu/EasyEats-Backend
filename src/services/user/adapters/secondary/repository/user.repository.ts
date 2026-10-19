import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import type { CreateUserInput, User, UserUpdateData } from "../../../core/domain/user.domain";
import { users } from "../postgres/user.schema";
import type * as schema from "../postgres/user.schema"
import type {UserPersistencePort} from "../../../application/port/outbound/user.port"

type Database = NodePgDatabase<typeof schema>

export class DrizzleUserRepository implements UserPersistencePort{
    constructor(private db: Database){}

    private toDomainObject(row: typeof users.$inferSelect): User{
        const {
            password: _password,
            createdAt: _createdAt,
            updatedAt: _updatedAt,
            createdBy: _createdBy,
            updatedBy: _updatedBy,
            ...user
        } = row;
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const [row] = await this.db
            .select()
            .from(users)
            .where(eq(users.id,id))
            .limit(1);

        return row ? this.toDomainObject(row) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const [row] = await this.db
            .select()
            .from(users)
            .where(eq(users.email,email))
            .limit(1);

        return row ? this.toDomainObject(row) : null;
    }

    async findCredentialsById(id: string): Promise<{ passwordHash: string | null } | null> {
        const [row] = await this.db
            .select({ passwordHash: users.password })
            .from(users)
            .where(eq(users.id, id))
            .limit(1);

        return row ?? null;
    }

    async create(input: CreateUserInput, editorId: string | null = null): Promise<User> {

        const [row] = await this.db
            .insert(users)
            .values({
                name:input.name,
                email:input.email,
                password:input.password,
                profileImage: input.profileImage ?? null,
                phoneNumber: input.phoneNumber ?? null,
                createdBy: editorId,
                updatedBy: editorId,
            })
            .returning();


        if(!row){
            throw new Error("Unable to add user, please try again after few seconds");
        }


        //removing passowrd
        return this.toDomainObject(row);
    }

    async update(id: string, input: UserUpdateData, editorId: string): Promise<User | null> {
        const changes: Partial<typeof users.$inferInsert> = {};
        if (input.name !== undefined) changes.name = input.name;
        if (input.password !== undefined) changes.password = input.password;
        if (input.profileImage !== undefined) changes.profileImage = input.profileImage;
        if (input.phoneNumber !== undefined) changes.phoneNumber = input.phoneNumber;

        if (Object.keys(changes).length === 0) {
            return this.findById(id);
        }

        changes.updatedAt = new Date();
        changes.updatedBy = editorId;

        const [row] = await this.db
        .update(users)
        .set(changes)
        .where(eq(users.id, id))
        .returning();

        return row ? this.toDomainObject(row) : null;
    }

    async delete(id: string): Promise<void> {
        await this.db
        .delete(users)
        .where(eq(users.id,id));
    }
}
