import { CommonEntity } from "./common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Product } from "./product.model";


@Entity('categories')
export class Category extends CommonEntity {
  
  @Column({type:'string', nullable:false})
  slug?:string;

  @Column({type:'string', nullable:false})
  name?:string;

  @OneToMany(()=> Product, (product) => product.category)
  products?:Product[];
}