import * as crypto from "crypto";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Password } from "../models/password.entity";

interface PasswordCreateDTO {
  title: string;
  username: string;
  password: string;
  website?: string;
  notes?: string;
  userId: number;
}

interface PasswordUpdateDTO {
  title?: string;
  username?: string;
  password?: string;
  website?: string;
  notes?: string;
  isFavorite?: boolean;
}

export class PasswordService {
  private passwordRepository: Repository<Password>;
  private encryptionKey: Buffer;
  private iv: Buffer;

  constructor() {
    this.passwordRepository = AppDataSource.getRepository(Password);
    this.encryptionKey = Buffer.from(
      process.env.ENCRYPTION_KEY || "0123456789abcdef0123456789abcdef",
      "hex"
    );
    this.iv = Buffer.from(
      process.env.ENCRYPTION_IV || "0123456789abcdef",
      "hex"
    );
  }

  private encrypt(text: string): string {
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      this.encryptionKey,
      this.iv
    );
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  private decrypt(encrypted: string): string {
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      this.encryptionKey,
      this.iv
    );
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  async createPassword(passwordData: PasswordCreateDTO): Promise<Password> {
    const password = this.passwordRepository.create({
      title: passwordData.title,
      username: passwordData.username,
      password: this.encrypt(passwordData.password),
      website: passwordData.website,
      notes: passwordData.notes,
      user: { id: passwordData.userId },
    });

    return await this.passwordRepository.save(password);
  }

  async getAllUserPasswords(userId: number): Promise<Password[]> {
    return await this.passwordRepository.find({
      where: { user: { id: userId } },
      order: { updatedAt: "DESC" },
    });
  }

  async getPasswordById(id: number, userId: number): Promise<Password | null> {
    const password = await this.passwordRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (password) {
      password.password = this.decrypt(password.password);
    }

    return password;
  }

  async updatePassword(
    id: number,
    userId: number,
    data: PasswordUpdateDTO
  ): Promise<Password | null> {
    const password = await this.passwordRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!password) {
      return null;
    }

    if (data.password) {
      data.password = this.encrypt(data.password);
    }

    Object.assign(password, data);
    return await this.passwordRepository.save(password);
  }

  async deletePassword(id: number, userId: number): Promise<boolean> {
    const result = await this.passwordRepository.delete({
      id,
      user: { id: userId },
    });
    return (result.affected ?? 0) > 0;
  }

  async generateRandomPassword(length = 16): Promise<string> {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    const randomBytes = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
      const randomIndex = randomBytes[i] % charset.length;
      password += charset[randomIndex];
    }

    return password;
  }
}
