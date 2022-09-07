import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Bio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  fullname: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ unique: true })
  phoneNumber: string;

  @OneToOne(() => User, (user) => user.bio)
  @JoinColumn()
  user: User;
}
