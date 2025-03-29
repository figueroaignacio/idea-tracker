import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Password } from "../models/password-entity";
import { User } from "../models/user-entity";
import { Vault } from "../models/vault-entity";
import { VaultField } from "../models/vault-field-entity";
import { VaultRecord } from "../models/vault-record-entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV !== "production",
  entities: [User, Password, Vault, VaultField, VaultRecord],
  subscribers: [],
  migrations: ["src/migrations/*.ts"],
});
