"use strict";

import { CommonEntity } from "./common.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { ASSET_TYPE } from "../shared/common.enum";

@Entity('reviews')
export class Review extends CommonEntity {

  @Column({type: 'text', nullable:false})
  comment?:string;

  @Column({type: 'float', nullable: false})
  rating?:number;

  @Column({type: 'enum', enum: ASSET_TYPE, default: ASSET_TYPE.PRODUCT})
  assetType?:ASSET_TYPE;

  @Column({ type: "uuid", nullable:false })
  reviewerId?: string;

  @ManyToOne(()=> User, (user)=> user.reviews, {onDelete: "CASCADE"})
  @JoinColumn({name: "reviewerId"})
  reviewer?:User;

  // assetId - productId or sellerId
  @Column({type: 'uuid', nullable:false})
  assetId?:string;

  @ManyToOne(()=> Product, (product)=> product.reviews)
  @JoinColumn({name: 'assetId'})
  product?:Product;

  @ManyToOne(()=> User, (user)=> user.reviews)
  @JoinColumn({name: 'assetId'})
  seller?:User;
} 