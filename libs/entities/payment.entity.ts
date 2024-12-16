"use strict";

import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PAYMENT_METHODS, PAYMENT_STATUS } from "../shared/common.enum";
import { CommonEntity } from "./common.entity";
import { Order } from "./order.entity";

@Entity('payments')
export class Payment extends CommonEntity {

  @Column({type: 'varchar', enum: PAYMENT_METHODS, nullable:false})
  method?:PAYMENT_METHODS;

  @Column({type: 'varchar', enum: PAYMENT_STATUS, nullable:false})
  status?:PAYMENT_STATUS;

  @Column({type: 'uuid', nullable:false})
  transactionId?:string;

  @Column({type: 'varchar', nullable:false})
  gateway?:string;

  @Column({type: 'float', nullable:false})
  amount?:number;

  @Column({type: 'uuid', nullable:false})
  orderId?:string;

  @ManyToOne(()=> Order, (order)=> order.payment)
  @JoinColumn({name:"orderId"})
  order?: Order;
}