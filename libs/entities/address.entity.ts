import { CommonEntity } from "./common.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { City } from "./city.entity";
import { User } from "./user.entity";
import { Order } from "./order.entity";

@Entity("addresses")
export class Address extends CommonEntity {

  @Column({type: 'text',nullable: false})
  lane?:string;

  @Column({type: 'text',nullable: true})
  landmark?:string;

  @Column({type: 'boolean', default: false})
  isDefault?:boolean;

  @ManyToOne(()=> User, (user)=> user.addresses)
  user?: User;

  @ManyToOne(()=> City, (city)=> city.addresses)
  city?:City;

  @OneToMany(()=> Order, (order)=> order.address)
  orders?:Order[];
}