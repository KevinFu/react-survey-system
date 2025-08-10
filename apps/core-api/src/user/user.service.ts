import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModal: Model<User>,
  ) {}

  async create(userDto: UserDto) {
    const createdUser = new this.userModal(userDto);
    return await createdUser.save();
  }

  async findOne(username: string, password: string) {
    return await this.userModal.findOne({ username, password });
  }
}
