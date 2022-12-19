import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity } from './entities/role.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/authentication/jwt-auth.guard';
import { Roles } from 'src/modules/auth/authorization/role.decorator';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RolesGuard } from 'src/modules/auth/authorization/role.guard';
import { Role } from 'src/enums/role.enum';
import { REST } from 'src/interfaces/rest.interface';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('User')
export class RoleController implements REST {
  constructor(private readonly roleService: RoleService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get('roles')
  async find(): Promise<RoleEntity[]> {
    return this.roleService.find();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get('role/:id')
  async findOne(@Param('id') id: number): Promise<RoleEntity> {
    return this.roleService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiBody({ type: RoleEntity })
  @Post('role')
  async create(@Body() role: RoleEntity): Promise<RoleEntity> {
    return this.roleService.create(role);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Put('role/:id')
  async update(
    @Param('id') id: number,
    @Body() role: RoleEntity,
  ): Promise<UpdateResult> {
    return this.roleService.update(id, role);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Delete('role/:id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.roleService.delete(id);
  }
}
