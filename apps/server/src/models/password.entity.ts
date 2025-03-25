import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  website: string;

  @Column()
  provider: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ default: false })
  isFavorite: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.passwords)
  user: User;
}
