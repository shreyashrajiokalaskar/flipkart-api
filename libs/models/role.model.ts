import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { CommonEntity } from "./common.entity";

@Entity("roles")
export class Role extends CommonEntity{

  @Column({type: 'string', nullable: false})
  name?:string;

  @OneToMany(()=> User, (user)=> user.roleId)
  users?:User[];
}