import { CommonEntity } from "./common.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./category.entity";
import { Review } from "./review.entity";
import { OrderProduct } from "./order-products.entity";
import { Order } from "./order.entity";

@Entity('products')
export class Product extends CommonEntity {

  @Column({type: 'text', nullable:false})
  title?:string;

  @Column({type: 'text', nullable:false})
  description?:string;

  @Column({type: 'numeric', nullable:false})
  price?:number;

  @Column({type: 'numeric', nullable:false})
  stock?:number;

  @Column({type: 'float', nullable:false})
  discountPercentage?:number;

  @Column({type: 'float', nullable:true})
  rating?:number;

  @Column({type: 'text', nullable:true})
  brand?:string;

  @Column({type: 'numeric', nullable:false, default: 1})
  minOrderQuantity?:number;

  @Column({type: 'uuid', nullable:false})
  categoryId?:string;

  @ManyToOne(()=> Category, (category)=> category.products)
  @JoinColumn({name: 'categoryId'})
  category?:Category;

  @OneToMany(()=> Review, (review)=> review.product)
  reviews?:Review[];

  @OneToMany(()=> OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts?:OrderProduct[];

  @ManyToMany(()=> Order, (order)=> order.products)
  orders?:Order[]
}