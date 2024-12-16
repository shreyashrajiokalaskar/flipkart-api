import { CommonEntity } from "./common.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.model";

@Entity("cities")
export class City extends CommonEntity {

  @Column({type: 'number', nullable: false})
  pincode?:number;

  @Column({type: 'string', nullable: false})
  name?:string;

  @Column({type: 'string', nullable: false})
  district?:string;

  @Column({type: 'string', nullable: false})
  state?:string;

  @OneToMany(()=> Address, (address)=> address.city)
  addresses?: Address[]
}