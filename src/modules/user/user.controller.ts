import {
  Body,
  Controller,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/authentication/jwt-auth.guard';
import { Roles } from 'src/modules/auth/authorization/role.decorator';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RolesGuard } from 'src/modules/auth/authorization/role.guard';
import { Role } from 'src/enums/role.enum';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get('users')
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @Get('user/:id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @Put('user/:id')
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
