import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("userInfo")
export class UserInfoEntity {
    @PrimaryColumn("uuid")
    userId: string;

    @Column()
    userName: string;

    @Column()
    yearBirth: number;

    @Column()
    gender: string;

    @Column()
    region: string;

    @Column({ nullable: true })
    education: string;

    @Column({ nullable: true })
    religion: string;

    @Column({ nullable: true })
    height: number;

    @Column({ nullable: true })
    weight: number;

    @ManyToOne(() => UserEntity, (users) => users.userId)
    @JoinColumn({ name: "userId" })
    users: UserEntity;
}
