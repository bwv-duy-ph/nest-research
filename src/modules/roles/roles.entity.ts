import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserEntity } from '../users/users.entity';
import { BaseEntity } from '../shared/base.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @Column()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  flag: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  @OneToMany(() => UserEntity, (user: UserEntity) => user.id)
  user: UserEntity[];
}
