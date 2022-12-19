import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { REST } from 'src/interfaces/rest.interface';

@Injectable()
export class UserService implements REST {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async find(): Promise<UserEntity[]> {
    // Get all users from the database
    return await this.userRepo.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    // Find the user by ID
    const user = await this.userRepo.findOne(id);

    // If the user doesn't exist, throw an error
    if (!user) {
      throw new NotFoundException();
    }

    // Return the user
    return user;
  }

  async update(id: number, updatedUser: UserEntity): Promise<UpdateResult> {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(updatedUser.password, 12);
    updatedUser.password = hashedPassword;

    // Update the user in the database
    return await this.userRepo.update(id, updatedUser);
  }

  async delete(id: number): Promise<DeleteResult> {
    // Delete the user from the database
    return await this.userRepo.delete(id);
  }
}
