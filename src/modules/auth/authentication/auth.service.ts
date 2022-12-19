import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegiterDto } from './dto/register.dto';
import validate from 'validator';
import { messages } from 'src/constants';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegiterDto,
  ): Promise<{ message: string; userId?: string | number }> {
    try {
      // Validate input
      if (!registerDto.username || !registerDto.password) {
        throw new BadRequestException('Username and password are required');
      }

      // Check if user with desired username already exists
      const desiredUsername: string = registerDto.username;
      const existingUserCount = await this.userRepo.count({
        username: desiredUsername,
      });

      if (existingUserCount > 0) {
        throw new BadRequestException(messages.error.USER_EXISTS);
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(registerDto.password, 12);
      registerDto.password = hashedPassword;

      // Save user to database and return success message with user ID
      const savedUser = await this.userRepo.save(registerDto);
      return { message: messages.info.REGISTER_SUCCESS, userId: savedUser.id };
    } catch (error) {
      // Handle errors
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Error while registering user');
      }
    }
  }

  async authenticateUser(loginDto: LoginDto): Promise<Record<string, string>> {
    const { username, password } = loginDto;

    // Check if the 'username' is an email address.
    const isEmail = validate.isEmail(username);

    try {
      // Find the user with the given 'username' or 'email', depending on the value of 'isEmail'.
      const user = await this.userRepo.findOne({
        [isEmail ? 'email' : 'username']: username,
      });

      // If no user was found, throw an error.
      if (!user) {
        throw new Error(messages.error.INVALID_USERNAME);
      }

      // Compare the given 'password' with the hashed password stored in the database for the user.
      const isValidPassword = await bcrypt.compare(password, user.password);

      // If the passwords don't match, throw an error.
      if (!isValidPassword) {
        throw new Error(messages.error.INVALID_PASSWORD);
      }

      const jwt = this.jwtService.sign({
        userId: user.id,
        username: user.username,
        userRole: user.role ? user.role.flag : Role.User,
      });

      // Return the success message and the JWT token.
      return { message: messages.info.LOGIN_SUCCESS, token: jwt };
    } catch (error) {
      // Handle errors
      throw new BadRequestException(error.message);
    }
  }
}
