import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Show } from "./show.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })    
    email: string;

    @Column({ length: 100 })
    password: string;

    @ManyToMany(() => Show, { eager: true })
    @JoinTable()
    list: Show[]
}