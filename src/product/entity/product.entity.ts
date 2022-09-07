import { Shopping_records } from 'src/cart/entity/shops.records.entity';

import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(
    () => Shopping_records,
    (shopping_record) => shopping_record.product,
  )
  public shopping_record: Shopping_records[];
}
