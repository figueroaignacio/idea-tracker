import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { User } from "../models/user-entity";
import { Vault } from "../models/vault-entity";
import { VaultField } from "../models/vault-field-entity";
import { VaultRecord } from "../models/vault-record-entity";

export class VaultService {
  private vaultRepository: Repository<Vault>;
  private userRepository: Repository<User>;
  private vaultFieldRepository: Repository<VaultField>;
  private vaultRecordRepository: Repository<VaultRecord>;

  constructor() {
    this.vaultRepository = AppDataSource.getRepository(Vault);
    this.vaultFieldRepository = AppDataSource.getRepository(VaultField);
    this.vaultRecordRepository = AppDataSource.getRepository(VaultRecord);
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createVault(userId: number, name: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    const vault = this.vaultRepository.create({ name, user });
    await this.vaultRepository.save(vault);
    return vault;
  }

  async getVaultById(vaultId: number) {
    return await this.vaultRepository.findOne({
      where: { id: vaultId },
      relations: ["fields", "records", "records.field"],
    });
  }

  async getVaults(userId: number) {
    return await this.vaultRepository.find({
      where: { user: { id: userId } },
      relations: ["fields", "records", "records.field"],
    });
  }

  async addFieldToVault(
    vaultId: number,
    name: string,
    type: "text" | "number" | "date" | "boolean" | "password"
  ) {
    const vault = await this.vaultRepository.findOne({
      where: { id: vaultId },
      relations: ["fields"],
    });

    if (!vault) throw new Error("Vault not found");

    const field = this.vaultFieldRepository.create({ name, type, vault });
    await this.vaultFieldRepository.save(field);

    return field;
  }

  async createVaultRecord(vaultId: number, recordData: Record<string, any>) {
    const vault = await this.vaultRepository.findOne({
      where: { id: vaultId },
      relations: ["fields", "records"],
    });

    if (!vault) throw new Error("Vault not found");
    if (!vault.fields || vault.fields.length === 0)
      throw new Error("Vault has no fields");

    const records = [];

    for (const field of vault.fields) {
      const value = recordData[field.name];

      if (value !== undefined) {
        const record = this.vaultRecordRepository.create({
          field,
          vault,
          data: { value },
        });

        await this.vaultRecordRepository.save(record);
        records.push(record);
      }
    }

    return records;
  }
}
