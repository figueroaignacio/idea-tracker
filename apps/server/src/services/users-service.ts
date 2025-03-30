import { Repository } from "typeorm";
import { CreateUserDTO } from "../dtos/user-dto";
import { User } from "../entities/user-entity";

export class UsersService {
  private userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  async createUser(userData: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOrCreateUser(userData: CreateUserDTO): Promise<User> {
    let user = await this.findUserByEmail(userData.email || "");

    if (!user) {
      user = await this.createUser(userData);
    }

    return user;
  }
}
