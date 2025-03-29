import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vault } from "./vault-entity";
import { VaultRecord } from "./vault-record-entity";

@Entity()
export class VaultField {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  type: "text" | "number" | "date" | "boolean" | "password";

  @ManyToOne(() => Vault, (vault) => vault.fields, { onDelete: "CASCADE" })
  vault: Vault;

  @OneToMany(() => VaultRecord, (record) => record.field)
  records: VaultRecord[];
}
