import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/auth.decorator';
import { RolesGuard } from 'src/auth/auth.guard';
import { UserEntity } from './users.entity';
import { UserService } from './users.service';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get('users')
  async findAll(): Promise<UserEntity[]> {
    return this.userService.find();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @Get('user/:id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @Patch('user/:id')
  async update(
    @Param('id') id: number,
    @Body() user: UserEntity,
  ): Promise<UpdateResult> {
    return this.userService.update(id, user);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Delete('user/:id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}
