import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../roles/roles.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column({ length: 50 })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Username is too short',
  })
  @ApiProperty({ type: String })
  @Column()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password is too short',
  })
  @ApiProperty({ type: String })
  @Column()
  password: string;

  @IsNumber()
  @ApiProperty({ type: Number })
  @ManyToOne(() => RoleEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  role: RoleEntity;
}
