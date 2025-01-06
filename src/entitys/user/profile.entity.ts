import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("userProfile")
export class UserProfileEntity {
    @PrimaryColumn("uuid")
    profileId: string;

    @Column("uuid")
    userId: string;

    @Column({ nullable: true })
    profileImageOne: string;

    @Column({ nullable: true })
    profileImageTwo: string;

    @Column({ nullable: true })
    profileImageThree: string;

    @Column({ nullable: true })
    userDesc: string;

    @Column({ nullable: true })
    tags: string;

    @Column({ nullable: true })
    mbti: string;

    @Column({ nullable: true })
    smoking: string;

    @Column({ nullable: true })
    drinking: string;

    @ManyToOne(() => UserEntity, (users) => users.userId)
    @JoinColumn({ name: "userId" })
    users: UserEntity;
}