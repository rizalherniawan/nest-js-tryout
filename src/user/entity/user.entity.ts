import { Shopping_records } from 'src/cart/entity/shops.records.entity';

import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bio } from './bio.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Bio, (bio) => bio.user)
  bio: Bio;

  @OneToMany(() => Shopping_records, (shopping_record) => shopping_record.user)
  public shopping_record: Shopping_records[];
}
