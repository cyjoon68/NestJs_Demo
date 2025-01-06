import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class UserEntity {
    @PrimaryColumn("uuid")
    userId: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    currentRefreshToken: string;

    @Column({ nullable: true })
    currentRefreshTokenExp: Date;
}