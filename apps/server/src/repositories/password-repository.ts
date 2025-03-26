import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Password } from "../models/password-entity";
import { User } from "../models/user-entity";

export class PasswordRepository {
  private passwordRepository: Repository<Password>;

  constructor() {
    this.passwordRepository = AppDataSource.getRepository(Password);
  }

  async create(passwordData: Partial<Password>, user: User): Promise<Password> {
    const password = this.passwordRepository.create({
      ...passwordData,
      user,
    });
    return await this.passwordRepository.save(password);
  }

  async findAllByUserId(userId: number): Promise<Password[]> {
    return await this.passwordRepository.find({
      where: { user: { id: userId } },
      order: { updatedAt: "DESC" },
    });
  }

  async findById(id: number, userId: number): Promise<Password | null> {
    return await this.passwordRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  async update(
    id: number,
    userId: number,
    data: Partial<Password>
  ): Promise<Password | null> {
    const password = await this.findById(id, userId);
    if (!password) return null;

    Object.assign(password, data);
    return await this.passwordRepository.save(password);
  }

  async delete(id: number, userId: number): Promise<boolean> {
    const result = await this.passwordRepository.delete({
      id,
      user: { id: userId },
    });
    return (result.affected ?? 0) > 0;
  }
}
