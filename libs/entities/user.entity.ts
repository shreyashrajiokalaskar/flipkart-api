
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CommonEntity } from "./common.entity";
import { Role } from "./role.entity";
import { Address } from "./address.entity";
import { Review } from "./review.entity";
import { Order } from "./order.entity";


@Entity("users")
export class User extends CommonEntity {

  @Column({type:'varchar', nullable: false})
  firstName?:string;

  @Column({type:'varchar', nullable: false})
  lastName?:string;

  @Column({type: 'varchar', nullable:false, unique:true})
  email?:string;

  @Column({type:'varchar', nullable: false})
  password?:string;

  @Column({type:'varchar', nullable: true})
  resetToken?:string;

  @Column({type:'bigint', nullable: true})
  resetTokenExpiry?:number;

  @Column({type: 'uuid', nullable:false})
  roleId?:string;

  @Column({ type: 'bigint', nullable: true, unique: true })
  phone?:number;

  @ManyToOne(()=> Role, (role:Role) => role.users)
  @JoinColumn({name: 'roleId'})
  role?:Role;

  @OneToMany(()=> Address, (address)=> address.user)
  addresses?: Address[]

  @OneToMany(()=> Review, (review)=> review.reviewer)
  reviews?: Review[]

  @OneToMany(()=> Order, (order)=> order.user)
  orders?: Order[]
}