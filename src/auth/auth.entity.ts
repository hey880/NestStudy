import { BaseEntity, Column, Entity } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @Column()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}