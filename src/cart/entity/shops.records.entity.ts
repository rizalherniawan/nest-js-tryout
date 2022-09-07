import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Shopping_records {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public userId: number;

  @Column()
  public productId: number;

  @CreateDateColumn()
  public created_at: string;

  @UpdateDateColumn()
  public updated_at: string;

  @DeleteDateColumn()
  public deleted_at: string;

  @ManyToOne(() => User, (user) => user.shopping_record)
  public user: User;

  @ManyToOne(() => Product, (product) => product.shopping_record)
  public product: Product;
}
