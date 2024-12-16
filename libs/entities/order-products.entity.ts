"use strict";

import { CommonEntity } from "./common.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Product } from "./product.entity";
import { Order } from "./order.entity";
import { ORDER_STATUS } from "../shared/common.enum";

@Entity('orderProducts')
export class OrderProduct extends CommonEntity {

  @Column({type:'uuid', nullable:false})
  orderId?:string;

  @Column({type:'uuid', nullable:false})
  productId?:string;

  @Column({type: 'numeric', nullable:false})
  quantity?:number;

  @Column({type: 'float', nullable:false})
  price?:number;

  @Column({
    type: 'enum',
    enum: Object.keys(ORDER_STATUS),
    default: ORDER_STATUS.PLACED
  })
  status?:ORDER_STATUS;

  @ManyToOne(()=> Product, (product)=> product.orderProducts)
  @JoinColumn({name: 'productId'})
  product?:Product

  @ManyToOne(()=> Order, (order)=> order.orderProducts)
  @JoinColumn({name: 'orderId'})
  order?:Order
}