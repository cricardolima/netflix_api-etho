import { Repository } from "typeorm";
import { AppDataSource } from "../../configs/database/data-source";
import { User } from "../entities";
import bcrypt from "bcrypt";
import NotFoundException from "../exceptions/not-found-exception.exception";
import IntegrityException from "../exceptions/integrity.exception";

interface IUserService {
  email: string;
  password: string;
}

export class UserService {
  userRepository: Repository<User>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  private isEmailInDatabase = async (email: string): Promise<boolean> => {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  };

  /**
   * @description Register user
   * @param email
   * @param password
   * @returns {Promise<string>}
   */
  async create(user: IUserService): Promise<User> {
    const { email, password } = user;

    if (await this.isEmailInDatabase(email)) {
      throw new IntegrityException("Email already in use");
    }

    const newUser = {
      email,
      password: bcrypt.hashSync(password, 10),
    };

    return this.userRepository.save(newUser);
  }

  /**
   * @description Find user by email
   * @param email
   * @returns {Promise<User>}
   * @memberof UserService
   * @throws {NotFoundException}
   */

  async findOne(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
}
