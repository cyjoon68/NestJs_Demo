import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user/user.entity";

@Entity("post")
export class PostEntity {
    @ManyToOne(() => UserEntity, (users) => users.userId)
    @JoinColumn({ name: "userId" })
    users: UserEntity;
    
    @PrimaryGeneratedColumn("uuid")
    postId: string;

    @Column({ length: 50 })
    title: string;

    @Column({ length: 300 })
    text: string;

    @CreateDateColumn()
    createdAt: Date;
}