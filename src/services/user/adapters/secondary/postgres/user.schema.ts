import { pgEnum, pgTable, text, timestamp, uuid, varchar, type AnyPgColumn } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["user", "admin"]);

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: varchar("name", { length: 30 }),
	email: varchar("email", { length: 100 }),
	password: text("password"),
	role: userRole("role").default("user").notNull(),
	profileImage: text("profileImage"),
	phoneNumber: varchar("phoneNumber", { length: 12 }),
	createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
	createdBy: uuid("createdBy").references((): AnyPgColumn => users.id, { onDelete: "set null" }),
	updatedBy: uuid("updatedBy").references((): AnyPgColumn => users.id, { onDelete: "set null" }),
});

export const userAddress = pgTable("user_address", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: uuid("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	city: varchar("city", { length: 30 }),
	state: varchar("state", { length: 30 }),
	address: text("address"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserAddress = typeof userAddress.$inferSelect;
export type NewUserAddress = typeof userAddress.$inferInsert;
