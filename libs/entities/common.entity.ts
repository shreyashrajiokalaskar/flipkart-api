import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class CommonEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id?:string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt?:Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt?:Date;

    @Column({ type: "timestamp", nullable: true })
    deletedAt?:Date;
}