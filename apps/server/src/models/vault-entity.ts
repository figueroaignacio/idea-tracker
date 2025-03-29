import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user-entity";
import { VaultField } from "./vault-field-entity";
import { VaultRecord } from "./vault-record-entity";

@Entity()
export class Vault {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.vaults, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => VaultField, (field) => field.vault, { cascade: true })
  fields: VaultField[];

  @OneToMany(() => VaultRecord, (record) => record.vault, { cascade: true })
  records: VaultRecord[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
