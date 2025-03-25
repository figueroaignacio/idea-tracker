import * as crypto from "crypto";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Password } from "../models/password.entity";
import { User } from "../models/user.entity";

interface PasswordCreateDTO {
  provider: string;
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
    try {
      const key = crypto.scryptSync(
        process.env.ENCRYPTION_KEY || "default-secret-key",
        "salt",
        32
      );

      const iv = crypto.randomBytes(16);

      const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

      let encrypted = cipher.update(text, "utf8", "hex");
      encrypted += cipher.final("hex");

      return iv.toString("hex") + ":" + encrypted;
    } catch (error) {
      console.error("Encryption Error:", error);
      throw new Error("Encryption failed");
    }
  }

  private decrypt(encryptedText: string): string {
    try {
      const [ivHex, encrypted] = encryptedText.split(":");

      const key = crypto.scryptSync(
        process.env.ENCRYPTION_KEY || "default-secret-key",
        "salt",
        32
      );

      const iv = Buffer.from(ivHex, "hex");

      const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

      let decrypted = decipher.update(encrypted, "hex", "utf8");
      decrypted += decipher.final("utf8");

      return decrypted;
    } catch (error) {
      console.error("Decryption Error:", error);
      throw new Error("Decryption failed");
    }
  }

  async createPassword(passwordData: PasswordCreateDTO): Promise<Password> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: passwordData.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const password = this.passwordRepository.create({
        provider: passwordData.provider,
        title: passwordData.title,
        username: passwordData.username,
        password: this.encrypt(passwordData.password),
        website: passwordData.website,
        notes: passwordData.notes,
        user: user,
      });

      return await this.passwordRepository.save(password);
    } catch (error) {
      console.error("Create Password Error:", error);
      throw error;
    }
  }

  async getAllUserPasswords(userId: number): Promise<Password[]> {
    const passwords = await this.passwordRepository.find({
      where: { user: { id: userId } },
      order: { updatedAt: "DESC" },
    });

    return passwords.map((password) => ({
      ...password,
      password: this.decrypt(password.password),
    }));
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
