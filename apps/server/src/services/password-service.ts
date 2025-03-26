import * as crypto from "crypto";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { PasswordCreateDTO, PasswordUpdateDTO } from "../dtos/password-dto";
import { Password } from "../models/password-entity";
import { User } from "../models/user-entity";
import { PasswordRepository } from "../repositories/password-repository";
import { decrypt, encrypt } from "../utils/crypto-utils";

export class PasswordService {
  private encryptionKey: Buffer;
  private passwordRepository: PasswordRepository;
  private userRepository: Repository<User>;

  constructor(passwordRepository: PasswordRepository) {
    this.encryptionKey = Buffer.from(
      process.env.ENCRYPTION_KEY || "0123456789abcdef0123456789abcdef",
      "hex"
    );
    this.passwordRepository = passwordRepository;
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createPassword(passwordData: PasswordCreateDTO): Promise<Password> {
    const user = await this.userRepository.findOne({
      where: { id: passwordData.userId },
    });

    if (!user) throw new Error("User not found");

    const encryptedPassword = encrypt(passwordData.password);
    return await this.passwordRepository.create(
      { ...passwordData, password: encryptedPassword },
      user
    );
  }

  async getAllUserPasswords(userId: number): Promise<Password[]> {
    const passwords = await this.passwordRepository.findAllByUserId(userId);
    return passwords.map((password) => ({
      ...password,
      password: decrypt(password.password),
    }));
  }

  async getPasswordById(id: number, userId: number): Promise<Password | null> {
    const password = await this.passwordRepository.findById(id, userId);
    if (password) password.password = decrypt(password.password);
    return password;
  }

  async updatePassword(
    id: number,
    userId: number,
    data: PasswordUpdateDTO
  ): Promise<Password | null> {
    if (data.password) {
      data.password = encrypt(data.password);
    }
    return await this.passwordRepository.update(id, userId, data);
  }

  async deletePassword(id: number, userId: number): Promise<boolean> {
    return await this.passwordRepository.delete(id, userId);
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
