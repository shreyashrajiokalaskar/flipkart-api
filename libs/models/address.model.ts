import { CommonEntity } from "./common.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { City } from "./city.model";
import { User } from "./user.model";
import { Order } from "./order.model";

@Entity("addresses")
export class Address extends CommonEntity {

  @Column({type: 'text',nullable: false})
  lane?:string;

  @Column({type: 'text',nullable: true})
  landmark?:string;

  @ManyToOne(()=> User, (user)=> user.addresses)
  user?: User;

  @ManyToOne(()=> City, (city)=> city.addresses)
  city?:City;

  @OneToMany(()=> Order, (order)=> order.address)
  orders?:Order[];
}