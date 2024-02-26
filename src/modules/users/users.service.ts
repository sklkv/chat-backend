import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize";
import { SignUpDto } from "@modules/auth/dto";
import { FindUserDto } from "./dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async findSameCredentialUsers({
    email,
    username,
    phoneNumber,
  }: FindUserDto): Promise<User[]> {
    const sameCredentialUsers = await this.userRepository.findAll({
      where: Sequelize.or({ email }, { username }, { phoneNumber }),
    });
    return sameCredentialUsers;
  }

  async findUser({
    email = null,
    username = null,
    phoneNumber = null,
  }: FindUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: Sequelize.or({ email }, { username }, { phoneNumber }),
    });
    return user;
  }

  async createUser(dto: SignUpDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
