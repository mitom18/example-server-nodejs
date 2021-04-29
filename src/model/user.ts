import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum UserRole {
    ADMINISTRATOR = "administrator",
    USER = "user",
}

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    phone!: string;

    @Column("varchar", { length: 255 })
    role!: UserRole;
}
