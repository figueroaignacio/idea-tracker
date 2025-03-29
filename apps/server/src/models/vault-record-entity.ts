import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vault } from "./vault-entity";
import { VaultField } from "./vault-field-entity";

@Entity()
export class VaultRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("json")
  data: Record<string, any>;

  @ManyToOne(() => Vault, (vault) => vault.records)
  vault: Vault;

  @ManyToOne(() => VaultField, (field) => field.records)
  field: VaultField;
}
