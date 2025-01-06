import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("userMem")
export class UserMemEntity {
    @PrimaryColumn("uuid")
    userId: string;

    @Column({ nullable: true })
    memType: string;

    @Column({ nullable: true })
    memStartDate: Date;

    @Column({ nullable: true })
    memEndDate: Date;

    @CreateDateColumn()
    createdMemAt: Date;

    @UpdateDateColumn()
    updatedMemAt: Date;

    @ManyToOne(() => UserEntity, (users) => users.userId)
    @JoinColumn({ name: "userId" })
    users: UserEntity;
}
