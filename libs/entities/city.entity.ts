import { CommonEntity } from "./common.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";

@Entity("cities")
export class City extends CommonEntity {

  @Column({type: 'integer', nullable: false})
  @Index()
  pincode?:number;

  @Column({type: 'varchar', nullable: false})
  name?:string;

  @Column({type: 'varchar', nullable: false})
  district?:string;

  @Column({type: 'varchar', nullable: false})
  state?:string;

  @OneToMany(()=> Address, (address)=> address.city)
  addresses?: Address[]
}