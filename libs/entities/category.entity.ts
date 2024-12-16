import { CommonEntity } from "./common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Product } from "./product.entity";


@Entity('categories')
export class Category extends CommonEntity {
  
  @Column({type:'varchar', nullable:false})
  slug?:string;

  @Column({type:'varchar', nullable:false})
  name?:string;

  @OneToMany(()=> Product, (product) => product.category)
  products?:Product[];
}