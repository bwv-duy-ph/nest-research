import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
  Patch,
  UseFilters,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Role } from '../../enums/role.enum';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/auth.decorator';
import { RolesGuard } from '../../auth/role.guard';
import { UserEntity } from './users.entity';
import { UserService } from './users.service';
import { EntityNotFoundExceptionFilter } from '../../exceptions/entity-not-found-exception.filter';
import { UpdateUserDto } from './dto/update-user.dto';
import { REST } from '../../interfaces/rest.interface';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('User')
@UseFilters(new EntityNotFoundExceptionFilter())
export class UserController implements REST {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get('users')
  async find(): Promise<UserEntity[]> {
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
    @Body() user: UpdateUserDto,
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
