import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { User } from "../models/user.entity";

interface UserCreateDTO {
  providerId: string;
  provider: string;
  email?: string;
  name?: string;
  avatar?: string;
}

export class UsersService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findUserByProviderId(
    providerId: string,
    provider: string
  ): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { providerId, provider },
    });
  }

  async findOrCreateUser(userData: UserCreateDTO): Promise<User> {
    let user = await this.findUserByProviderId(
      userData.providerId,
      userData.provider
    );

    if (!user) {
      user = this.userRepository.create({
        providerId: userData.providerId,
        provider: userData.provider,
        email: userData.email,
        name: userData.name,
        avatar: userData.avatar,
      });
      await this.userRepository.save(user);
    }

    return user;
  }
}
