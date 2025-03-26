import { CreateUserDTO } from "../dtos/user-dto";
import { User } from "../models/user-entity";
import { UserRepository } from "../repositories/user-repository";

export class UsersService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findUserById(id);
  }

  async findUserByProviderId(
    providerId: string,
    provider: string
  ): Promise<User | null> {
    return await this.userRepository.findUserByProviderId(providerId, provider);
  }

  async findOrCreateUser(userData: CreateUserDTO): Promise<User> {
    return await this.userRepository.findOrCreateUser(userData);
  }
}
