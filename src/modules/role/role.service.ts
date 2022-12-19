import { Injectable } from '@nestjs/common';
import { RoleEntity } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { REST } from 'src/interfaces/rest.interface';

@Injectable()
export class RoleService implements REST {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
  ) {}

  async find(): Promise<RoleEntity[]> {
    return await this.roleRepo.find();
  }

  async findOne(id: number): Promise<RoleEntity> {
    return await this.roleRepo.findOne(id);
  }

  async create(role: RoleEntity): Promise<RoleEntity> {
    return await this.roleRepo.save(role);
  }

  async update(id: number, role: RoleEntity): Promise<UpdateResult> {
    return await this.roleRepo.update(id, role);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.roleRepo.delete(id);
  }
}
