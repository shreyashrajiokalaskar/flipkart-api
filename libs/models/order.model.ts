"use strict";

import { CommonEntity } from "./common.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.model";
import { Product } from "./product.model";
import { OrderProduct } from "./order-products.model";
import { Address } from "./address.model";
import { Payment } from "./payment.model";

@Entity('orders')
export class Order extends CommonEntity {

  @Column({type: 'uuid', nullable:false})
  userId?: string;

  @Column({type: 'uuid', nullable:false})
  productId?: string;

  @Column({type: 'uuid', nullable:false})
  addressId?: string;

  @Column({type: 'numeric', nullable:false})
  quantity?:number;

  @Column({type: 'float', nullable:false})
  price?:number;

  @ManyToOne(()=> Address, (address)=> address.orders)
  @JoinColumn({name: 'addressId'})
  address?:Address;
  
  @ManyToOne(()=> User, (user) => user.orders)
  user?:User;

  @ManyToMany(()=> Product, (product)=> product.orders)
  @JoinTable({
    name: 'orderProducts',
    joinColumn: { name: 'orderId', referencedColumnName: 'id'},
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id'}
  })
  products?:Product[]

  @OneToMany(()=> OrderProduct,(orderProduct)=> orderProduct.product)
  orderProducts?:OrderProduct[];

  @OneToMany(()=> Payment, (payment)=> payment.order)
  payment?: Payment;

}